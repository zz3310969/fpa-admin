import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import classnames from "classnames";
import { Layout,Form, Input, Tabs, Button, Table, Icon, Badge, Row, Col, Menu,Dropdown,Upload  } from 'antd';
import dia from '../../../utils/dia'
import styles from "./Send.less";
import AudioRecorder from 'react-audio-recorder';


const onRecordChage = (data) =>{
    console.log("onRecordChage")
    console.log(myRecord)
    console.log(data)
}

const myRecord = (
  <AudioRecorder
    recordLabel={<Icon type="record" className={styles['tool-icon']} style={{margin:"0"}} />}
    recordingLabel={<Icon type="recording" className={classnames(styles['tool-icon'],styles.recording)} style={{margin:"0",color:"#1296db" }} >...</Icon>}
    onChange={onRecordChage}
    downloadable={true}
    playLabel="播放"
    playingLabel="正在播放"
    removeLabel="重录"
    downloadLabel="下载"
  >
  </AudioRecorder>
)

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
    this.readImage = this.readImage.bind(this)

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
    const {websocket:{ userState, _currentChat} } = this.props;

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
      "receiver":_currentChat.otherUser.username,
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
  imageRequest = (file)=>{
    //图片发送
    console.log(file);
    this.readImage(file.file)

  }
  drawCanvasImage = (image) =>{
      const _self = this;
      // 绘制图片
      let width = image.width
      let height = image.height
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio = width * height / 1000000
      if (ratio > 1) {
          ratio = Math.sqrt(ratio)
          width /= ratio
          height /= ratio
      } else {
          ratio = 1
      }

      function onloadCanvas() {
          // 用于压缩图片的canvas
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          // 瓦片canvas
          const tCanvas = document.createElement('canvas')
          const tctx = tCanvas.getContext('2d')
          // canvas 清屏
          ctx.fillStyle = '#fff'
          ctx.clearRect(0, 0, canvas.width, canvas.height)
              // 重置canvas宽高
          canvas.width = width
          canvas.height = height
          // 绘制
          // 如果图片像素大于100万则使用瓦片绘制
          let count = width * height / 1000000
          if (count > 1) {
              // 计算要分成多少块瓦片
              count = ~~(Math.sqrt(count) + 1)
              // 计算每块瓦片的宽和高
              const nw = ~~(width / count)
              const nh = ~~(height / count)

              tCanvas.width = nw
              tCanvas.height = nh

              for (let i = 0; i < count; i++) {
                  for (let j = 0; j < count; j++) {
                      tctx.drawImage(image, i * nw * ratio, j * nh * ratio,
                          nw * ratio, nh * ratio, 0, 0, nw, nh)

                      ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
                  }
              }
          } else {
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
          }
          const imgSrcData = canvas.toDataURL('image/jpg', 0.1)
          // tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0

          debugger
          //TODO 上传图片
          _self.setState({
            uploadSrc: imgSrcData
          })
      }
      onloadCanvas()
  }

  loadImage(src, onload) {
      const img = new Image()
      img.src = src
      img.onload = () => {
          onload(img)
      }
      img.onerror = () => {
          onload(false)
      }
  }

  readImage=(src) => {
    const that = this
    // 创建 FileReader 对象 并调用 render 函数来完成渲染
    // src.type
    const reader = new FileReader()
    reader.onload = function(e) {
      // that.drawImage(e.target.result)
      that.loadImage(e.target.result, that.drawCanvasImage)
    }
    // 读取文件内容
    reader.readAsDataURL(src)
  }

  handleImgChange(event) {
      this.readImage(event.target.files[0])
  }
  onRecordEnded(data){
    console.log("end");
    console.log(data)
  }
  onRecordAbort(data){
    console.log("abort")
    console.log(data )
  }
  onRecordStart(data){
    console.log("onRecordStart")
    console.log(data)
  }
  onRecordChage(data){
    console.log("onRecordChage")
    console.log(data)
  }
  render(){
    let {tips,content}=this.state;
    const {websocket:{userState,_currentChat} } = this.props;
    let sendBtnDisplay = userState != 'offline' ?"inline":'none';//签入后更改状态
    return ( 
      <div>
      {
        _currentChat.otherUser.key?
        (
          <div className={styles.send}>
              <div className={styles.toolbars}>
                {/*
                  
                <Icon type="emoji" className={styles['tool-icon']} />
                 <div  style={{display:"inline-block",width:"auto"}}>
                  {myRecord}
                 </div>
                */}
                <Upload listType='picture' 
                      customRequest={this.imageRequest}
                      showUploadList={false}
                      multiple={true}
                  >
                  <Icon type="image" className={styles['tool-icon']} />
                </Upload>
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
        )
        :
        <div className={styles.emptyDialogue}></div>
      }
      </div>
    );
  }
}



























