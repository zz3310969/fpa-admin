import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {routerRedux, Link} from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import FooterToolbar from '../../../components/FooterToolbar';
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
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        debugger;
        const values = {
          ...fieldsValue,
          validityStartTime: fieldsValue.validityTime && fieldsValue.validityTime[0].format('YYYY-MM-DD HH:mm:ss'),
          validityEndTime: fieldsValue.validityTime && fieldsValue.validityTime[1].format('YYYY-MM-DD HH:mm:ss'),
          validityTime: '',
        };
        this.props.dispatch({
          type: 'advisoryproduct/add',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/advisory/advisoryproduct'));
          },
        });
      }
    });
  }

  render() {
    const {advisoryproduct: {regularFormSubmitting: submitting, apps, modes, status,consultants}} = this.props;
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
      <PageHeaderLayout title="" content="" wrapperClassName={styles.advancedForm}>
        <Form
          onSubmit={this.handleSubmit}
          layout="vertical" hideRequiredMark
        >
          <Card title="服务产品基本信息" className={styles.card} bordered={false}>
            {getFieldDecorator('id', {})(
              <Input type="hidden"/>
            )}
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="所属应用">
                  {getFieldDecorator('appId', {
                    rules: [{
                      required: true, message: '请选择所属应用',
                    }],
                  })(
                    <Select showSearch
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {apps.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
                <Form.Item label="所属咨询师">
                  {getFieldDecorator('consId', {
                    rules: [{
                      required: true, message: '请输入所属咨询师',
                    }],
                  })(
                    <Select showSearch
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {consultants.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 8, offset: 2}} lg={{span: 10}} md={{span: 24}} sm={24}>

                <Form.Item label="产品名称">
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '请输入产品名称',
                    }],
                  })(
                    <Input placeholder=""/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="产品编号">
                  {getFieldDecorator('code', {
                    rules: [{
                      required: true, message: '请输入产品编号',
                    }],
                  })(
                    <Input placeholder=""/>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
                <Form.Item label="服务模式">
                  {getFieldDecorator('modesId', {
                    rules: [{
                      required: true, message: '请选择服务模式',
                    }],
                  })(
                    <Select showSearch
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {modes.map(d => <Select.Option key={d.id}>{d.modeName}</Select.Option>)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 8, offset: 2}} lg={{span: 10}} md={{span: 24}} sm={24}>
                <Form.Item label="有效期">
                  {getFieldDecorator('validityTime', {
                    rules: [{
                      required: true, message: '请输入有效期',
                    }],
                  })(
                    <RangePicker style={{width: '100%'}}/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="状态">
                  {getFieldDecorator('status', {
                    rules: [{
                      required: true, message: '请输入状态',
                    }],
                  })(
                    <Select>
                      {status.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
                <Form.Item label="备注">
                  {getFieldDecorator('remark', {
                    rules: [{
                      required: true, message: '请输入备注',
                    }],
                  })(
                    <textarea cols="35" placeholder=""/>
                  )}
                </Form.Item>
              </Col>
              {/*<Col xl={{span: 8, offset: 2}} lg={{span: 10}} md={{span: 24}} sm={24}>*/}
                {/*<Form.Item label="咨询定价">*/}
                  {/*{getFieldDecorator('advisId', {*/}
                    {/*rules: [{*/}
                      {/*required: true, message: '请输入咨询定价',*/}
                    {/*}],*/}
                  {/*})(*/}
                    {/*<Select showSearch*/}
                    {/*filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}*/}
                    {/*>*/}
                  {/*{pricings.map(d => <Select.Option key={d.id}>{d.fixType}</Select.Option>)}*/}
                    {/*</Select>*/}
                  {/*)}*/}
                {/*</Form.Item>*/}
              {/*</Col>*/}
            </Row>

          </Card>
          <Card title="定价管理" className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="时长">
                  {getFieldDecorator('advisoryPricing.unit', {
                    rules: [{
                      required: true, message: '请输入时长',
                    }],
                  })(
                    <InputNumber precision={0}  size={100} />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
                <Form.Item label="价格">
                  {getFieldDecorator('advisoryPricing.currentPrice', {
                    rules: [{
                      required: true, message: '价格',
                    }],
                  })(
                    <InputNumber precision={2} size={100}/>
                  )}
                </Form.Item>
              </Col>
            </Row>


          </Card>
          <FooterToolbar>
            <FormItem style={{marginTop: 5}}>
              {
                this.state.onlyread ? '' : (
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    提交
                  </Button>
                )
              }
              <Link to={'/advisory/advisoryproduct'}><Button style={{marginLeft: 8}}>取消</Button></Link>
            </FormItem>
          </FooterToolbar>
        </Form>
      </PageHeaderLayout>
    );
  }
}
