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
  quickreply: state.quickreply,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'quickreply/base',
    });

  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'quickreply/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/quickreply'));
          },
        });
      }
    });
  }
  render() {
    const { quickreply: { regularFormSubmitting:submitting,apps,status,quickreply_types } } = this.props;
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
                    >
                      {apps.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="知识标题"
                >
                    {getFieldDecorator('title', {
                    rules: [{
                      required: true, message: '请输入知识标题',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="知识类型"
                >
                    {getFieldDecorator('type', {
                    rules: [{
                      required: true, message: '请输入知识类型',
                    }],
                    })(
                    <Select>
                      {quickreply_types.map(d => <Select.Option key={d.val}>{d.text}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="所有人"
                >
                    {getFieldDecorator('userId', {
                    rules: [{
                      required: true, message: '请输入所有人',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="详情"
                >
                    {getFieldDecorator('detail', {
                    rules: [{
                      required: true, message: '请输入详情',
                    }],
                    })(
                    <TextArea rows={10} placeholder="" />
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
                <Link to={'/advisory/quickreply'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
