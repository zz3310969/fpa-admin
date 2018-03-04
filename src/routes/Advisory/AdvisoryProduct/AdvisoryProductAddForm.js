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
  advisoryproduct: state.advisoryproduct,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {};

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'advisoryproduct/base',
    });

  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          validityStartTime:fieldsValue.validityTime && fieldsValue.validityTime[0].format('YYYY-MM-DD HH:mm:ss'),
          validityEndTime:fieldsValue.validityTime && fieldsValue.validityTime[1].format('YYYY-MM-DD HH:mm:ss'),
          validityTime:'',
        };
        this.props.dispatch({
          type: 'advisoryproduct/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisoryproduct'));
          },
        });
      }
    });
  }

  render() {
    const {advisoryproduct: {regularFormSubmitting: submitting, apps, modes, status}} = this.props;
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
              label="所属应用"
            >
              {getFieldDecorator('appId', {
                rules: [{
                  required: true, message: '请输入所属应用',
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
              label="所属咨询师"
            >
              {getFieldDecorator('consId', {
                rules: [{
                  required: true, message: '请输入所属咨询师',
                }],
              })(
                <Input placeholder=""/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="产品名称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入产品名称',
                }],
              })(
                <Input placeholder=""/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="产品编号"
            >
              {getFieldDecorator('code', {
                rules: [{
                  required: true, message: '请输入产品编号',
                }],
              })(
                <Input placeholder=""/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="服务模式"
            >
              {getFieldDecorator('modesId', {
                rules: [{
                  required: true, message: '请输入服务模式',
                }],
              })(
                <Select showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {modes.map(d => <Select.Option key={d.id}>{d.modeName}</Select.Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="咨询定价id"
            >
              {getFieldDecorator('advisId', {
                rules: [{
                  required: true, message: '请输入咨询定价id',
                }],
              })(
                <Input placeholder=""/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="有效期"
            >
              {getFieldDecorator('validityTime', {
                rules: [{
                  required: true, message: '请输入有效期',
                }],
              })(
                <RangePicker showTime={{ format: 'HH:mm:ss' }}
                             format="YYYY-MM-DD HH:mm:ss"
                             placeholder={['开始日期', '结束日期']}
                              style={{ width: '100%' }}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator('remark', {
                rules: [{
                  required: true, message: '请输入备注',
                }],
              })(
                <Input placeholder=""/>
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

            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Link to={'/advisory/advisoryproduct'}><Button style={{marginLeft: 8}}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
