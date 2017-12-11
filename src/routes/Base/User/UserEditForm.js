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
  user: state.user,
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
        type: 'user/fetchBasic',
        payload:{id:this.props.match.params.id}
      });
    }
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/update',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/user'));
          },
        });
      }
    });
  }
  render() {
    const { user: { regularFormSubmitting:submitting, formdate } } = this.props;
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
                    required: true, message: '请输入id',
                  }],
                })(
                    <Input type="hidden"/>
                  )}
              <FormItem
                  {...formItemLayout}
                  label="用户名"
              >
                  {getFieldDecorator('username', {
                    initialValue:formdate.username,
                    rules: [{
                      required: true, message: '请输入用户名',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="密码"
              >
                  {getFieldDecorator('password', {
                    initialValue:formdate.password,
                    rules: [{
                      required: true, message: '请输入密码',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="是否未过期"
              >
                  {getFieldDecorator('accountnonexpired', {
                    initialValue:formdate.accountnonexpired,
                    rules: [{
                      required: true, message: '请输入是否未过期',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="是否未锁定"
              >
                  {getFieldDecorator('accountnonlocked', {
                    initialValue:formdate.accountnonlocked,
                    rules: [{
                      required: true, message: '请输入是否未锁定',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="登录凭据是否未过期"
              >
                  {getFieldDecorator('credentialsnonexpired', {
                    initialValue:formdate.credentialsnonexpired,
                    rules: [{
                      required: true, message: '请输入登录凭据是否未过期',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="是否可用"
              >
                  {getFieldDecorator('enabled', {
                    initialValue:formdate.enabled,
                    rules: [{
                      required: true, message: '请输入是否可用',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="类型"
              >
                  {getFieldDecorator('dtype', {
                    initialValue:formdate.dtype,
                    rules: [{
                      required: true, message: '请输入类型',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="用户名称"
              >
                  {getFieldDecorator('name', {
                    initialValue:formdate.name,
                    rules: [{
                      required: true, message: '请输入用户名称',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="创建时间"
              >
                  {getFieldDecorator('create_date', {
                    initialValue:formdate.create_date,
                    rules: [{
                      required: true, message: '请输入创建时间',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="更新时间"
              >
                  {getFieldDecorator('update_time', {
                    initialValue:formdate.update_time,
                    rules: [{
                      required: true, message: '请输入更新时间',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="登录次数"
              >
                  {getFieldDecorator('login_count', {
                    initialValue:formdate.login_count,
                    rules: [{
                      required: true, message: '请输入登录次数',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="所属机构"
              >
                  {getFieldDecorator('org_id', {
                    initialValue:formdate.org_id,
                    rules: [{
                      required: true, message: '请输入所属机构',
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
                <Link to={'/user'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
