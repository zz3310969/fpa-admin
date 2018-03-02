import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { routerRedux, Link } from 'dva/router';
import { Layout,Form, Input, Tabs, Button, Table, Icon, Badge, Row, Col, Menu,Dropdown  } from 'antd';

import styles from "./Dialogue.less";
console.log(styles)
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: (text,record) => {
    return (
      <div> 
        <Badge count={record.count} overflowCount={99} style={{ backgroundColor: '#87d068'}}>
          <a href="#" className={styles.badge} style={{backgroundColor:"#123456"}}/>
        </Badge>
        <a href="#" style={{marginLeft:5 }}>{text}</a>
      </div>
      
    );
  },
}];

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

const _currentChat = {
  messages:[{
    date:'2018-03-01',
    content:'你好',
    self:0,
    img:'',
    type:'TXT'
  },{
    date:'2018-03-01',
    content:'我也好',
    self:1,
    type:'TXT'
  },{
    date:'2018-03-02',
    content:'你在哪儿',
    self:0,
    type:'AUDIO',
    length:5
  },{
    date:'2018-03-01',
    content:'我在上海',
    self:1,
    type:'AUDIO',
    length:2
  },{
    date:'2018-03-05',
    content:'呼叫总部',
    self:0,
    type:'TXT'
  },{
    date:'2018-03-01',
    content:'我是莱德',
    self:1,
    type:'TXT'
  },],
  //聊天对象头像
  user:{
    img:'https://dummyimage.com/200x200/00662a/FFF&text=Kate'
  }

}

//我的头像
const _user = {
  img:'https://dummyimage.com/200x200/474fcb/FFF&text=Job'
}


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
    return str.replace(reg,'<a className="link" target="_bank" href="$1$2">$1$2</a>')
  }
  render() {
    return (
      <div className="message-w">
        <header className="group-name">
          <h3>测试用户</h3>
        </header>
          <div className={styles.message} >

            <div>
                <ul>
                    <li className={styles.first} ><span className={styles.history}>查看更多历史消息</span></li>
                    {
                    _currentChat.messages.map((item,i)=>{
                      return (
                        <li key={i}>
                          {
                          i!=0&&this.time(item.date,_currentChat.messages[i-1].date)!=''?(
                            <p className={styles.time}>
                                  <span>{this.time(item.date,_currentChat.messages[i-1].date)}</span>
                              </p>
                          ):(
                          null
                          )
                          }
                            
                            <div className={classnames(styles.main,item.self?styles.self:'')}>
                                <img className={styles.avatar} width="35" height="35"src={item.self ? _user.img:_currentChat.user.img}/>
                                {
                                  item.type=='AUDIO'?
                                  <div className={styles['audio-msg']} style={{width:(item.length*5+30)+"px"}}><Icon type="audio1" className={styles.audio1} /></div>
                                  :
                                  <div className={styles.text} >item.content</div>
                                }
                            </div>
                        </li>
                      );
                    })
                  }
                </ul>
            </div>
          </div>
          {/* 
          <div className="dialog">
              <p className="mask"></p>
              <div className="dia-cont">
                  <div className="clearfix">
                      <p className="avatar"><img src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg" alt=""/></p>
                      <p className="nickname fl">测试的</p>
                  </div>
                  <p className="remark">
                      <label htmlFor=""> 备注  </label>
                      <input className="input" maxLength="10"  placeholder="点击添加备注" type="text" />
                  </p>
              </div>
          </div>
        */}
      </div>
    );
  }
}

























