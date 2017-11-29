import { Table, Input, Popconfirm } from 'antd';

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

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
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
        // return (
        //   <div className="editable-row-operations">
        //     {
        //       editable ?
        //         <span>
        //           <a onClick={() => this.save(record.key)}>Save</a>
        //           <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
        //             <a>Cancel</a>
        //           </Popconfirm>
        //         </span>
        //         : <a onClick={() => this.edit(record.key)}>编辑</a>
        //     }
        //   </div>
        // );
      },
    }];
    this.state = { data };
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
  render() {
    return <Table dataSource={this.state.data} columns={this.columns}  size="small" />;
  }
}

export default EditableTable;