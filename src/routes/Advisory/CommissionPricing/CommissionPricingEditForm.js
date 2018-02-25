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
  commissionpricing: state.commissionpricing,
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
    dispatch({
      type: 'commissionpricing/base',
    });
    if(this.props.match.params.id){
      dispatch({
        type: 'commissionpricing/fetchBasic',
        payload:{id:this.props.match.params.id}
      });
    }
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'commissionpricing/update',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/commissionpricing'));
          },
        });
      }
    });
  }
  render() {
    const { commissionpricing: { regularFormSubmitting:submitting, formdate ,status,apps} } = this.props;
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
                    required: true, message: '请输入id',
                  }],
                })(
                    <Input type="hidden"/>
                  )}
              <FormItem
                  {...formItemLayout}
                  label="所属系统"
              >
                  {getFieldDecorator('appId', {
                    initialValue:formdate.appId!== undefined ?formdate.appId+'':'',
                    rules: [{
                      required: true, message: '请输入所属系统',
                    }],
                  })(
                    <Select disabled={this.state.onlyread}  showSearch
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {apps.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                    </Select>
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="咨询师姓名"
              >
                  {getFieldDecorator('consultantId', {
                    initialValue:formdate.consultantId,
                    rules: [{
                      required: true, message: '请输入咨询师姓名',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="咨询模式"
              >
                  {getFieldDecorator('moldeId', {
                    initialValue:formdate.moldeId,
                    rules: [{
                      required: true, message: '请输入咨询模式',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="定价类型"
              >
                  {getFieldDecorator('fixType', {
                    initialValue:formdate.fixType,
                    rules: [{
                      required: true, message: '请输入定价类型',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="单位"
              >
                  {getFieldDecorator('unit', {
                    initialValue:formdate.unit,
                    rules: [{
                      required: true, message: '请输入单位',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="原单价"
              >
                  {getFieldDecorator('originalPrice', {
                    initialValue:formdate.originalPrice,
                    rules: [{
                      required: true, message: '请输入原单价',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="现单价"
              >
                  {getFieldDecorator('currentPrice', {
                    initialValue:formdate.currentPrice,
                    rules: [{
                      required: true, message: '请输入现单价',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="简介"
              >
                  {getFieldDecorator('introduction', {
                    initialValue:formdate.introduction,
                    rules: [{
                      required: true, message: '请输入简介',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
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
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                {
                this.state.onlyread ?'':(
                <Button type="primary" htmlType="submit" loading={submitting}>
                    提交
                </Button>
                )
                }
                <Link to={'/advisory/commissionpricing'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
