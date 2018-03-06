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
  card: state.card,
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
          type: 'card/add',
          payload: values,
        });
      }
    });
  }
  render() {
    const { card: { regularFormSubmitting:submitting } } = this.props;
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
                        label="所属套牌"
                >
                    {getFieldDecorator('cardGroupId', {
                    rules: [{
                      required: true, message: '请输入所属套牌',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
                <Link to={'/card'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
