import React, { PureComponent } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';

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

  render() {
    const { selectedRowKeys } = this.state;
    const { data: { dataList, total }, loading } = this.props;


    const columns = [
            {
          title: '活动名称',
          dataIndex: 'name',
          key: 'name',
      },
      {
          title: '活动编号',
          dataIndex: 'code',
          key: 'code',
      },
      {
          title: '活动描述',
          dataIndex: 'remark',
          key: 'remark',
      },
      {
          title: '报名开始时间',
          dataIndex: 'applyStartTime',
          key: 'applyStartTime',
      },
      {
          title: '报名结束时间',
          dataIndex: 'applyEndTime',
          key: 'applyEndTime',
      },
      {
          title: '投票开始时间',
          dataIndex: 'voteStartTime',
          key: 'voteStartTime',
      },
      {
          title: '投票结束时间',
          dataIndex: 'voteEndTime',
          key: 'voteEndTime',
      },
      {
          title: '活动状态',
          dataIndex: 'status',
          key: 'status',
      },
      {
          title: '投票规则',
          dataIndex: 'voteRule',
          key: 'voteRule',
      },
      {
          title: '每人每天可投票数',
          dataIndex: 'voteLimit',
          key: 'voteLimit',
      },
      {
          title: '创建时间',
          dataIndex: 'createDate',
          key: 'createDate',
      },
      {
          title: '更新时间',
          dataIndex: 'updateDate',
          key: 'updateDate',
      },
       {
        title: '操作',
        render: () => (
          <div>
            <a href="">删除</a>
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
