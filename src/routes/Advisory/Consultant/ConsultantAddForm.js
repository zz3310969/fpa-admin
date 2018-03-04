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
  consultant: state.consultant,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
    levels:[],
    advisoryThemes:[],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'consultant/base',
    });
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'consultant/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/consultant'));
          },
        });
      }
    });
  }

  onAppChange = (value) => {
    let allThems = this.props.consultant.advisoryThemes;
    let allLevels = this.props.consultant.levels;
    let advisoryThemes = new Array();
    let levels = new Array();

      for (var i = 0; i < allThems.length; i++) {
        if(allThems[i].appId +"" == value){
          advisoryThemes.push(allThems[i]);
        }
        console.log(allThems[i])
      }
      for (var i = 0; i < allLevels.length; i++) {
        if(allLevels[i].appId +"" == value){
          levels.push(allLevels[i]);
        }
      }
      this.props.form.setFieldsValue({"levelId":''});
      this.props.form.setFieldsValue({"themeId":''});
      this.setState({
        advisoryThemes,
        levels,
      })
    };

  render() {
    const { consultant: { regularFormSubmitting:submitting ,apps,status,advisoryThemes,levels,genders} } = this.props;
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
                      onChange={this.onAppChange}
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
                  required: true, message: '请输入头像',
                }],
              })(
                <AvatarUpload placeholder="" />
              )}
            </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="咨询师姓名"
                >
                    {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '请输入咨询师姓名',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="账号"
                >
                    {getFieldDecorator('username', {
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
                    rules: [{
                      required: true, message: '请选择咨询师等级',
                    }],
                    })(
                    <Select>
                      {this.state.levels.map(d => <Select.Option key={d.id}>{d.levelName}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="服务主题"
                >
                    {getFieldDecorator('themeId', {
                    rules: [{
                      required: true, message: '请选择服务主题',
                    }],
                    })(
                    <Select>
                      {this.state.advisoryThemes.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="所在地区"
                >
                    {getFieldDecorator('areaId', {
                    rules: [{
                      required: true, message: '请输入所在地区',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="性别"
                >
                    {getFieldDecorator('gender', {
                    rules: [{
                      required: true, message: '请输入性别',
                    }],
                    })(
                    <Select>
                      {genders.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="简介"
                >
                    {getFieldDecorator('introduction', {
                    rules: [{
                      required: true, message: '请输入简介',
                    }],
                    })(
                    <TextArea rows={4} placeholder="" />
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
                <Link to={'/advisory/consultant'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
