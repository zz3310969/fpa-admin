import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import classnames from "classnames";
import { Layout,Form, Input, Tabs, Button, Table, Icon, Badge, Row, Col, Menu,Dropdown  } from 'antd';
import dia from '../../../utils/dia'
import styles from "./Send.less";

@connect(state => ({
  websocket: state.websocket,
}))
export default class Send extends Component {
  constructor(props){
    super(props);
    this.time = null;
    this.flag = false;
      this.state = {
        content:"",
        tips:false,
      };
  }
  componentDidMount(){
     dia(this);

  }
  isTisp(){
        clearTimeout(this.time);
        this.open("tips");
        this.tips=true;
        this.time = setTimeout(()=>{
            this.close("tips");
        },2400);
  }
  Set(e){
    let {name,value}= e.target;
    if(e.ctrlKey && e.keyCode === 13){
      value=value+"\n";
    };
    this.setState({
      [`${name}`]:value
    });

  }
  filter(str){
    return str(/[|`|~|#|$|^|{|}|\\|[\\]|<|>|~#|——|{|}|【|】]/)
  }
  validate(e){
    let {content} = this.state;
    if(( content.trim().length <= 0) ){
            this.setState({content:content.trim()});
            e.target.value=content.trim();
            this.isTisp();
            return false;
        };
        return true;

  }
  save(){
    //let {ACTIONS,_user,_currentId} = this.props;
    const { dispatch } = this.props;
    let {content} = this.state;
    if(this.flag){
      return false;
    };
    this.flag = true;
    /*ACTIONS.send_message({
      user:_user,id:_currentId,content:content,
      success:(req)=>{
        this.flag = false;
      },
      error:()=>{
        this.flag = false;
      }
    });*/
    let payload = {
      "clientType":"h5",
      "createTime":new Date().getTime(),
      'seq':new Date().getTime(),
      "payload":content,
      "receiver":"cde",
      "requestType":"message",
      "token":"zlt",
      "type":"TXT"
    };


    dispatch({
      type: 'websocket/send',
      payload:payload,
      callback: () => {
            this.flag = false;
          },
    });
    this.setState({
      content:""
    },()=>{
      this.refs.textarea.value ="";
    });
  }
  enter(e){
    let {ACTIONS,_user,_currentId} = this.props;
    let {name,value}= e.target; 
    let {content} = this.state;
    if(e.keyCode === 13 && !this.validate(e)){
      return false;
    }else if(e.ctrlKey && e.keyCode === 13){
      value=value+"\n";
      e.target.value= value;
      this.setState({
        [`${name}`]:value
      });
      return false;
    };
    if( ( content.trim().length && e.keyCode === 13 )){
      this.save();
    console.log("发送内容")
            return false;
        };
        this.setState({
      [`${name}`]:value
    });
  }
  sends(e){
    if(!this.validate(e)){
      return false;
    }else{
      this.save();
    };
  }
  destroy(){
    let {ACTIONS,_user,_currentId} = this.props;
    if(_currentId == 1){
      return;
    };
    ACTIONS.set_destroy({
      user:_user,id:_currentId
    });
  }
  render(){
    let {tips,content}=this.state;
    const {websocket:{userState} } = this.props;
    let sendBtnDisplay = userState != 'offline' ?"inline":'none';//签入后更改状态
    return ( 
      <div className={styles.send}>
          <div className={styles.toolbars}>
            <Icon type="emoji" className={styles['tool-icon']} />
            <Icon type="audio" className={styles['tool-icon']} />
            <Icon type="image" className={styles['tool-icon']} />
          </div>
            {
              userState != 'offline'?(<textarea placeholder="按 Enter 发送, Ctrl + Enter 可换行" ref="textarea" name="content" onKeyUp={(e)=>this.enter(e)}></textarea> )
                :(<textarea placeholder="你还没有上线，不能发送消息" disabled ref="textarea" name="content" onKeyUp={(e)=>this.enter(e)}></textarea>)
            }
          <p className={classnames(styles.hadler,styles.clearfix)}>
              {/*<button className={classnames(styles.fl,styles.hide)} onClick={()=>this.destroy()}>送客</button>*/}
              <button style={{float:"right",display:sendBtnDisplay}} onClick={(e)=>this.sends(e,"enter")}>发送</button>
              <span className={classnames(styles.tips,tips?styles.show:"")} >不能发送空白信息或特殊字符</span>
          </p>
      </div>
    );
  }
}



























