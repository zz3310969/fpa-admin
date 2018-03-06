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
  name: 'Max',
  count:39,
  username:'om2wi0SSeiULnLSiMPHBCwTtVZL0',
  head_image_url:'https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIAylcYibrV4WyCDSnGawKnrNofRiaZUkdX0lICCDZYdthrvOIITERG1WT5Fk3IFmVPu8RQ48qNROsw/0',
  messages:[{
            createTime:'2018-03-01',
            payload:'你好',
            self:0,
            img:'',
            type:'TXT'
          }],
}, {
  key: '2',
  name: '马马虎虎',
  count:0,
  username:'om2wi0Uf3t9ZmP1VaB3QiP5pZ_tA',
  head_image_url:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJxqj4LF6Mk8ia1QicOibAQcyS2SWMukdX5jtQehcCXVibxoAXt3SiaVUUxjMBE0ad3eTOaFaDqpI3Wzw/0',
  messages:[],
}, {
  key: '3',
  name: '唯独你是不可替代',
  count:49,
  username:'om2wi0V58LqtkmsRHf_oa3bbX8fc',
  head_image_url:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLDiaUut0JTArDs2LFNkPwLWssvsJ3YCl4zuKnoAwxAAjhCEgrnVXgtZiaYD1KiccQ7zXVfv3xgeqRFA/0',
  messages:[],
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

  chatItemClick(event,user){
    //pull 消息
    //切换聊天对象
    const { dispatch } = this.props;
    dispatch({
      type: 'websocket/changeUser',
      payload:user,
    });

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
            >
              <List.Item.Meta
                avatar={<Badge count={item.count!=0?item.count:''} style={{ backgroundColor: '#52c41a' }}>
                  <Avatar src={item.head_image_url} /></Badge>}
                title={<span>{item.name}</span>}
              />
            </List.Item>
          )}
        />

    );
  }
}

