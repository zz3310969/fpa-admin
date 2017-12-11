import React, { PureComponent } from 'react';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider,Modal } from 'antd';
import styles from '../defaultTable.less';
const confirm = Modal.confirm;

const statusMap = ['error','success'];

@connect(state => ({
  user: state.user,
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
                type: 'user/remove',
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
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
      },
      {
          title: '密码',
          dataIndex: 'password',
          key: 'password',
      },
      {
          title: '是否未过期',
          dataIndex: 'accountnonexpired',
          key: 'accountnonexpired',
      },
      {
          title: '是否未锁定',
          dataIndex: 'accountnonlocked',
          key: 'accountnonlocked',
      },
      {
          title: '登录凭据是否未过期',
          dataIndex: 'credentialsnonexpired',
          key: 'credentialsnonexpired',
      },
      {
          title: '是否可用',
          dataIndex: 'enabled',
          key: 'enabled',
      },
      {
          title: '类型',
          dataIndex: 'dtype',
          key: 'dtype',
      },
      {
          title: '用户名称',
          dataIndex: 'name',
          key: 'name',
      },
      {
          title: '创建时间',
          dataIndex: 'create_date',
          key: 'create_date',
      },
      {
          title: '更新时间',
          dataIndex: 'update_time',
          key: 'update_time',
      },
      {
          title: '登录次数',
          dataIndex: 'login_count',
          key: 'login_count',
      },
      {
          title: '所属机构',
          dataIndex: 'org_id',
          key: 'org_id',
      },
       {
        title: '操作',
        render: (text, record, index) => (
          <div>
              <Link to={'/user/edit/'+record.id+'?read=true'}>查看</Link>
              <Divider type="vertical" />
              <Link to={'/user/edit/'+record.id}>编辑</Link>
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
