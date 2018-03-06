import React, { Component } from 'react';
import { Table, Input, Popconfirm,Modal,Button } from 'antd';

const data = [];
for (let i = 0; i < 3; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class ThemeTableModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data:data
    };
    this.columns = [{
      title: '主题名称',
      dataIndex: 'name',
      width: '40%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '状态',
      dataIndex: 'age',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'age'),
    }, {
      title: '描述',
      dataIndex: 'desc',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'age'),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div>
            <a onClick={() => this.edit(record.key)}>查看</a><span className="ant-divider" />
            <a onClick={() => this.edit(record.key)}>编辑</a><span className="ant-divider" />
            <a onClick={() => this.edit(record.key)}>删除</a>
          </div>
        )
      },
    }];
    this.cacheData = data.map(item => ({ ...item }));
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false
    });
  };

  addHandler = (e) =>{
    


  }

  render() {
    const { children} = this.props;
    
    const okHandler = () => {
      this.hideModelHandler();
    };

    return (
        <span>
          <span onClick={this.showModelHandler}>
            { children }
          </span>
          <Modal
            title="卡牌主题配置"
            visible={this.state.visible}
            onOk={okHandler}
            onCancel={this.hideModelHandler}
            width={800}
          > 
            <div style={{textAlign:'right'}}><Button type="primary" onClick={this.addHandler}>新增</Button></div>
            <Table dataSource={this.state.data} columns={this.columns} />
          </Modal>
      </span>
    ) 
  }
}


export default ThemeTableModal;