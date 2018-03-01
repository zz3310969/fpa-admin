import React, { PureComponent } from 'react';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider,Modal ,Avatar,Tooltip} from 'antd';
import styles from '../defaultTable.less';
const confirm = Modal.confirm;

const statusMap = ['error','success'];

@connect(state => ({
  consultant: state.consultant,
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
                type: 'consultant/remove',
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
          dataIndex: 'name',
          key: 'name',
      },
      {
          title: '头像',
          dataIndex: 'headImageUrl',
          key: 'headImageUrl',
          render(text, record, index) {
            return (
              <Avatar shape="square" size="large" icon="user" src={record.headImageUrl} />
            );
          }
      },
      {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
      },
      {
          title: '手机号码',
          dataIndex: 'mobile',
          key: 'mobile',
      },
      {
          title: '等级',
          dataIndex: 'levelName',
          key: 'levelName',
      },
      {
          title: '服务主题',
          dataIndex: 'themeName',
          key: 'themeName',
      },
      {
          title: '所在地区',
          dataIndex: 'areaId',
          key: 'areaId',
      },
      {
          title: '性别',
          dataIndex: 'genderEnum',
          key: 'genderEnum',
          render(val) {
            return val !== undefined ?val.display:'';
          },
      },
      {
          title: '简介',
          dataIndex: 'introduction',
          key: 'introduction',
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
              <Link to={'/advisory/consultant/edit/'+record.id+'?read=true'}>查看</Link>
              <Divider type="vertical" />
              <Link to={'/advisory/consultant/edit/'+record.id}>编辑</Link>
              <Divider type="vertical" />
              <a onClick={this.deleteHandle(record, index)}>删除</a>
              <Divider type="vertical" />
              <Link to={'/advisory/commissionpricing/add/'+record.id}>佣金定价</Link>
              <Divider type="vertical" />
              <Link to={'/advisory/advisorypricing/add/'+record.id}>咨询定价</Link>
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
