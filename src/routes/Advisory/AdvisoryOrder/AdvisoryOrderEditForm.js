import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../Formstyle.less';
import moment from "moment/moment";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  advisoryorder: state.advisoryorder,
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
      type: 'advisoryorder/base',
    });
    if(this.props.match.params.id){
      dispatch({
        type: 'advisoryorder/fetchBasic',
        payload:{id:this.props.match.params.id}
      });
    }
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'advisoryorder/update',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/advisoryorder'));
          },
        });
      }
    });
  }
  render() {
    const { advisoryorder: { regularFormSubmitting:submitting, formdate,orderStatus, customers, products } } = this.props;
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
                  label="订单编号"
              >
                  {getFieldDecorator('orderNum', {
                    initialValue:formdate.orderNum,
                    rules: [{
                      required: true, message: '请输入订单编号',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="客户编号"
              >
                  {getFieldDecorator('customId', {
                    initialValue: formdate.customId !== undefined ? formdate.customId + '' : '',
                    rules: [{
                      required: true, message: '请输入客户编号',
                    }],
                  })(
                    <Select showSearch disabled={this.state.onlyread}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {customers.map(d => <Select.Option key={d.id}>{d.nickName}</Select.Option>)}
                    </Select>                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="服务产品"
              >
                  {getFieldDecorator('productId', {
                    initialValue: formdate.productId !== undefined ? formdate.productId + '' : '',
                    rules: [{
                      required: true, message: '请输入服务产品',
                    }],
                  })(
                    <Select showSearch disabled={this.state.onlyread}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {products.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                    </Select>
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="客户电话"
              >
                  {getFieldDecorator('tel', {
                    initialValue:formdate.tel,
                    rules: [{
                      required: true, message: '请输入客户电话',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="服务时长（分钟）"
              >
                  {getFieldDecorator('lenTime', {
                    initialValue:formdate.lenTime,
                    rules: [{
                      required: true, message: '请输入服务时长（分钟）',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="订单金额"
              >
                  {getFieldDecorator('orderAmount', {
                    initialValue:formdate.orderAmount,
                    rules: [{
                      required: true, message: '请输入订单金额',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="支付金额"
              >
                  {getFieldDecorator('payAmount', {
                    initialValue:formdate.payAmount,
                    rules: [{
                      required: true, message: '请输入支付金额',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="下单时间"
              >
                  {getFieldDecorator('orderTime', {
                    initialValue: moment(formdate.orderTime),
                    rules: [{
                      required: true, message: '请输入下单时间',
                    }],
                  })(
                    <DatePicker disabled={this.state.onlyread}/>
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="订单状态"
              >
                  {getFieldDecorator('orderStatus', {
                    initialValue: formdate.orderStatus !== undefined ? formdate.orderStatus + '' : '',
                    rules: [{
                      required: true, message: '请输入订单状态',
                    }],
                  })(
                    <Select showSearch disabled={this.state.onlyread}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {orderStatus.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
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
                <Link to={'/advisory/advisoryorder'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
