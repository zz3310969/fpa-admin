import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {routerRedux, Link} from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../Formstyle.less';
import moment from "moment/moment";

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(state => ({
  commentrecord: state.commentrecord,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
    onlyread: false,
  };

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const optype = params.get('read'); // bar
    this.setState({
      onlyread: optype ? true : false,
    })
    const {dispatch} = this.props;
    if (this.props.match.params.id) {
      dispatch({
        type: 'commentrecord/fetchBasic',
        payload: {id: this.props.match.params.id}
      });
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'commentrecord/update',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/commentrecord'));
          },
        });
      }
    });
  }

  render() {
    const {commentrecord: {regularFormSubmitting: submitting, formdate, items, apps, status, consultants}} = this.props;
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
            <FormItem
              {...formItemLayout}
              label="所属系统"
            >
              {getFieldDecorator('appId', {
                initialValue: formdate.appId !== undefined ? formdate.appId + '' : '',
                rules: [{
                  required: true, message: '请输入所属系统',
                }],
              })(
                <Select showSearch disabled={this.state.onlyread}
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
                initialValue: formdate.itemId !== undefined ? formdate.itemId + '' : '',
                rules: [{
                  required: true, message: '请选择评价项',
                }],
              })(
                <Select showSearch disabled={this.state.onlyread}
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
                initialValue: formdate.consultantId !== undefined ? formdate.consultantId + '' : '',
                rules: [{
                  required: true, message: '请选择咨询师',
                }],
              })(
                <Select showSearch disabled={this.state.onlyread}
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
                initialValue: formdate.evalResult,
                rules: [{
                  required: true, message: '请输入评价结果',
                }],
              })(
                <Input placeholder="" disabled={this.state.onlyread}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="订单编号"
            >
              {getFieldDecorator('orderNumber', {
                initialValue: formdate.orderNumber,
                rules: [{
                  required: true, message: '请输入订单编号',
                }],
              })(
                <Input placeholder="" disabled={this.state.onlyread}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="评价人"
            >
              {getFieldDecorator('evaluator', {
                initialValue: formdate.evaluator,
                rules: [{
                  required: true, message: '请输入评价人',
                }],
              })(
                <Input placeholder="" disabled={this.state.onlyread}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="评价时间"
            >
              {getFieldDecorator('evalTime', {
                initialValue: moment(formdate.evalTime),
                rules: [{
                  required: true, message: '请输入评价时间',
                }],
              })(
                <DatePicker disabled={this.state.onlyread}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="状态"
            >
              {getFieldDecorator('status', {
                initialValue: formdate.status !== undefined ? formdate.status + '' : '',
                rules: [{
                  required: true, message: '请输入状态',
                }],
              })(
                <Select disabled={this.state.onlyread}>
                  {status.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                </Select>
              )}
            </FormItem>
            {getFieldDecorator('id', {
              initialValue: formdate.id,
              rules: [{
                required: true, message: '请输入主键',
              }],
            })(
              <Input type="hidden"/>
            )}

            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              {
                this.state.onlyread ? '' : (
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    提交
                  </Button>
                )
              }
              <Link to={'/advisory/commentrecord'}><Button style={{marginLeft: 8}}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
