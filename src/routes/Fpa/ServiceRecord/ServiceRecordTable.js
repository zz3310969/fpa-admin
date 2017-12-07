import React, { PureComponent } from 'react';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider,Modal } from 'antd';
import styles from '../defaultTable.less';
const confirm = Modal.confirm;

const statusMap = ['error','success'];

@connect(state => ({
  servicerecord: state.servicerecord,
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
                type: 'servicerecord/remove',
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
          title: '咨询师ID',
          dataIndex: 'counselorId',
          key: 'counselorId',
      },
      {
          title: '客户ID',
          dataIndex: 'customerId',
          key: 'customerId',
      },
      {
          title: '咨询主题ID',
          dataIndex: 'themeId',
          key: 'themeId',
      },
      {
          title: '服务时长',
          dataIndex: 'duration',
          key: 'duration',
      },
      {
          title: '服务开始时间',
          dataIndex: 'startTime',
          key: 'startTime',
      },
      {
          title: '服务结束时间',
          dataIndex: 'endTime',
          key: 'endTime',
      },
      {
          title: '服务评价',
          dataIndex: 'evaluation',
          key: 'evaluation',
      },
      {
          title: '星级',
          dataIndex: 'evaluationRank',
          key: 'evaluationRank',
      },
      {
          title: '评价时间',
          dataIndex: 'evaluationTime',
          key: 'evaluationTime',
      },
       {
        title: '操作',
        render: (text, record, index) => (
          <div>
              <Link to={'/servicerecord/edit/'+record.id+'?read=true'}>查看</Link>
              <Divider type="vertical" />
              <Link to={'/servicerecord/edit/'+record.id}>编辑</Link>
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
