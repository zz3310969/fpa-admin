import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message,Table } from 'antd';
import CommissionPricingTable from './CommissionPricingTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../defaultTableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');




@connect(state => ({
  commissionpricing: state.commissionpricing,
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
      type: 'commissionpricing/base',
    });
    dispatch({
      type: 'commissionpricing/fetch',
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
      type: 'commissionpricing/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'commissionpricing/fetch',
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
      type: 'commissionpricing/fetch',
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
          type: 'commissionpricing/remove',
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
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'commissionpricing/fetch',
        payload: values,
      });
    });
  }


  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    const { commissionpricing: {apps,status,advisoryModes,fix_types, } } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
              <FormItem label="所属系统">
                {getFieldDecorator('appId')(
                  <Select showSearch
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {apps.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                  </Select>
                  )}
              </FormItem>
              </Col>
              <Col md={8} sm={24}>
              <FormItem label="咨询师姓名">
                  {getFieldDecorator('consultantId')(
                  <Input placeholder="" />
                  )}
              </FormItem>
              </Col>
              <Col md={8} sm={24}>
              <FormItem label="咨询模式">
                  {getFieldDecorator('moldeId')(
                  <Select>
                    {advisoryModes.map(d => <Select.Option key={d.id}>{d.modeName}</Select.Option>)}
                  </Select>
                  )}
              </FormItem>
              </Col>
           </Row >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
              <FormItem label="定价类型">
                  {getFieldDecorator('fixType')(
                  <Select>
                    {fix_types.map(d => <Select.Option key={d.val}>{d.text}</Select.Option>)}
                  </Select>
                  )}
              </FormItem>
              </Col>
              <Col md={8} sm={24}>
              <FormItem label="单位">
                  {getFieldDecorator('unit')(
                  <Input placeholder="" />
                  )}
              </FormItem>
              </Col>
              <Col md={8} sm={24}>
              <FormItem label="原单价">
                  {getFieldDecorator('originalPrice')(
                  <Input placeholder="" />
                  )}
              </FormItem>
              </Col>
           </Row >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
              <FormItem label="现单价">
                  {getFieldDecorator('currentPrice')(
                  <Input placeholder="" />
                  )}
              </FormItem>
              </Col>
              <Col md={8} sm={24}>
              <FormItem label="简介">
                  {getFieldDecorator('introduction')(
                  <Input placeholder="" />
                  )}
              </FormItem>
              </Col>
              <Col md={8} sm={24}>
              <FormItem label="状态">
                  {getFieldDecorator('status')(
                  <Select>
                    {status.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                  </Select>
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
    const { commissionpricing: { loading: commissionpricingLoading, data } } = this.props;
    const { selectedRows } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">批量刷新</Menu.Item>
      </Menu>
    );



    return (
      <PageHeaderLayout title="咨询佣金定价列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => {this.props.dispatch(routerRedux.push('/advisory/commissionpricing/add')); console.log('新建')}}>新建</Button>
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



            <CommissionPricingTable
              selectedRows={selectedRows}
              loading={commissionpricingLoading}
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
