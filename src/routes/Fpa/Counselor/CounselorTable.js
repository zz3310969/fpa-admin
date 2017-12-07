import React, { PureComponent } from 'react';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider,Modal } from 'antd';
import styles from '../defaultTable.less';
const confirm = Modal.confirm;

const statusMap = ['error','success'];

@connect(state => ({
  counselor: state.counselor,
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
                type: 'counselor/remove',
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
          title: '咨询师编号',
          dataIndex: 'numb',
          key: 'numb',
      },
      {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
      },
      {
          title: '电话',
          dataIndex: 'mobile',
          key: 'mobile',
      },
      {
          title: '性别(0:女,1:男)',
          dataIndex: 'gender',
          key: 'gender',
      },
      {
          title: '特长',
          dataIndex: 'specialty',
          key: 'specialty',
      },
      {
          title: '微信号',
          dataIndex: 'wechat',
          key: 'wechat',
      },
      {
          title: '级别',
          dataIndex: 'rank',
          key: 'rank',
      },
      {
          title: '注册时间',
          dataIndex: 'regTime',
          key: 'regTime',
      },
      {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
      },
      {
          title: '是否可用,用于删除',
          dataIndex: 'usable',
          key: 'usable',
      },
       {
        title: '操作',
        render: (text, record, index) => (
          <div>
              <Link to={'/counselor/edit/'+record.id+'?read=true'}>查看</Link>
              <Divider type="vertical" />
              <Link to={'/counselor/edit/'+record.id}>编辑</Link>
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
