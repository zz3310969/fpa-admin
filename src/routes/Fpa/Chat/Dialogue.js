import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { routerRedux, Link } from 'dva/router';
import { Layout,Form, Input, Tabs, Button, Table, Icon, Badge, Row, Col, Menu,Dropdown,Modal  } from 'antd';

import styles from "./Dialogue.less";
import {timeCompare } from '../../../utils/dateutil';

const confirm = Modal.confirm;

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
  componentDidUpdate(state){
    const msgLeb = state.websocket._currentChat.messages.length;
    let dialogueDom = document.getElementById("dialogueDom")
    if(dialogueDom){
      dialogueDom.scrollTop =  msgLeb*80;
    }
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
    if(audio){
      if(audio.paused){
          audio.currentTime = 0;              
          audio.play();// 这个就是播放  
      }else{
          audio.pause();// 这个就是暂停
      }
    }
  }
  showConfirm(){
    confirm({
      title: '接客吗？',
      content: '你要接客吗？',
      cancelText:'取消',
      okText:'接客',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => {
            console.log(121212)
        });
      },
      onCancel() {

      },
    });

  }
  close(){
    confirm({
      title: '确定结束吗？',
      content: '确定结束吗？',
      cancelText:'取消',
      okText:'结束',
      onOk() {

      },
      onCancel() {

      },
    });

  }
  
  lookReport(testResultId){
    const w=window.open('about:blank');
    w.location.href='/test/result/profile/'+testResultId;
    <Link to={'/cardslot/edit/'+record.id+'?read=true'}>查看</Link>
  }
  render() {
    const { websocket: { _currentChat,user} } = this.props;

    let  chatDialogue = (
      <div>
        <header className="group-name" style={{textAlign:'center',paddingTop:10}}>
          <h3>{_currentChat.otherUser.nickName}</h3>
        </header>
        <div className={styles.message}>
          <div>
              <ul style={{height: 383,overflowY: "scroll"}} id="dialogueDom">
                  <li className={styles.first} ><span onClick={(e)=>this.getHistory(_currentChat.otherUser)} className={styles.history}>查看更多历史消息</span></li>
                  {
                  _currentChat.messages.map((item,i)=>{
                    const audioId = "myaudio"+i;
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
                              <img className={styles.avatar} width="35" height="35"src={item.self ? user.avatar:_currentChat.otherUser.head_image_url}/>
                              {
                                item.type=='AUD'?
                                (
                                  <div className={styles['audio-msg']} style={{width:(item.payload.length*20 +5)+"px",maxWidth:'400px'}} onClick={()=>this.playAudio(audioId)}>
                                    <Icon type="audio1" className={styles.audio1} /><audio  controls="controls" hidden id={audioId} src={item.payload.url}></audio>
                                </div>
                                )
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
      <div className="message-w" style={{position:'relative'}}>
          {
            _currentChat.otherUser.key?chatDialogue:emptyDialogue
          }
          {
            _currentChat.otherUser.key?
            (
              <div style={{position:'absolute',right:1,bottom:-35,display:'inline-block'}}>
                <Button>
                   <Link  target="_blank" to={'/test/result/profile/'+_currentChat.otherUser.testResult.id+'?sp=1'}>查看测试报告</Link>
                </Button>
                <Button onClick={() =>this.close()}>
                  结束
                </Button>
              </div>
            ):''
          }
          
      </div>
    );
  }
}

























