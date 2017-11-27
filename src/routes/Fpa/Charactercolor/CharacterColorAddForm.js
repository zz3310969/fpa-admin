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
  state = {
  };

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
        });
      }
    });
  }
  render() {
    const { charactercolor: { regularFormSubmitting: submitting, states } } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    function handleChange(value) {
      console.log(`selected ${value}`);
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
            {getFieldDecorator('id', {

                    })(
                      <Input type="hidden" />
                    )}
            <FormItem
              {...formItemLayout}
              label="编号"
            >
              {getFieldDecorator('numb', {
                    rules: [{
                    required: true, message: '请输入编号',
                    }],
                    })(
                      <Input placeholder="" />
                    )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="名称"
            >
              {getFieldDecorator('name', {
                    rules: [{
                    required: true, message: '请输入名称',
                    }],
                    })(
                      <Input placeholder="" />
                    )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="代表颜色"
            >
              {getFieldDecorator('colorId', {
                    rules: [{
                    required: true, message: '请输入代表颜色',
                    }],
                    })(
                      <Select
                        multiple
                        style={{ width: '100%' }}
                        placeholder="请选择代表颜色，最多选两个"
                        defaultValue={['a10', 'c12']}
                        onChange={handleChange}
                      >
                        {children}
                      </Select>
                    )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="描述"
            >
              {getFieldDecorator('description', {
                    rules: [{
                    required: true, message: '请输入描述',
                    }],
                    })(
                      <Input placeholder="" />
                    )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="状态"
            >
              {getFieldDecorator('state', {
                    rules: [{
                    required: true, message: '请输入状态',
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
