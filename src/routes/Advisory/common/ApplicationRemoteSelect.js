import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Select, Spin } from 'antd';
import debounce from 'lodash.debounce';
import { stringify } from 'qs';
const Option = Select.Option;

export default class ApplicationRemoteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }
  state = {
    data: [],
    value: [],
    fetching: false,
  }
  fetchUser = (value) => {
    console.log('fetching app', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    let params = {'name':value,'access_token':sessionStorage.getItem('token')}
    fetch(`api/advisory/application?${stringify(params)}`)
      .then(response => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        const data = body.data.dataList.map(user => ({
          text: user.name,
          value: user.id,
        }));
        this.setState({ data, fetching: false });
      });
  }
  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }
  render() {
    const { fetching, data, value } = this.state;
    return (
      <Select
        mode="combobox"
        labelInValue
        value={value}
        placeholder="请输入系统名称进行模糊查询"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {data.map(d => <Option key={d.value}>{d.text}</Option>)}
      </Select>
    );
  }
}

