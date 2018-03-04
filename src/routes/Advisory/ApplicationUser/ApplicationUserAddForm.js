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
  applicationuser: state.applicationuser,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'applicationuser/base',
    });

  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'applicationuser/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/applicationuser'));
          },
        });
      }
    });
  }
  render() {
    const { applicationuser: { regularFormSubmitting:submitting,apps,status, } } = this.props;
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
                        label="所属系统"
                >
                    {getFieldDecorator('appId', {
                    rules: [{
                      required: true, message: '请输入所属系统',
                    }],
                    })(
                    <Select showSearch
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {apps.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="头像"
                >
                    {getFieldDecorator('headImageUrl', {
                    rules: [{
                      required: true, message: '请上传头像',
                    }],
                    })(
                    <AvatarUpload placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="用户姓名"
                >
                    {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '请输入用户姓名',
                    }],
                    })(
                    <Input placeholder="请输入用户姓名" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="用户账号"
                >
                    {getFieldDecorator('username', {
                    rules: [{
                      required: true, message: '请输入用户账号',
                    }],
                    })(
                    <Input placeholder="请输入用户账号" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="联系电话"
                >
                    {getFieldDecorator('moblie', {
                    rules: [{
                      required: true, message: '请输入手机号码',
                    }],
                    })(
                    <Input placeholder="请输入手机号码" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="邮箱"
                >
                    {getFieldDecorator('email', {
                    rules: [{
                      type: 'email', message: '邮箱格式输入不正确',
                    },{
                      required: true, message: '请输入邮箱',
                    }],
                    })(
                    <Input placeholder="请输入邮箱" />
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
                    <Select placeholder="请选择状态" >
                    {status.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                  </Select>
                    )}
                </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
                <Link to={'/advisory/applicationuser'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
