import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { routerRedux, Link } from 'dva/router';
import { Layout,Form, Input, Tabs, Button, Table, Icon, Badge, Row, Col, Menu,Dropdown  } from 'antd';

import styles from "./Dialogue.less";



//我的头像
const _user = {
  head_image_url:'https://dummyimage.com/200x200/474fcb/FFF&text=Job'
}

@connect(state => ({
  websocket: state.websocket,
}))
export default class Dialogue extends Component {
  state = {
    count: 0,
    type: 'account',
    user_id:'zlt',
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.login.status === 'ok') {
    //   this.props.dispatch(routerRedux.push('/'));
    // }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  time(date,prevDate){
    // console.log(date,prevDate)
    let Interval  = 2*60*1000;//区间
    let _date = new Date(date);
    let _prevDate = new Date(prevDate);
    let ret =_date.getTime() - _prevDate.getTime();
    if(ret>=Interval){
      return _date.getFullYear()+"-"+(_date.getMonth()+1)+"-"+_date.getDate();
    };
    return "";
  }
  link (str){
    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/ig
    return str.replace(reg,'<a className="link" target="_bank" href="$1$2">$1$2</a>');
  };

  getHistory = (otherUser) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'websocket/pullMessage',
      payload: {'sender':otherUser.username,'token':this.state.user_id},
    });
  }



  render() {
    const { websocket: { _currentChat,} } = this.props;
    console.log(_currentChat)

    let  chatDialogue = (
      <div>
        <header className="group-name" style={{textAlign:'center',paddingTop:10}}>
          <h3>{_currentChat.otherUser.name}</h3>
        </header>
        <div className={styles.message} >
          <div>
              <ul style={{height: 416,overflowY: "scroll"}}>
                  <li className={styles.first} ><span onClick={(e)=>this.getHistory(_currentChat.otherUser)} className={styles.history}>查看更多历史消息</span></li>
                  {
                  _currentChat.messages.map((item,i)=>{
                    return (
                      <li key={i}>
                        {
                        i!=0&&this.time(item.createTime,_currentChat.messages[i-1].createTime)!=''?(
                          <p className={styles.time}>
                                <span>{this.time(item.createTime,_currentChat.messages[i-1].createTime)}</span>
                            </p>
                        ):(
                        null
                        )
                        }
                          
                          <div className={classnames(styles.main,item.self?styles.self:'')}>
                              <img className={styles.avatar} width="35" height="35"src={item.self ? _user.head_image_url:_currentChat.otherUser.head_image_url}/>
                              {
                                item.type=='AUDIO'?
                                <div className={styles['audio-msg']} style={{width:(item.length*5+30)+"px"}}><Icon type="audio1" className={styles.audio1} /></div>
                                :
                                <div className={styles.text} >{item.payload}</div>
                              }
                          </div>
                      </li>
                    );
                  })
                }
              </ul>
          </div>
        </div>
      </div>
    )

    const emptyDialogue = (
      <div className={styles.emptyDialogue} >
        <div className={styles.emptyChat}></div>
      </div>
    )

    return (
      <div className="message-w">
          {
            _currentChat.otherUser.key?chatDialogue:emptyDialogue
          }
      </div>
    );
  }
}

























