import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Layout,Form, Input, Tabs, Button, List, Icon, Badge, Row, Col, Menu,Dropdown ,Avatar } from 'antd';

import styles from "./Tool.less";

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
  name: '你好，请稍等'
}, {
  key: '2',
  name: '稍等，我马上回来'
}, {
  key: '3',
  name: '请对我评价'
}];

@connect(state => ({
  websocket: state.websocket,
}))
export default class ChatTool extends Component {
  state = {
    count: 0,
    type: 'account',
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.login.status === 'ok') {
    //   this.props.dispatch(routerRedux.push('/'));
    // }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  chatItemClick(event,item){
    console.log(event);
    const { dispatch } = this.props;
    const {websocket:{ userState, _currentChat} } = this.props;

    let payload = {
      "clientType":"h5",
      "createTime":new Date().getTime(),
      'seq':new Date().getTime(),
      "payload":item.name,
      "receiver":_currentChat.otherUser.username,
      "requestType":"message",
      "token":"zlt",
      "type":"TXT"
    };


    dispatch({
      type: 'websocket/send',
      payload:payload,
    });

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
              onClick={(event)=>this.chatItemClick(event,item)}
              className={styles.list}
            >
              <List.Item.Meta
                title={<span>{item.name}</span>}
              />
            </List.Item>
          )}
        />

    );
  }
}

