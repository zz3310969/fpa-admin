import React, { PureComponent } from 'react';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider,Modal } from 'antd';
import styles from '../defaultTable.less';
const confirm = Modal.confirm;

const statusMap = ['error','success'];

@connect(state => ({
  commissionpricing: state.commissionpricing,
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
                type: 'commissionpricing/remove',
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
          title: '所属系统',
          dataIndex: 'appName',
          key: 'appName',
      },
      {
          title: '咨询师姓名',
          dataIndex: 'consultantId',
          key: 'consultantId',
      },
      {
          title: '咨询模式',
          dataIndex: 'moldeId',
          key: 'moldeId',
      },
      {
          title: '定价类型',
          dataIndex: 'fixType',
          key: 'fixType',
      },
      {
          title: '单位',
          dataIndex: 'unit',
          key: 'unit',
      },
      {
          title: '原单价',
          dataIndex: 'originalPrice',
          key: 'originalPrice',
      },
      {
          title: '现单价',
          dataIndex: 'currentPrice',
          key: 'currentPrice',
      },
      {
          title: '简介',
          dataIndex: 'introduction',
          key: 'introduction',
      },
      {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          render(val) {
            return <Badge status={statusMap[val]} text={status[val]} />;
          }
      },
       {
        title: '操作',
        render: (text, record, index) => (
          <div>
              <Link to={'/advisory/commissionpricing/edit/'+record.id+'?read=true'}>查看</Link>
              <Divider type="vertical" />
              <Link to={'/advisory/commissionpricing/edit/'+record.id}>编辑</Link>
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
