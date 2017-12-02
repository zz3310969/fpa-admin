import React, { PureComponent } from 'react';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider,Modal,Tooltip } from 'antd';
import styles from '../defaultTable.less';
const confirm = Modal.confirm;

const statusMap = ['error','success'];

@connect(state => ({
  character: state.character,
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

  onRowMouseEnter = (record, index, event)=>{

  }

  deleteHandle(record) {
    const { dispatch,reLoadList } = this.props;
    return function() {
          confirm({
            title: '提示',
            content: '确认删除吗？',
            onOk() {
              dispatch({
                type: 'character/remove',
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
          title: '主题名称',
          dataIndex: 'name',
          key: 'name',
      },
      {
          title: '主题',
          dataIndex: 'themeName',
          key: 'themeName',
      },
      {
          title: '适用性别',
          dataIndex: 'genderEnum',
          key: 'genderEnum',
          render(val) {
            return val !== undefined ?val.display:'';
          },
      },
      {
          title: '所属性格',
          dataIndex: 'characterColorName',
          key: 'characterColorName',
      },
      {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
          render(val) {
            return <Badge status={statusMap[val]} text={status[val]} />;
          },
      },
      {
          title: '描述',
          dataIndex: 'description',
          key: 'description',
          render(val) {
            var str = '';
            if(val !== undefined && val.length > 10){
              str = val.substring(0,10)+'...';
            }else {
              str = val;
            }
            return <Tooltip title={val}><span>{str}</span></Tooltip>;
          },
      },
       {
        title: '操作',
        render: (text, record, index) => (
          <div>
              <Link to={'/character/charactertheme/edit/'+record.id+'?read=true'}>查看</Link>
              <Divider type="vertical" />
              <Link to={'/character/charactertheme/edit/'+record.id}>编辑</Link>
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
          onRowMouseEnter={this.onRowMouseEnter}
        />
      </div>
    );
  }
}

export default StandardTable;
