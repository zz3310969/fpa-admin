import React, { PureComponent } from 'react';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider,Modal } from 'antd';
import styles from '../defaultTable.less';
const confirm = Modal.confirm;

const statusMap = ['success','error'];

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
    const status = ['是', '否'];


    const columns = [
      {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
      },
      {
          title: '是否未过期',
          dataIndex: 'accountNonExpired',
          key: 'accountNonExpired',
          render(val) {
            return <Badge status={statusMap[val?0:1]} text={status[val?0:1]} />;
          }
      },
      {
          title: '是否未锁定',
          dataIndex: 'accountNonLocked',
          key: 'accountNonLocked',
          render(val) {
            return <Badge status={statusMap[val?0:1]} text={status[val?0:1]} />;
          }
      },
      {
          title: '登录凭据是否未过期',
          dataIndex: 'credentialsNonExpired',
          key: 'credentialsNonExpired',
          render(val) {
            return <Badge status={statusMap[val?0:1]} text={status[val?0:1]} />;
          }
      },
      {
          title: '是否可用',
          dataIndex: 'enabled',
          key: 'enabled',
          render(val) {
            return <Badge status={statusMap[val?0:1]} text={status[val?0:1]} />;
          }
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
          title: '所属机构',
          dataIndex: 'org.name',
          key: 'org.name',
      },
       {
        title: '操作',
        render: (text, record, index) => (
          <div>
              <Link to={'/list/user-list/edit/'+record.id+'?read=true'}>查看</Link>
              <Divider type="vertical" />
              <Link to={'/list/user-list/edit/'+record.id}>编辑</Link>
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
