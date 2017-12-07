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
  servicerecord: state.servicerecord,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;

  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'servicerecord/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/servicerecord'));
          },
        });
      }
    });
  }
  render() {
    const { servicerecord: { regularFormSubmitting:submitting } } = this.props;
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
                        label="咨询师ID"
                >
                    {getFieldDecorator('counselorId', {
                    rules: [{
                      required: true, message: '请输入咨询师ID',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="客户ID"
                >
                    {getFieldDecorator('customerId', {
                    rules: [{
                      required: true, message: '请输入客户ID',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="咨询主题ID"
                >
                    {getFieldDecorator('themeId', {
                    rules: [{
                      required: true, message: '请输入咨询主题ID',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="服务时长"
                >
                    {getFieldDecorator('duration', {
                    rules: [{
                      required: true, message: '请输入服务时长',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="服务开始时间"
                >
                    {getFieldDecorator('startTime', {
                    rules: [{
                      required: true, message: '请输入服务开始时间',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="服务结束时间"
                >
                    {getFieldDecorator('endTime', {
                    rules: [{
                      required: true, message: '请输入服务结束时间',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="服务评价"
                >
                    {getFieldDecorator('evaluation', {
                    rules: [{
                      required: true, message: '请输入服务评价',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="星级"
                >
                    {getFieldDecorator('evaluationRank', {
                    rules: [{
                      required: true, message: '请输入星级',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="评价时间"
                >
                    {getFieldDecorator('evaluationTime', {
                    rules: [{
                      required: true, message: '请输入评价时间',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
                <Link to={'/servicerecord'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
