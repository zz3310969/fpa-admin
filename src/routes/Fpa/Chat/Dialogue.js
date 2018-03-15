import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { routerRedux, Link } from 'dva/router';
import { Layout,Form, Input, Tabs, Button, Table, Icon, Badge, Row, Col, Menu,Dropdown  } from 'antd';

import styles from "./Dialogue.less";
import {timeCompare } from '../../../utils/dateutil';



//我的头像
const _user = {
  head_image_url:'https://gw.alipayobjects.com/zos/rmsportal/dRFVcIqZOYPcSNrlJsqQ.png'
}

@connect(state => ({
  websocket: state.websocket,
}))
export default class Dialogue extends Component {
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
    const { dispatch,websocket:{token} } = this.props;
    dispatch({
      type: 'websocket/pullMessage',
      payload: {'sender':otherUser.username,'token':token},
    });
  }
  playAudio(audioId){
    let audio = document.getElementById(audioId);
    console.log(audio)
    debugger
    if(audio){
      if(audio.paused){
          audio.currentTime = 0;              
          audio.play();// 这个就是播放  
      }else{
          audio.pause();// 这个就是暂停
      }
    }
  }
  render() {
    const { websocket: { _currentChat,user} } = this.props;

    let  chatDialogue = (
      <div>
        <header className="group-name" style={{textAlign:'center',paddingTop:10}}>
          <h3>{_currentChat.otherUser.nickName}</h3>
        </header>
        <div className={styles.message} >
          <div>
              <ul style={{height: 416,overflowY: "scroll"}} id="dialogueDom">
                  <li className={styles.first} ><span onClick={(e)=>this.getHistory(_currentChat.otherUser)} className={styles.history}>查看更多历史消息</span></li>
                  {
                  _currentChat.messages.map((item,i)=>{
                    return (
                      <li key={i}>
                        {
                        i!=0&&timeCompare(item.createTime,_currentChat.messages[i-1].createTime)!=''?(
                          <p className={styles.time}>
                                <span>{timeCompare(item.createTime,_currentChat.messages[i-1].createTime)}</span>
                            </p>
                        ):(
                        null
                        )
                        }
                          
                          <div className={classnames(styles.main,item.self?styles.self:'')}>
                              <img className={styles.avatar} width="35" height="35"src={item.self ? _user.head_image_url:_currentChat.otherUser.head_image_url}/>
                              {
                                item.type=='AUD'?
                                <div className={styles['audio-msg']} style={{width:(item.payload.length*2 +5)+"px"}} onClick={()=>this.playAudio('myaudio')}><Icon type="audio1" className={styles.audio1} /><audio  controls="controls" hidden id="myaudio" src={item.payload.url}></audio></div>
                                :(
                                  item.type=="IMG"?
                                  <div className={styles['image-msg']} ><img src={item.payload}/></div>
                                  :
                                  <div className={styles.text} >{item.payload}</div>
                                )
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

























