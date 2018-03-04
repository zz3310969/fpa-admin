import React, { PureComponent } from 'react';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider,Modal } from 'antd';
import styles from '../defaultTable.less';
const confirm = Modal.confirm;

const statusMap = ['error','success'];

@connect(state => ({
  advisoryproduct: state.advisoryproduct,
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
                type: 'advisoryproduct/remove',
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
    const status = ['不可用', '可用'];


    const columns = [
      {
          title: '产品名称',
          dataIndex: 'name',
          key: 'name',
      },
      {
          title: '产品编号',
          dataIndex: 'code',
          key: 'code',
      },
      {
          title: '所属应用',
          dataIndex: 'appId',
          key: 'appId',
      },
      {
          title: '所属咨询师',
          dataIndex: 'consId',
          key: 'consId',
      },
      {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
      },
      {
          title: '服务模式',
          dataIndex: 'modesId',
          key: 'modesId',
      },
      {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
      },
      {
          title: '咨询定价id',
          dataIndex: 'advisId',
          key: 'advisId',
      },
      {
          title: '开始时间',
          dataIndex: 'validityStartTime',
          key: 'validityStartTime',
      },
      {
          title: '结束时间',
          dataIndex: 'validityEndTime',
          key: 'validityEndTime',
      },
       {
        title: '操作',
        render: (text, record, index) => (
          <div>
              <Link to={'/advisoryproduct/edit/'+record.id+'?read=true'}>查看</Link>
              <Divider type="vertical" />
              <Link to={'/advisoryproduct/edit/'+record.id}>编辑</Link>
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
