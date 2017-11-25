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
  scene: state.scene,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
    onlyread:false,
  };

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const optype = params.get('read'); // bar
    this.setState({
      onlyread:optype?true:false,
    })
    const { dispatch } = this.props;
    if(this.props.match.params.id){
      dispatch({
        type: 'charactercolor/fetchBasic',
        payload:{id:this.props.match.params.id}
      });
    }
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'scene/update',
          payload: values,
        });
      }
    });
  }
  render() {
    const { scene: { regularFormSubmitting:submitting, formdate } } = this.props;
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
      <PageHeaderLayout title="" content="">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
                {getFieldDecorator('id', {
                  initialValue:formdate.id,
                  rules: [{
                    required: true, message: '请输入场景',
                  }],
                })(
                    <Input type="hidden"/>
                  )}
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
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
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
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="套牌id"
              >
                  {getFieldDecorator('cardGroupId', {
                    initialValue:formdate.cardGroupId,
                    rules: [{
                      required: true, message: '请输入套牌id',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="可重复次数"
              >
                  {getFieldDecorator('repeatCount', {
                    initialValue:formdate.repeatCount,
                    rules: [{
                      required: true, message: '请输入可重复次数',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="版本"
              >
                  {getFieldDecorator('version', {
                    initialValue:formdate.version,
                    rules: [{
                      required: true, message: '请输入版本',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="主题ID"
              >
                  {getFieldDecorator('themeId', {
                    initialValue:formdate.themeId,
                    rules: [{
                      required: true, message: '请输入主题ID',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="状态"
              >
                  {getFieldDecorator('state', {
                    initialValue:formdate.state,
                    rules: [{
                      required: true, message: '请输入状态',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                {
                this.state.onlyread ?'':(
                <Button type="primary" htmlType="submit" loading={submitting}>
                    提交
                </Button>
                )
                }
                <Link to={'/character/scene'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
