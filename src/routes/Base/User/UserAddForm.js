import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Checkbox, TreeSelect
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../Formstyle.less';

import request from '../../../utils/request';


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

@connect(state => ({
  user: state.user,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
        type: 'user/base',
    })
  }

  usernameExists = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    var id = getFieldValue('id');
    if (!value) {
      callback();
    } else {
        request('api/userAction/sameUsername?username='+value)
        .then(result => {
          if(!result) {
            callback([new Error('抱歉，该用户名已被占用。')])
          } else {
            callback()
          }
        })
    }
  };



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/list/user-list'));
          },
        });
      }
    });
  }
  render() {
    const { user: { regularFormSubmitting:submitting, roleses, orgs } } = this.props;
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
                        label="用户名"
                >
                    {getFieldDecorator('username', {
                    rules: [{
                      required: true, message: '请输入用户名',
                    },{
                      validator: this.usernameExists
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="密码"
                >
                    {getFieldDecorator('password', {
                    rules: [{
                      required: true, message: '请输入密码',
                    }],
                    })(
                    <Input type="password" placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="用户名称"
                >
                    {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '请输入用户名称',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                
                
                <FormItem
                        {...formItemLayout}
                        label="所属机构"
                >
                    {getFieldDecorator('org.id', {
                    rules: [{
                      required: true, message: '请输入所属机构',
                    }],
                    })(
                    <TreeSelect placeholder="" treeData={orgs}/>
                    )}
                </FormItem>

                <FormItem
                        {...formItemLayout}
                        label="角色"
                >
                    {getFieldDecorator('rolesIds', {
                    rules: [{
                      required: true, message: '请输入所属角色',
                    }],
                    })(
                    <CheckboxGroup options={roleses} />
                    )}
                </FormItem>


            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
                <Link to={'/list/user-list'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
