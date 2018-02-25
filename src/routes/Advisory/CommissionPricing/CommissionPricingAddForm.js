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
    advisoryModes:[]
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'commissionpricing/base',
    });

  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'commissionpricing/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/commissionpricing'));
          },
        });
      }
    });
  }
  onAppChange = (value) => {
    let allModes = this.props.commissionpricing.advisoryModes;
    let advisoryModes = new Array();
    
      for (var i = 0; i < allModes.length; i++) {
        if(allModes[i].appId +"" == value){
          advisoryModes.push(allModes[i]);
        }
        console.log(allModes[i])
      }
      this.props.form.setFieldsValue({"moldeId":''});
      this.setState({
        advisoryModes,
      })
    };

  render() {
    const { commissionpricing: { regularFormSubmitting:submitting,apps,status,advisoryModes,fix_types, } } = this.props;
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
                      onChange={this.onAppChange}
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
                    rules: [{
                      required: true, message: '请输入咨询师姓名',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="咨询模式"
                >
                    {getFieldDecorator('moldeId', {
                    rules: [{
                      required: true, message: '请输入咨询模式',
                    }],
                    })(
                    <Select>
                      {this.state.advisoryModes.map(d => <Select.Option key={d.id}>{d.modeName}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="定价类型"
                >
                    {getFieldDecorator('fixType', {
                    rules: [{
                      required: true, message: '请输入定价类型',
                    }],
                    })(
                    <Select>
                      {fix_types.map(d => <Select.Option key={d.val}>{d.text}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="单位"
                >
                    {getFieldDecorator('unit', {
                    rules: [{
                      required: true, message: '请输入单位',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="原单价"
                >
                    {getFieldDecorator('originalPrice', {
                    rules: [{
                      required: true, message: '请输入原单价',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="现单价"
                >
                    {getFieldDecorator('currentPrice', {
                    rules: [{
                      required: true, message: '请输入现单价',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="简介"
                >
                    {getFieldDecorator('introduction', {
                    rules: [{
                      required: true, message: '请输入简介',
                    }],
                    })(
                    <TextArea rows={4} placeholder="" />
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
                <Link to={'/advisory/commissionpricing'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
