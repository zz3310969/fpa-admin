import React, { PureComponent } from 'react';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider,Modal } from 'antd';
import styles from '../defaultTable.less';
const confirm = Modal.confirm;

const statusMap = ['submitted','payed','completed','canceled'];

@connect(state => ({
  advisoryorder: state.advisoryorder,
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
                type: 'advisoryorder/remove',
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
    const {advisoryorder: {orderStatus}} = this.props;

    const status = ['提交订单', '已付款','已完成','已取消'];


    const columns = [
      {
          title: '订单编号',
          dataIndex: 'orderNum',
          key: 'orderNum',
      },
      {
          title: '客户名称',
          dataIndex: 'customName',
          key: 'customName',
      },
      {
          title: '服务产品',
          dataIndex: 'productName',
          key: 'productName',
      },
      {
          title: '客户电话',
          dataIndex: 'tel',
          key: 'tel',
      },
      {
          title: '服务时长（分钟）',
          dataIndex: 'lenTime',
          key: 'lenTime',
      },
      {
          title: '订单金额',
          dataIndex: 'orderAmount',
          key: 'orderAmount',
      },
      {
          title: '支付金额',
          dataIndex: 'payAmount',
          key: 'payAmount',
      },
      {
          title: '下单时间',
          dataIndex: 'orderTime',
          key: 'orderTime',
      },
      {
          title: '订单状态',
          dataIndex: 'orderStatus',
          key: 'orderStatus',
          render(val) {
            // return val;
            var valStr = "";
            console.log(orderStatus);
            orderStatus.map(function (data) {
                if(data.code == val){
                  valStr = data.display;
                  return false;
              }
            })
            return valStr;
            // return <Badge status={statusMap[val]} text={status[val]}/>;
          }
      },
       {
        title: '操作',
        render: (text, record, index) => (
          <div>
              <Link to={'/advisory/advisoryorder/edit/'+record.id+'?read=true'}>查看</Link>
              <Divider type="vertical" />
              <Link to={'/advisory/advisoryorder/edit/'+record.id}>编辑</Link>
              <Divider type="vertical" />
              <a onClick={this.deleteHandle(record, index)}>删除</a>
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
