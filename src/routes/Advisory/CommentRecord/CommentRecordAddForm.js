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
  commentrecord: state.commentrecord,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'commentrecord/base',
    })
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'commentrecord/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/commentrecord'));
          },
        });
      }
    });
  }
  render() {
    const { commentrecord: { regularFormSubmitting:submitting ,items, apps, status, consultants} } = this.props;
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
                      >
                        {apps.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                      </Select>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="评价项"
                >
                    {getFieldDecorator('itemId', {
                    rules: [{
                      required: true, message: '请输入评价项',
                    }],
                    })(
                      <Select showSearch
                              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        {items.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                      </Select>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="咨询师"
                >
                    {getFieldDecorator('consultantId', {
                    rules: [{
                      required: true, message: '请输入咨询师',
                    }],
                    })(
                      <Select showSearch
                              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        {consultants.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                      </Select>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="评价结果"
                >
                    {getFieldDecorator('evalResult', {
                    rules: [{
                      required: true, message: '请输入评价结果',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="订单编号"
                >
                    {getFieldDecorator('orderNumber', {
                    rules: [{
                      required: true, message: '请输入订单编号',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="评价人"
                >
                    {getFieldDecorator('evaluator', {
                    rules: [{
                      required: true, message: '请输入评价人',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="评价时间"
                >
                    {getFieldDecorator('evalTime', {
                    rules: [{
                      required: true, message: '请输入评价时间',
                    }],
                    })(
                    <DatePicker/>
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
                    {getFieldDecorator('id', {

                    })(
                    <Input type="hidden"/>
                    )}

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
                <Link to={'/advisory/commentrecord'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
