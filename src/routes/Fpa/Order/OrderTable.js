import React, { PureComponent } from 'react';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider,Modal } from 'antd';
import styles from '../defaultTable.less';
const confirm = Modal.confirm;

const statusMap = ['default', 'processing', 'success', 'error'];

@connect(state => ({
  order: state.order,
}))
class StandardTable extends PureComponent {
  state = {
    selectedRowKeys: [],
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {


    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  deleteHandle(record) {
    const { dispatch,reLoadList } = this.props;
    return function() {
          confirm({
            title: '提示',
            content: '确认删除吗？',
            onOk() {
              dispatch({
                type: 'order/remove',
                payload: {
                  id: record.id,
                },
                callback: () => {
                  reLoadList();
                },
            });
          },
          onCancel() {}
      });
    };
  };

  render() {
    const { selectedRowKeys } = this.state;
    const { data: { dataList, total }, loading } = this.props;
    const status = ['未支付', '已支付', '已完成', '已取消'];


    const columns = [
      {
        title: '订单编号',
        dataIndex: 'numb',
        key: 'numb',
      },
      {
          title: '客户',
          dataIndex: 'customerName',
          key: 'customerName',
      },
      {
          title: '咨询师',
          dataIndex: 'counselorName',
          key: 'counselorName',
      },
      {
          title: '服务记录ID',
          dataIndex: 'serviceRecordId',
          key: 'serviceRecordId',
      },
      {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
      },
      {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
      },
      {
          title: '支付时间',
          dataIndex: 'payTime',
          key: 'payTime',
      },
      {
          title: '订单状态',
          dataIndex: 'state',
          key: 'state',
          render(val) {
            return <Badge status={statusMap[val]} text={status[val]} />;
          },
      },
       {
        title: '操作',
        render: (text, record, index) => (
          <div>
              <Link to={'/customer/order/profile/'+record.id}>查看订单轨迹</Link>
              {/*<Divider type="vertical" />
              <Link to={'/order/edit/'+record.id}>编辑</Link>
              <Divider type="vertical" />
              <a onClick={this.deleteHandle(record, index)}>删除</a>*/}
          </div>
        ),
      },];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      total:total,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          dataSource={dataList}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
