import React, { PureComponent } from 'react';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider,Modal } from 'antd';
import styles from '../defaultTable.less';
const confirm = Modal.confirm;

const statusMap = ['error','success'];

@connect(state => ({
  cardunit: state.cardunit,
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
              type: 'cardunit/remove',
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
          title: '颜色编码',
          dataIndex: 'colorCode',
          key: 'colorCode',
      },
      {
          title: '所属卡牌',
          dataIndex: 'cardId',
          key: 'cardId',
      },
      {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
      },
      {
          title: '颜色',
          dataIndex: 'colorId',
          key: 'colorId',
      },
      {
          title: '大图',
          dataIndex: 'imageBig',
          key: 'imageBig',
      },
      {
          title: '中图',
          dataIndex: 'imageMid',
          key: 'imageMid',
      },
      {
          title: '小图',
          dataIndex: 'imageSmall',
          key: 'imageSmall',
      },
      {
          title: '分值',
          dataIndex: 'score',
          key: 'score',
      },
      {
          title: '描述',
          dataIndex: 'description',
          key: 'description',
      },
      {
          title: '卡牌单元类型(正面,反面)',
          dataIndex: 'unitType',
          key: 'unitType',
      },
       {
        title: '操作',
        render: (text, record, index) => (
          <div>
              <Link to={'/cardunit/edit/'+record.id+'?read=true'}>查看</Link>
              <Divider type="vertical" />
              <Link to={'/cardunit/edit/'+record.id}>编辑</Link>
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
