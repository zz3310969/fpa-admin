import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Layout,Form, Input, Tabs, Button, List, Icon, Badge, Row, Col, Menu,Dropdown ,Avatar } from 'antd';

import styles from "./ChatList.less";

// const columns = [{
//   title: 'Name',
//   dataIndex: 'name',
//   key: 'name',
//   render: (text,record) => {
//     return (
//       <div> 
//         <Badge count={record.count} overflowCount={99} style={{ backgroundColor: '#87d068'}}>
//           <a href="#" className={styles.badge} style={{backgroundColor:"#123456"}}/>
//         </Badge>
//         <a href="#" style={{marginLeft:5 }}>{text}</a>
//       </div>
      
//     );
//   },
// }];

const data = [{
  key: '1',
  name: 'John Brown',
  count:39
}, {
  key: '2',
  name: 'Jim Green',
  count:69
}, {
  key: '3',
  name: 'Joe Black',
  count:49
}];


@connect(state => ({
  websocket: state.websocket,
}))
export default class ChatList extends Component {
  state = {
    count: 0,
    type: 'account',
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.login.status === 'ok') {
    //   this.props.dispatch(routerRedux.push('/'));
    // }
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  chatItemClick(event){
    console.log(event)
    //pull 消息
  }

  render() {
    return (
        <List
          className={styles.chatList}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item
              style={{paddingLeft:20}}
              onClick={this.chatItemClick}
              
            >
              <List.Item.Meta
                avatar={<Badge count={item.count} style={{ backgroundColor: '#52c41a' }}><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Badge>}
                title={<span>{item.name}</span>}
              />
            </List.Item>
          )}
        />

    );
  }
}

