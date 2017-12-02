/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../Formstyle.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  charactercolor: state.charactercolor,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'charactercolor/base',
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'charactercolor/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/character/color'));
          },
        });
      }
    });
  }

  render() {
    const { charactercolor: { regularFormSubmitting: submitting, states, colors } } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    function handleChange(value) {
      const disvals = [];
      if (value.length == 2) {
        colors.map((n, i) => {
          n.disabled = true;
        });
        colors.map((n, i) => {
          value.map((v) => {
            if (n.id == v) {
              n.disabled = false;
            }
          });
        });
      } else if (value.length < 2) {
        colors.map((n, i) => {
          n.disabled = false;
        });
      } else {
        console.log('不能了，进来就死定了');
      }
    }

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
            {getFieldDecorator('id', {})(
              <Input type="hidden" />
            )}
            <FormItem
              {...formItemLayout}
              label="性格编号"
            >
              {getFieldDecorator('numb', {
                rules: [{
                  required: true, message: '请输入性格编号',
                }],
              })(
                <Input placeholder="" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="性格名称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入性格名称',
                }],
              })(
                <Input placeholder="" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="代表颜色"
            >
              {getFieldDecorator('colorIds', {
                rules: [{
                  required: true, message: '请选择代表颜色',
                }],
              })(
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择代表颜色，最多选两个"
                  onChange={handleChange}
                >
                  {colors.map(d => (<Select.Option key={d.id} disabled={d.disabled}>
                    <div style={{ background: d.code }}>{d.display}</div>
                  </Select.Option>))}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="定义"
            >
              {getFieldDecorator('description', {
                rules: [{
                  required: true, message: '请输入定义',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入定义" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="状态"
            >
              {getFieldDecorator('state', {
                initialValue:states.length >0 ?states[0].code+'':'',
                rules: [{
                  required: true, message: '请选择状态',
                }],
              })(
                <Select>
                  {states.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                </Select>
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Link to="/character/color"><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
