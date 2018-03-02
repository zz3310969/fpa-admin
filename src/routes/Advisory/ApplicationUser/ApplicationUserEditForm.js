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
    dispatch({
      type: 'applicationuser/base',
    });
    if(this.props.match.params.id){
      dispatch({
        type: 'applicationuser/fetchBasic',
        payload:{id:this.props.match.params.id}
      });
    }
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'applicationuser/update',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/applicationuser'));
          },
        });
      }
    });
  }
  render() {
    const { applicationuser: { regularFormSubmitting:submitting, formdate,apps,status, } } = this.props;
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
                  label="所属系统"
              >
                  {getFieldDecorator('appId', {
                    initialValue:formdate.appId!== undefined ?formdate.appId+'':'',
                    rules: [{
                      required: true, message: '请输入所属系统',
                    }],
                  })(
                  <Select showSearch disabled={this.state.onlyread}
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
                    initialValue:formdate.headImageUrl,
                    rules: [{
                      required: true, message: '请输入头像',
                    }],
                  })(
                    <AvatarUpload placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="用户姓名"
              >
                  {getFieldDecorator('name', {
                    initialValue:formdate.name,
                    rules: [{
                      required: true, message: '请输入用户姓名',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="用户账号"
              >
                  {getFieldDecorator('username', {
                    initialValue:formdate.username,
                    rules: [{
                      required: true, message: '请输入用户账号',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="联系电话"
              >
                  {getFieldDecorator('moblie', {
                    initialValue:formdate.moblie,
                    rules: [{
                      required: true, message: '请输入联系电话',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="邮箱"
              >
                  {getFieldDecorator('email', {
                    initialValue:formdate.email,
                    rules: [{
                      required: true, message: '请输入邮箱',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="状态"
              >
                  {getFieldDecorator('status', {
                    initialValue:formdate.status!== undefined ?formdate.status+'':'',
                    rules: [{
                      required: true, message: '请输入状态',
                    }],
                  })(
                  <Select  disabled={this.state.onlyread} >
                    {status.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                  </Select>
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
                <Link to={'/applicationuser'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
