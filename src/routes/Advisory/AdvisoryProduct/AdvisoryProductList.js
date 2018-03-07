import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {routerRedux, Link} from 'dva/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Table
} from 'antd';
import AdvisoryProductTable from './AdvisoryProductTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../defaultTableList.less';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


@connect(state => ({
  advisoryproduct: state.advisoryproduct,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    addInputValue: '',
    selectedRows: [],
    formValues: {},
    limit: 10,
    currentPage: 1,
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'advisoryproduct/base',
    });
    dispatch({
      type: 'advisoryproduct/fetch',
    });
  }

  componentWillReceiveProps(nextProps) {

  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
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
      type: 'advisoryproduct/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    dispatch({
      type: 'advisoryproduct/fetch',
      payload: {},
    });
  }


  reLoadList = () => {
    const {form, dispatch} = this.props;
    const {formValues, currentPage, limit} = this.state;
    const params = {
      currentPage: currentPage,
      limit: limit,
      ...formValues,
    };
    dispatch({
      type: 'advisoryproduct/fetch',
      payload: params,
    });
  }

  handleMenuClick = (e) => {
    const {dispatch} = this.props;
    const {selectedRows} = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'advisoryproduct/remove',
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

    const {dispatch, form} = this.props;

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
        type: 'advisoryproduct/fetch',
        payload: values,
      });
    });
  }


  renderAdvancedForm() {
    const {advisoryproduct: {status, apps, modes}} = this.props;
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="所属应用">
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
            <FormItem label="产品名称">
              {getFieldDecorator('name')(
                <Input placeholder=""/>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="服务模式">
              {getFieldDecorator('modesId')(
                <Select showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {modes.map(d => <Select.Option key={d.id}>{d.modeName}</Select.Option>)}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态">
              {getFieldDecorator('status')(
                <Select>
                  {status.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
                  </span>
          </Col>
        </Row>

      </Form>
    );
  }


  renderForm() {
    return this.renderAdvancedForm();
  }

  render() {
    const {advisoryproduct: {loading: advisoryproductLoading, data}} = this.props;
    const {selectedRows} = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">批量刷新</Menu.Item>
      </Menu>
    );


    return (
      <PageHeaderLayout title="服务产品列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => {
                this.props.dispatch(routerRedux.push('/advisory/advisoryproduct/add'));
                console.log('添加服务产品')
              }}>添加服务产品</Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down"/>
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>


            <AdvisoryProductTable
              selectedRows={selectedRows}
              loading={advisoryproductLoading}
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
