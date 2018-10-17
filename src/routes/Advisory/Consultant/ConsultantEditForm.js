import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Checkbox,
} from 'antd';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../Formstyle.less';
import AvatarUpload from '../common/AvatarUpload'
import AreaCascader from '../common/AreaCascader'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

@connect(state => ({
  consultant: state.consultant,
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
      type: 'consultant/base',
    });
    if(this.props.match.params.id){
      dispatch({
        type: 'consultant/fetchBasic',
        payload:{id:this.props.match.params.id}
      });
    }
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const area = values['area'];
        if (area.length > 1) {
          values.province = area[0];
          values.city = area[1];
        }else{
           values.province = area[0];
        }
        this.props.dispatch({
          type: 'consultant/update',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/consultant'));
          },
        });
      }
    });
  }
  render() {
    const { consultant: { regularFormSubmitting:submitting, formdate,status,apps,advisoryThemes,levels,genders,themeList } } = this.props;
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
                    required: true, message: '请输入主键',
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
                    <Select disabled={true}  showSearch
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
                  label="咨询师姓名"
              >
                  {getFieldDecorator('name', {
                    initialValue:formdate.name,
                    rules: [{
                      required: true, message: '请输入咨询师姓名',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                        {...formItemLayout}
                        label="账号"
                >
                    {getFieldDecorator('username', {
                    initialValue:formdate.username,
                    rules: [{
                      required: true, message: '请输入账号',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="手机号码"
                >
                    {getFieldDecorator('mobile', {
                    initialValue:formdate.mobile,
                    rules: [{
                      required: true, message: '请输入手机号码',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="咨询师等级"
              >
                  {getFieldDecorator('levelId', {
                    initialValue: formdate.levelId !== undefined ? formdate.levelId + '' : '',
                    rules: [{
                      required: true, message: '请选择咨询师等级',
                    }],
                  })(
                    <Select disabled={this.state.onlyread} >
                      {levels.map(d => <Select.Option key={d.id}>{d.levelName}</Select.Option>)}
                    </Select>
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="服务主题"
              >
                  {getFieldDecorator('themeList', {
                    initialValue: formdate.themeList,
                    rules: [{
                      required: true, message: '请选择服务主题',
                    }],
                  })(
                    <CheckboxGroup options={themeList} disabled={this.state.onlyread}  />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="所在地区"
              >
                  {getFieldDecorator('area', {
                    initialValue:formdate.area,
                    rules: [{
                      required: true, message: '请输入所在地区',
                    }],
                  })(
                    <AreaCascader placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="性别"
              >
                  {getFieldDecorator('gender', {
                    initialValue: formdate.gender !== undefined ? formdate.gender + '' : '',
                    rules: [{
                      required: true, message: '请输入性别',
                    }],
                  })(
                    <Select disabled={this.state.onlyread}>
                      {genders.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                    </Select>
                  )}
              </FormItem>

              <FormItem
                  {...formItemLayout}
                  label="简介"
              >
                  {getFieldDecorator('introduction', {
                    initialValue:formdate.introduction,
                    rules: [{
                      required: true, message: '请输入简介',
                    }],
                  })(
                    <TextArea rows={4} disabled={this.state.onlyread}/>
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
                    <Select disabled={this.state.onlyread}>
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
                <Link to={'/advisory/consultant'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
