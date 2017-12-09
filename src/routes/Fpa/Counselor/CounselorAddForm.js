import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../Formstyle.less';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  counselor: state.counselor,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'counselor/base',
    });
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'counselor/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/counsel/counselor'));
          },
        });
      }
    });
  }
  render() {
    const { counselor: { regularFormSubmitting:submitting, states, genders, counselorRanks} } = this.props;
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
            <Row >
              <Col span={12}>
                <FormItem
                        {...formItemLayout}
                        label="咨询师编号"
                >
                    {getFieldDecorator('numb', {
                    rules: [{
                      required: true, message: '请输入咨询师编号',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                        {...formItemLayout}
                        label="姓名"
                >
                    {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '请输入姓名',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
              </Col>
            </Row >
            <Row >
              <Col span={12}>
                <FormItem
                        {...formItemLayout}
                        label="电话"
                >
                    {getFieldDecorator('mobile', {
                    rules: [{
                      required: true, message: '请输入电话',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
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
              </Col>
            </Row >
            <Row >
              <Col span={12}>
                <FormItem
                        {...formItemLayout}
                        label="特长"
                >
                    {getFieldDecorator('specialty', {
                    rules: [{
                      required: true, message: '请输入特长',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                        {...formItemLayout}
                        label="微信号"
                >
                    {getFieldDecorator('wechat', {
                    rules: [{
                      required: true, message: '请输入微信号',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
              </Col>
            </Row >
            <Row >
              <Col span={12}>
                <FormItem
                        {...formItemLayout}
                        label="级别"
                >
                    {getFieldDecorator('rank', {
                    rules: [{
                      required: true, message: '请输入级别',
                    }],
                    })(
                    <Select>
                      {counselorRanks.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                        {...formItemLayout}
                        label="注册时间"
                >
                    {getFieldDecorator('regTime', {
                    initialValue:moment(),
                    rules: [{
                      required: true, message: '请输入注册时间',
                    }],
                    })(
                    <DatePicker style={{ width: '100%' }} showTime format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row >
              <Col span={12}>
                <FormItem
                        {...formItemLayout}
                        label="状态"
                >
                    {getFieldDecorator('state', {
                    initialValue:states.length >0 ?states[0].code+'':'',
                    rules: [{
                      required: true, message: '请输入状态',
                    }],
                    })(
                    <Select>
                      {states.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>
              </Col>
            </Row>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
                <Link to={'/counselor'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
