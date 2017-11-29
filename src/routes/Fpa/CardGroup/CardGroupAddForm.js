import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,Row,Col
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../Formstyle.less';
import CardUnit from "./CardUnit";


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  cardgroup: state.cardgroup,
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
          type: 'cardgroup/add',
          payload: values,
        });
      }
    });
  }
  render() {
    const { cardgroup: { regularFormSubmitting:submitting } } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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
            <Row gutter={{ md: 2, lg: 24, xl: 48 }}>
                    {getFieldDecorator('id', {

                    })(
                    <Input type="hidden"/>
                    )}
                <Col md={12} sm={12}>
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
                </Col>
                <Col md={12} sm={12}>
                <FormItem
                        {...formItemLayout}
                        label="张数"
                >
                    {getFieldDecorator('amount', {
                    rules: [{
                      required: true, message: '请输入张数',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                </Col>
                <Col md={12} sm={12}>
                <FormItem
                        {...formItemLayout}
                        label="是否可用"
                >
                    {getFieldDecorator('usable', {
                    rules: [{
                      required: true, message: '请输入是否可用',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                </Col>
            
              <Col md={24} sm={24}><CardUnit/></Col>
              <Col md={25} sm={24}>
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit" loading={submitting}>提交</Button>
                <Link to={'/cardgroup'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
