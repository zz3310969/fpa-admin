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
      type: 'application/base',
    });
    if(this.props.match.params.id){
      dispatch({
        type: 'application/fetchBasic',
        payload:{id:this.props.match.params.id}
      });
    }
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'application/update',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/application'));
          },
        });
      }
    });
  }
  render() {
    const { application: { regularFormSubmitting:submitting, formdate,status } } = this.props;
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
              label="logo"
            >
              {getFieldDecorator('logoImageUrl', {
                initialValue:formdate.logoImageUrl,
                rules: [{
                  required: true, message: '请上传系统logo',
                }],
              })(
                <AvatarUpload placeholder="请上传系统logo" disabled={this.state.onlyread} />
              )}
            </FormItem>
            <FormItem
                  {...formItemLayout}
                  label="系统名称"
              >
                  {getFieldDecorator('name', {
                    initialValue:formdate.name,
                    rules: [{
                      required: true, message: '请输入系统名称',
                    }],
                  })(
                    <Input placeholder="请输入系统名称" disabled={this.state.onlyread} />
                  )}
              </FormItem>

              <FormItem
                  {...formItemLayout}
                  label="系统编码"
              >
                  {getFieldDecorator('appCode', {
                    initialValue:formdate.appCode,
                    rules: [{
                      required: true, message: '请输入系统编码',
                    }],
                  })(
                    <Input placeholder="请输入系统编码" disabled={true} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="所属行业"
              >
                  {getFieldDecorator('industry', {
                    initialValue:formdate.industry,
                    rules: [{
                      required: true, message: '请输入所属行业',
                    }],
                  })(
                    <Input placeholder="请输入所属行业" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="联系人"
              >
                  {getFieldDecorator('contact', {
                    initialValue:formdate.contact,
                    rules: [{
                      required: true, message: '请输入联系人',
                    }],
                  })(
                    <Input placeholder="请输入联系人姓名" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="联系电话"
              >
                  {getFieldDecorator('contactTel', {
                    initialValue:formdate.contactTel,
                    rules: [{
                      required: true, message: '请输入联系电话',
                    }],
                  })(
                    <Input placeholder="请输入手机号码" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="邮箱"
              >
                  {getFieldDecorator('email', {
                    initialValue:formdate.email,
                    rules: [{
                      type: 'email', message: '邮箱格式输入不正确',
                    },{
                      required: true, message: '请输入邮箱',type:'email',
                    }],
                  })(
                    <Input placeholder="请输入邮箱" disabled={this.state.onlyread} />
                  )}
              </FormItem>

              <FormItem
                  {...formItemLayout}
                  label="状态"
              >
                  {getFieldDecorator('status', {
                    initialValue:formdate.status!== undefined ?formdate.status+'':'',
                    rules: [{
                      required: true, message: '请选择状态',
                    }],
                  })(
                    <Select placeholder="请选择状态" disabled={this.state.onlyread}>
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
                <Link to={'/advisory/application'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
