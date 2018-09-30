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
  advisorypricing: state.advisorypricing,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'advisorypricing/base',
    });
    if(this.props.match.params.id){
      dispatch({
        type: 'advisorypricing/fetchConsultant',
        payload:{id:this.props.match.params.id}
      });
    }

  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          validityStartTime:fieldsValue.validityTime && fieldsValue.validityTime[0].format('YYYY-MM-DD'),
          validityEndTime:fieldsValue.validityTime && fieldsValue.validityTime[1].format('YYYY-MM-DD'),
          validityTime:'',
        };
        this.props.dispatch({
          type: 'advisorypricing/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisorypricing'));
          },
        });
      }
    });


  }
  render() {
    const { advisorypricing: { regularFormSubmitting:submitting,apps,status,fix_types,formdate } } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const advisoryModes = this.props.advisorypricing.advisoryModes.filter(item => item.appId +"" == this.props.form.getFieldValue("appId"));

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
                    {getFieldDecorator('consultantId', {
                    initialValue:formdate.consultantId,
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
                    <Select showSearch
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      onChange={this.onAppChange} disabled={true}
                    >
                      {apps.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="咨询师"
                >
                    {getFieldDecorator('consultantName', {
                    initialValue:formdate.consultantName,
                    rules: [{
                      required: true, message: '请输入咨询师',
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
                      {advisoryModes.map(d => <Select.Option key={d.id}>{d.modeName}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>
                {/*<FormItem*/}
                        {/*{...formItemLayout}*/}
                        {/*label="定价类型"*/}
                {/*>*/}
                    {/*{getFieldDecorator('fixType', {*/}
                    {/*rules: [{*/}
                      {/*required: true, message: '请输入定价类型',*/}
                    {/*}],*/}
                    {/*})(*/}
                    {/*<Select>*/}
                      {/*{fix_types.map(d => <Select.Option key={d.val}>{d.text}</Select.Option>)}*/}
                    {/*</Select>*/}
                    {/*)}*/}
                {/*</FormItem>*/}
                <FormItem
                        {...formItemLayout}
                        label="时长（分钟）"
                >
                    {getFieldDecorator('unit', {
                    rules: [{
                      required: true, message: '请输入时长',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                {/*<FormItem*/}
                        {/*{...formItemLayout}*/}
                        {/*label="原单价"*/}
                {/*>*/}
                    {/*{getFieldDecorator('originalPrice', {*/}
                    {/*rules: [{*/}
                      {/*required: true, message: '请输入原单价',*/}
                    {/*}],*/}
                    {/*})(*/}
                    {/*<Input placeholder="" />*/}
                    {/*)}*/}
                {/*</FormItem>*/}
                <FormItem
                        {...formItemLayout}
                        label="价格"
                >
                    {getFieldDecorator('currentPrice', {
                    rules: [{
                      required: true, message: '请输入价格',
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
                        label="有效期"
                >
                    {getFieldDecorator('validityTime', {
                    rules: [{
                      required: true, message: '请输入有效期',
                    }],
                    })(
                    <RangePicker style={{ width: '100%' }}/>
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
                <Link to={'/advisorypricing'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
