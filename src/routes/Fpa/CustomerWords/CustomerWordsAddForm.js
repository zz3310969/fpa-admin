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
  customerwords: state.customerwords,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;

  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'customerwords/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/customerwords'));
          },
        });
      }
    });
  }
  render() {
    const { customerwords: { regularFormSubmitting:submitting } } = this.props;
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

                    })(
                    <Input type="hidden"/>
                    )}
                <FormItem
                        {...formItemLayout}
                        label="客户名称"
                >
                    {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '请输入客户名称',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="微信unionid"
                >
                    {getFieldDecorator('wechatId', {
                    rules: [{
                      required: true, message: '请输入微信unionid',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="客户ID"
                >
                    {getFieldDecorator('customerId', {
                    rules: [{
                      required: true, message: '请输入客户ID',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="手机号"
                >
                    {getFieldDecorator('mobile', {
                    rules: [{
                      required: true, message: '请输入手机号',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="邮箱"
                >
                    {getFieldDecorator('mail', {
                    rules: [{
                      required: true, message: '请输入邮箱',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="留言"
                >
                    {getFieldDecorator('words', {
                    rules: [{
                      required: true, message: '请输入留言',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
                <Link to={'/customerwords'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
