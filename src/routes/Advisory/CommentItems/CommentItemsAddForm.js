import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {routerRedux, Link} from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../Formstyle.less';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(state => ({
  commentitems: state.commentitems,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {};

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'commenttemplate/base',
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'commentitems/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/commentitems'));
          },
        });
      }
    });
  }

  render() {
    const {commentitems: {regularFormSubmitting: submitting, templates, status, eval_modes, prosetaion_types}} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };

    return (
      <PageHeaderLayout title="" content="">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{marginTop: 8}}
          >
            {getFieldDecorator('id', {})(
              <Input type="hidden"/>
            )}
            <FormItem
              {...formItemLayout}
              label="评价项"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入评价项名称',
                }],
              })(
                <Input placeholder=""/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="评价方式"
            >
              {getFieldDecorator('evalMode', {
                rules: [{
                  required: true, message: '请选择评价方式',
                }],
              })(
                <Select showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {eval_modes.map(d => <Select.Option key={d.val}>{d.text}</Select.Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="总分"
            >
              {getFieldDecorator('totalScore', {
                rules: [{
                  required: true, message: '请输入总分',
                }],
              })(
                <Input placeholder=""/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="展现方式"
            >
              {getFieldDecorator('prosetaionType', {
                rules: [{
                  required: true, message: '请选择展现方式',
                }],
              })(
                <Select showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {prosetaion_types.map(d => <Select.Option key={d.val}>{d.text}</Select.Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="状态"
            >
              {getFieldDecorator('status', {
                rules: [{
                  required: true, message: '请选择状态',
                }],
              })(

                <Select>
                  {status.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="评价模版"
            >
              {getFieldDecorator('commentTemplate', {
                rules: [{
                  required: true, message: '请输入评价模版id',
                }],
              })(
                <Select showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {templates.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                </Select>
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Link to={'/advisory/commentitems'}><Button style={{marginLeft: 8}}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
