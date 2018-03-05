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
  commentitems: state.commentitems,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
    onlyread:false,
  };

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const optype = params.get('read'); // bar
    this.setState({
      onlyread:optype?true:false,
    })
    const { dispatch } = this.props;
    if(this.props.match.params.id){
      dispatch({
        type: 'commentitems/fetchBasic',
        payload:{id:this.props.match.params.id}
      });
    }
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'commentitems/update',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/commentitems'));
          },
        });
      }
    });
  }
  render() {
    const { commentitems: { regularFormSubmitting:submitting, formdate, templates, status, eval_modes, prosetaion_types } } = this.props;
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
                  initialValue:formdate.id,
                  rules: [{
                    required: true, message: '请输入评价项id',
                  }],
                })(
                    <Input type="hidden"/>
                  )}
              <FormItem
                  {...formItemLayout}
                  label="评价项名称"
              >
                  {getFieldDecorator('name', {
                    initialValue:formdate.name,
                    rules: [{
                      required: true, message: '请输入评价项',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="评价方式"
              >
                  {getFieldDecorator('evalMode', {
                    initialValue:formdate.evalMode!== undefined ?formdate.evalMode+'':'',

                    rules: [{
                      required: true, message: '请输入评价方式',
                    }],
                  })(
                    <Select  showSearch disabled={this.state.onlyread}
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
                    initialValue:formdate.totalScore,
                    rules: [{
                      required: true, message: '请输入总分',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="展现方式"
              >
                  {getFieldDecorator('prosetaionType', {
                    initialValue:formdate.prosetaionType!== undefined ?formdate.prosetaionType+'':'',
                    rules: [{
                      required: true, message: '请输入展现方式',
                    }],
                  })(
                    <Select  showSearch disabled={this.state.onlyread}
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
                    initialValue:formdate.status!== undefined ?formdate.status+'':'',
                    rules: [{
                      required: true, message: '请输入状态',
                    }],
                  })(
                    <Select disabled={this.state.onlyread}>
                      {status.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                    </Select>
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="评价模版"
              >
                  {getFieldDecorator('commentTemplate', {
                    initialValue: formdate.commentTemplate !== undefined ? formdate.commentTemplate + '' : '',
                    rules: [{
                      required: true, message: '请输入评价模版id',
                    }],
                  })(
                    <Select showSearch disabled={this.state.onlyread}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {templates.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                    </Select>
                  )}
              </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                {
                this.state.onlyread ?'':(
                <Button type="primary" htmlType="submit" loading={submitting}>
                    提交
                </Button>
                )
                }
                <Link to={'/advisory/commentitems'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
