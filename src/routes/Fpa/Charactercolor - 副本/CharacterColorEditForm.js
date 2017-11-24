import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../Formstyle.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  charactercolor: state.charactercolor
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
    charactercolor: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    if(this.props.match.params.id){
      dispatch({
        type: 'charactercolor/fetchBasic',
        payload:{id:this.props.match.params.id}
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'charactercolor/update',
          payload: values,
        });
      }
    });
  }
  render() {
    const { charactercolor: { regularFormSubmitting:submitting, formdate } } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="" content="" >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
              <FormItem
                {...formItemLayout}
                label="编号"
              >
                {getFieldDecorator('numb', {
                  initialValue:formdate.numb,
                  rules: [{
                    required: true, message: '请输入编号',
                  }],
                  })(
                  <Input placeholder="" />
                )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="名称"
              >
                  {getFieldDecorator('name', {
                  initialValue:formdate.name,
                  rules: [{
                  required: true, message: '请输入名称',
                  }],
                  })(
                  <Input placeholder="" />
                  )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="代表颜色"
              >
                  {getFieldDecorator('colorId', {
                  rules: [{
                  required: true, message: '请输入代表颜色',
                  }],
                  })(
                  <Input placeholder="" />
                  )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="代表颜色编码"
              >
                  {getFieldDecorator('colorCode', {
                  rules: [{
                  required: true, message: '请输入代表颜色编码',
                  }],
                  })(
                  <Input placeholder="" />
                  )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="描述"
              >
                  {getFieldDecorator('description', {
                  rules: [{
                  required: true, message: '请输入描述',
                  }],
                  })(
                  <Input placeholder="" />
                  )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="性格色彩2"
              >
                  {getFieldDecorator('color2Id', {
                    initialValue:this.state.charactercolor.color2Id,
                  rules: [{
                  required: true, message: '请输入性格色彩2',
                  }],
                  })(
                  <Input placeholder="" />
                  )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="性格色彩2编码"
              >
                  {getFieldDecorator('color2Code', {
                  rules: [{
                  required: true, message: '请输入性格色彩2编码',
                  }],
                  })(
                  <Input placeholder="" />
                  )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="状态"
              >
                  {getFieldDecorator('state', {
                  rules: [{
                  required: true, message: '请输入状态',
                  }],
                  })(
                  <Input placeholder="" />
                  )}
              </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
