import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Layout,Form, Input, Tabs, Button, List, Icon, Badge, Row, Col, Menu,Dropdown ,Avatar } from 'antd';
import classnames from "classnames";

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
  nickName: 'Max',
  count:0,
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
  nickName: '马马虎虎',
  count:0,
  username:'om2wi0Uf3t9ZmP1VaB3QiP5pZ_tA',
  head_image_url:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJxqj4LF6Mk8ia1QicOibAQcyS2SWMukdX5jtQehcCXVibxoAXt3SiaVUUxjMBE0ad3eTOaFaDqpI3Wzw/0',
  messages:[],
}, {
  key: '3',
  nickName: '唯独你是不可替代',
  count:0,
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
    curChatUserKey:'-1'
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const {websocket:{ userState,} } = this.props;


    this.interval = setInterval(() => {
        dispatch({
          type: 'websocket/querySession',
          payload:{},
        });
    },10000);
    
    
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
    
    this.setState({curChatUserKey:user.key})

  }

  render() {
    const { websocket: { sessionUser,allChat} } = this.props;

    return (
        <List
          className={styles.chatList}
          itemLayout="horizontal"
          dataSource={[...sessionUser.values()]}
          renderItem={item => (
            <List.Item
              className={classnames(this.state.curChatUserKey==item.key?styles.cur_chat:"",styles.chatItem)}
              onClick={(event)=>this.chatItemClick(event,item)}
            >
              <List.Item.Meta
                avatar={<Badge count={(allChat.get(item.username) && allChat.get(item.username).count!=0)?allChat.get(item.username).count:''} style={{ backgroundColor: '#52c41a' }}>
                  <Avatar src={item.head_image_url} /></Badge>}
                title={<span>{item.nickName}</span>}
              />
            </List.Item>
          )}
        />

    );
  }
}

