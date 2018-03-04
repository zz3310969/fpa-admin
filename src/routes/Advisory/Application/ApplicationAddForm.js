import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../Formstyle.less';
import AvatarUpload from '../common/AvatarUpload'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  application: state.application,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'application/base',
    });
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'application/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/application'));
          },
        });
      }
    });
  }
  render() {
    const { application: { regularFormSubmitting:submitting,status } } = this.props;
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
              label="LOGO"
            >
              {getFieldDecorator('logoImageUrl', {
                rules: [{
                  required: true, message: '请输入logo',
                }],
              })(
                <AvatarUpload placeholder="" />
              )}
            </FormItem>
            <FormItem
                        {...formItemLayout}
                        label="系统名称"
                >
                    {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '请输入系统名称',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>


                <FormItem
                        {...formItemLayout}
                        label="所属行业"
                >
                    {getFieldDecorator('industry', {
                    rules: [{
                      required: true, message: '请输入所属行业',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="联系人"
                >
                    {getFieldDecorator('contact', {
                    rules: [{
                      required: true, message: '请输入联系人',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="联系电话"
                >
                    {getFieldDecorator('contactTel', {
                    rules: [{
                      required: true, message: '请输入联系电话',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="邮箱"
                >
                    {getFieldDecorator('email', {
                    rules: [{
                      required: true, message: '请输入邮箱',type:'email',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>

                <FormItem
                        {...formItemLayout}
                        label="状态"
                >
                    {getFieldDecorator('status', {
                    rules: [{
                      required: true, message: '请输入状态',
                    }],
                    })(
                    <Select>
                      {status.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
                <Link to={'/advisory/application'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
