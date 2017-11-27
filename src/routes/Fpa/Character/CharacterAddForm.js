import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../Formstyle.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  character: state.character,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'character/base',
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'character/add',
          payload: values,
        });
      }
    });
  }
  render() {
    const { character: { regularFormSubmitting: submitting, states, themes, genders, colors } } = this.props;
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
                      <Input type="hidden" />
                    )}
            <Row >
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="性格主题名称"
                >
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '请输入性格主题名称',
                    }],
                    })(
                      <Input placeholder="" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="主题ID"
                >
                  {getFieldDecorator('themeId', {
                    rules: [{
                      required: true, message: '请输入主题',
                    }],
                    })(
                      <Select>
                        {themes.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                      </Select>
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row >
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="性格色彩"
                >
                  {getFieldDecorator('characterColorId', {
                    rules: [{
                      required: true, message: '请输入性格色彩ID',
                    }],
                    })(
                      <Select>
                        {colors.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                      </Select>
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
            </Row>
            <Row >
              <Col span={12}>
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
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="描述"
                >
                  {getFieldDecorator('description', {
                    rules: [{
                      required: true, message: '请输入描述',
                    }],
                    })(
                      <TextArea placeholder="" />
                    )}
                </FormItem>
              </Col>
            </Row>


            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Link to="/character/charactertheme"><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
