import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,Checkbox, TreeSelect
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
      dispatch({
        type: 'user/base',
    })
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
            this.props.dispatch(routerRedux.push('/list/user-list'));
          },
        });
      }
    });
  }

  authorities = (roles) =>{
    var roleses = new Array();
    if(roles){
      roles.map(function(index) {
        roleses.push(index.id)
        
      })
    }
    return roleses;
  }

  usernameExists = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    var id = getFieldValue('id');
    if (!value) {
      callback();
    } else {
        request('api/userAction/sameUsername?username='+value+'&id='+id)
        .then(result => {
          if(!result) {
            callback([new Error('抱歉，该用户名已被占用。')])
          } else {
            callback()
          }
        })
    }
  };


  render() {
    const { user: { regularFormSubmitting:submitting, formdate, roleses, orgs  } } = this.props;
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
                    },{
                      validator: this.usernameExists
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
                    <Input placeholder="" type="password" disabled={this.state.onlyread} />
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
                  label="所属机构"
              >
                  {getFieldDecorator('org.id', {
                    initialValue:formdate.org!== undefined && formdate.org.id!== undefined ?formdate.org.id+'':'',
                    rules: [{
                      required: true, message: '请输入所属机构',
                    }],
                  })(
                  <TreeSelect placeholder="" treeData={orgs} disabled={this.state.onlyread}/>
                  )}
              </FormItem>
              <FormItem
                        {...formItemLayout}
                        label="角色"
                >
                    {getFieldDecorator('rolesIds', {
                      initialValue:this.authorities(formdate.authorities),
                    rules: [{
                      required: true, message: '请输入所属角色',
                    }],
                    })(
                    <CheckboxGroup options={roleses} disabled={this.state.onlyread} />
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
                <Link to={'/list/user-list'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
