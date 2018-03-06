import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,Row,Col,Table,Upload
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  cardslot: state.cardslot,
}))
@Form.create()



export default class BasicForms extends PureComponent {
  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;

  }

  render(){

    const { getFieldDecorator } = this.props.form;

    return (
      <Form style={{fontSize:12,border:'1px solid gray'}} >
        <Row gutter={{ md: 2, lg: 24, xl: 48 }}>
        <Col md={10} sm={10}  style={{paddingLeft: 2,paddingRight: 2}}>
          <FormItem
            label="编号"
            labelCol={{ span: 14 }}
            wrapperCol={{ span: 8 }}
            style={{marginBottom:10,width:'100%'}}
          >
            {getFieldDecorator('numb', {
              rules: [{ required: true, message: '请输入编号' }],
            })(
              <Input style={{width:60}}/>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={8} style={{paddingLeft: 2,paddingRight: 2}}>
          <FormItem
            label="权重"
            labelCol={{ span: 14 }}
            wrapperCol={{ span: 8 }}
            style={{marginBottom:10}}
          >
            {getFieldDecorator('weight', {
              rules: [{ required: true, message: '请输入权重!' }],
            })(
              <InputNumber style={{width:60}}/>
            )}
          </FormItem>
        </Col>
        <Col md={10} sm={10} style={{paddingLeft: 2,paddingRight: 2}}>
          <FormItem
            label="X偏移系数"
            labelCol={{ span: 14 }}
            wrapperCol={{ span: 8 }}
            defaultValue="0"
            style={{marginBottom:10}}
          >
            {getFieldDecorator('xVal', {
              rules: [{ required: true, message: '请输入X偏移系数' }],
            })(
              <InputNumber style={{width:60}}/>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={8} style={{paddingLeft: 2,paddingRight: 2}}>
          <FormItem
            label="Y"
            labelCol={{ span: 14 }}
            wrapperCol={{ span: 8 }}
            defaultValue="0"
            style={{marginBottom:10}}
          >
            {getFieldDecorator('xOffset', {
              rules: [{ required: true, message: '请输入X偏移量' }],
            })(
              <InputNumber style={{width:60}}/>
            )}
          </FormItem>
        </Col>
        <Col md={10} sm={10} style={{paddingLeft: 2,paddingRight: 2}}>
          <FormItem
            label="Y偏移量"
            labelCol={{ span: 14 }}
            wrapperCol={{ span: 8 }}
            defaultValue="0"
            style={{marginBottom:10}}
          >
            {getFieldDecorator('yVal', {
              rules: [{ required: true, message: '请输入Y偏移系数' }],
            })(
              <InputNumber style={{width:60}}/>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={8} style={{paddingLeft: 2,paddingRight: 2}}>
          <FormItem
            label="Y"
            labelCol={{ span: 14 }}
            wrapperCol={{ span: 8 }}
            style={{marginBottom:10}}
          >
            {getFieldDecorator('yOffset', {
              rules: [{ required: true, message: '请输入Y偏移量' }],
            })(
              <InputNumber style={{width:60}}/>
            )}
          </FormItem>
        </Col>
        </Row>
      </Form>
    )
  }
}