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
      type: 'counselor/base',
    });
    if(this.props.match.params.id){
      dispatch({
        type: 'counselor/fetchBasic',
        payload:{id:this.props.match.params.id}
      });
    }
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'counselor/update',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/counsel/counselor'));
          },
        });
      }
    });
  }
  render() {
    const { counselor: { regularFormSubmitting:submitting, formdate, states, genders, counselorRanks } } = this.props;
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
          <Row >
            <Col span={12}>
              <FormItem
                  {...formItemLayout}
                  label="咨询师编号"
              >
                  {getFieldDecorator('numb', {
                    initialValue:formdate.numb,
                    rules: [{
                      required: true, message: '请输入咨询师编号',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                  {...formItemLayout}
                  label="姓名"
              >
                  {getFieldDecorator('name', {
                    initialValue:formdate.name,
                    rules: [{
                      required: true, message: '请输入姓名',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
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
                    initialValue:formdate.mobile,
                    rules: [{
                      required: true, message: '请输入电话',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                  {...formItemLayout}
                  label="性别"
              >
                  {getFieldDecorator('gender', {
                    initialValue:formdate.gender!== undefined ?formdate.gender+'':'',
                    rules: [{
                      required: true, message: '请输入性别',
                    }],
                  })(
                    <Select disabled={this.state.onlyread}>
                    {genders.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                  </Select>
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                  {...formItemLayout}
                  label="特长"
              >
                  {getFieldDecorator('specialty', {
                    initialValue:formdate.specialty,
                    rules: [{
                      required: true, message: '请输入特长',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                  {...formItemLayout}
                  label="微信号"
              >
                  {getFieldDecorator('wechat', {
                    initialValue:formdate.wechat,
                    rules: [{
                      required: true, message: '请输入微信号',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                  {...formItemLayout}
                  label="级别"
              >
                  {getFieldDecorator('rank', {
                    initialValue:formdate.rank!== undefined ?formdate.rank+'':'',
                    rules: [{
                      required: true, message: '请输入级别',
                    }],
                  })(
                    <Select disabled={this.state.onlyread}>
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
                    initialValue:moment(formdate.regTime),
                    rules: [{
                      required: true, message: '请输入注册时间',
                    }],
                  })(
                    <DatePicker disabled={this.state.onlyread} style={{ width: '100%' }} showTime format="YYYY-MM-DD HH:mm:ss" />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                  {...formItemLayout}
                  label="状态"
              >
                  {getFieldDecorator('state', {
                    initialValue:formdate.state !== undefined ?formdate.state+'':'',
                    rules: [{
                      required: true, message: '请输入状态',
                    }],
                  })(
                  <Select disabled={this.state.onlyread}>
                    {states.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                  </Select>
                  )}
              </FormItem>
            </Col>
          </Row>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                {
                this.state.onlyread ?'':(
                <Button type="primary" htmlType="submit" loading={submitting}>
                    提交
                </Button>
                )
                }
                <Link to={'/counsel/counselor'}><Button style={{ marginLeft: 8 }}>返回</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
