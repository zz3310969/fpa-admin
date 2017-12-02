import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,Row,Col,
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
        type: 'character/fetchBasic',
        payload:{id:this.props.match.params.id}
      });
    };
    dispatch({
      type: 'character/base',
    });
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'character/update',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/character/charactertheme'));
          },
        });
      }
    });
  }
  render() {
    const { character: { regularFormSubmitting:submitting, formdate, states, themes, genders, colors } } = this.props;
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
                    required: true, message: '请输入主键',
                  }],
                })(
                    <Input type="hidden"/>
                  )}
              <Row >
              <Col span={12}>
              <FormItem
                  {...formItemLayout}
                  label="主题名称"
              >
                  {getFieldDecorator('name', {
                    initialValue:formdate.name,
                    rules: [{
                      required: true, message: '请输入主题名称',
                    }],
                  })(
                    <Input placeholder="" disabled={this.state.onlyread} />
                  )}
              </FormItem>
              </Col>
              <Col span={12}>
              <FormItem
                  {...formItemLayout}
                  label="主题"
              >
                  {getFieldDecorator('themeId', {
                    initialValue:formdate.themeId !== undefined ?formdate.themeId+'':'',
                    rules: [{
                      required: true, message: '请选择主题',
                    }],
                  })(
                  <Select disabled={this.state.onlyread} >
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
                  label="所属性格"
              >
                  {getFieldDecorator('characterColorId', {
                    initialValue:formdate.characterColorId !== undefined ?formdate.characterColorId+'':'',
                    rules: [{
                      required: true, message: '请选择性格色彩',
                    }],
                  })(
                  <Select disabled={this.state.onlyread} >
                    {colors.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                  </Select>
                  )}
              </FormItem>
              </Col>
              <Col span={12}>
              <FormItem
                  {...formItemLayout}
                  label="适用性别"
              >
                  {getFieldDecorator('gender', {
                    initialValue:formdate.gender !== undefined ?formdate.gender+'':'',
                    rules: [{
                      required: true, message: '请选择适用性别',
                    }],
                  })(
                  <Select disabled={this.state.onlyread} >
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
                    initialValue:formdate.state !== undefined ?formdate.state+'':'',
                    rules: [{
                      required: true, message: '请选择状态',
                    }],
                  })(
                  <Select disabled={this.state.onlyread} >
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
                    initialValue:formdate.description,
                    rules: [{
                      required: true, message: '请输入描述',
                    }],
                  })(
                    <TextArea placeholder="" disabled={this.state.onlyread} autosize={{ minRows: 4, maxRows: 8 }}/>
                  )}
              </FormItem>
              </Col>
              </Row>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                {
                this.state.onlyread ?'':(
                <Button type="primary" htmlType="submit" loading={submitting}>
                    提交
                </Button>
                )
                }
                <Link to={'/character/charactertheme'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
