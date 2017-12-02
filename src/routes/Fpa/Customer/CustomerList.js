import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message,Table  } from 'antd';
import CustomerTable from './CustomerTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../defaultTableList.less';
const { MonthPicker, RangePicker } = DatePicker;

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');




@connect(state => ({
  customer: state.customer,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    addInputValue: '',
    selectedRows: [],
    formValues: {},
    limit:10,
    currentPage:1,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/fetch',
    });
    dispatch({
      type: 'customer/base',
    });
  }
  componentWillReceiveProps(nextProps) {

  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      limit: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    this.setState({
      currentPage: pagination.current,
      limit: pagination.pageSize,
    });
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'customer/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'customer/fetch',
      payload: {},
    });
  }


  reLoadList = () => {
    const { form, dispatch } = this.props;
    const { formValues,currentPage,limit } = this.state;
    const params = {
      currentPage: currentPage,
      limit: limit,
      ...formValues,
    };
    dispatch({
      type: 'customer/fetch',
      payload: params,
    });
  }

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'customer/remove',
          payload: {
            ids: selectedRows.map(row => row.id).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        followTimeStart:fieldsValue.followTime && fieldsValue.followTime[0].format('YYYY-MM-DD'),
        followTimeEnd:fieldsValue.followTime && fieldsValue.followTime[1].format('YYYY-MM-DD'),
        followTime:'',
      };
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'customer/fetch',
        payload: values,
      });
    });
  }


  renderAdvancedForm() {
    const { customer: { genders } } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
              <FormItem label="姓名">
                  {getFieldDecorator('name')(
                  <Input placeholder="" />
                  )}
              </FormItem>
              </Col>
              <Col md={8} sm={24}>
              <FormItem label="昵称">
                  {getFieldDecorator('nickName')(
                  <Input placeholder="" />
                  )}
              </FormItem>
              </Col>
              <Col md={8} sm={24}>
              <FormItem label="联系电话">
                  {getFieldDecorator('mobile')(
                  <Input placeholder="" />
                  )}
              </FormItem>
              </Col>

           </Row >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
              <FormItem label="性别">
                  {getFieldDecorator('gender')(
                  <Select>
                    {genders.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                  </Select>
                  )}
              </FormItem>
              </Col>
              <Col md={8} sm={24}>
              <FormItem label="地区">
                  {getFieldDecorator('area')(
                  <Input placeholder="" />
                  )}
              </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="关注时间">
                  {getFieldDecorator('followTime')(
                    <RangePicker style={{ width: '100%' }}/>
                  )}
                </FormItem>
              </Col>
           </Row >
        <div style={{ overflow: 'hidden' }}>
              <span style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              </span>
        </div>
      </Form>
    );
  }



  renderForm() {
    return this.renderAdvancedForm();
  }

  render() {
    const { customer: { loading: customerLoading, data } } = this.props;
    const { selectedRows } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">批量刷新</Menu.Item>
      </Menu>
    );



    return (
      <PageHeaderLayout title="客户列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>

              {
                selectedRows.length > 0 && (
                  <span>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>



            <CustomerTable
              selectedRows={selectedRows}
              loading={customerLoading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              reLoadList={this.reLoadList}
            />


          </div>
        </Card>

      </PageHeaderLayout>
    );
  }
}
