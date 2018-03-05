import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {routerRedux, Link} from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../Formstyle.less';
import formdate from "../../../models/Advisory/advisorypricing";

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(state => ({
  commenttemplate: state.commenttemplate,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {};

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'commenttemplate/base',
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'commenttemplate/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/commenttemplate'));
          },
        });
      }
    });
  }



  render() {
    const {commenttemplate: {regularFormSubmitting: submitting,apps}} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };

    return (
      <PageHeaderLayout title="" content="">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{marginTop: 8}}
          >
            {getFieldDecorator('id', {})(
              <Input type="hidden"/>
            )}
            <FormItem
              {...formItemLayout}
              label="模版名称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入模版名称',
                }],
              })(
                <Input placeholder=""/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所属系统"
            >
              {getFieldDecorator('appId', {
                initialValue: formdate.appId !== undefined ? formdate.appId + '' : '',
                rules: [{
                  required: true, message: '请选择所属系统',
                }],
              })(
                <Select showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {apps.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                </Select>
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Link to={'/advisory/commenttemplate'}><Button style={{marginLeft: 8}}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
