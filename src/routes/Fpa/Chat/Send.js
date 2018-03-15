import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import classnames from "classnames";
import { Layout, Form, Input, Tabs, Button, Table, Icon, Badge, Row, Col, Menu, Dropdown, Upload } from 'antd';
import dia from '../../../utils/dia'
import styles from "./Send.less";
import AudioRecorder from 'react-audio-recorder';
import ImageUtil from "../../../utils/ImageUtil";

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

const onRecordChage = (data) => {
    console.log("onRecordChage")
    console.log(myRecord)
    console.log(data)
}

const myRecord = (
<AudioRecorder
recordLabel={<Icon type="record" className={styles['tool-icon']} style={{
    margin: "0"
}} />}
recordingLabel={<Icon type="recording" className={classnames(styles['tool-icon'], styles.recording)} style={{
    margin: "0",
    color: "#1296db"
}} >...</Icon>}
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
        constructor(props) {
            super(props);
            this.time = null;
            this.flag = false;
            this.state = {
                content: "",
                tips: false,
            };

        }
        componentDidMount() {
            dia(this);
        }
        isTisp() {
            clearTimeout(this.time);
            this.open("tips");
            this.tips = true;
            this.time = setTimeout(() => {
                this.close("tips");
            }, 2400);
        }
        Set(e) {
            let {name, value} = e.target;
            if (e.ctrlKey && e.keyCode === 13) {
                value = value + "\n";
            }
            this.setState({
                [`${name}`]: value
            });
        }
        filter(str) {
            return str(/[|`|~|#|$|^|{|}|\\|[\\]|<|>|~#|——|{|}|【|】]/)
        }
        validate(e) {
            let {content} = this.state;
            if( (content.trim().length <= 0) ) {
                this.setState({
                    content: content.trim()
                });
                e.target.value = content.trim();
                this.isTisp();
                return false;
            }
            return true;
        }
        save() {
            const {dispatch} = this.props;
            const {websocket: {userState, _currentChat,token}} = this.props;
            let {content} = this.state;
            if (this.flag) {
                return false;
            }
            this.flag = true;
            let payload = {
                "clientType": "h5",
                "createTime": new Date().getTime(),
                'seq': new Date().getTime(),
                "payload": content,
                "receiver": _currentChat.otherUser.username,
                "requestType": "message",
                "token": token,
                "type": "TXT"
            };
            dispatch({
                type: 'websocket/send',
                payload: payload,
                callback: () => {
                    this.flag = false;
                },
            });
            this.setState({
                content: ""
            }, () => {
                this.refs.textarea.value = "";
            });
        }
        enter(e) {
            let {ACTIONS, _user, _currentId} = this.props;
            let {name, value} = e.target;
            let {content} = this.state;
            if (e.keyCode === 13 && !this.validate(e)) {
                return false;
            } else if (e.ctrlKey && e.keyCode === 13) {
                value = value + "\n";
                e.target.value = value;
                this.setState({
                    [`${name}`]: value
                });
                return false;
            }
            if( (content.trim().length && e.keyCode === 13) ) {
                this.save();
                console.log("发送内容")
                return false;
            }
            ;
            this.setState({
                [`${name}`]: value
            });
        }
        sends(e) {
            if (!this.validate(e)) {
                return false;
            } else {
                this.save();
            }
        }
        destroy() {
           
        }
        imageRequest = (file) => {
            const self  = this;
            const {dispatch} = this.props;

            //图片发送
            // this.readImage(file.file)
            if (file.file.size > 800 * 1000) { //500K以上则去压缩
                ImageUtil.readImage(file.file, function(newImageSrcData) {
                    //console.log(newImageSrcData);
                    //self.setState({testImg:newImageSrcData})
                    let blob = dataURLtoBlob(newImageSrcData);
                    dispatch({
                      type: 'cos/upload',
                      payload: blob,
                      dispatch:dispatch
                  });
                });
            } else {
                //TODO 不压缩上传
                console.log("未压缩")
                /*const reader = new FileReader()
                reader.onload = function(e) {
                    //self.setState({testImg:e.target.result})
                    dispatch({
                        type: 'cos/upload',
                        payload: e.target.result
                        
                    });
                }
                reader.readAsDataURL(file.file)*/
                dispatch({
                    type: 'cos/upload',
                    payload: file.file,
                    dispatch:dispatch
                });
            }

        }

        // handleImgChange(event) {
        //     this.readImage(event.target.files[0])
        // }
        onRecordEnded(data) {
            console.log("end");
            console.log(data)
        }
        onRecordAbort(data) {
            console.log("abort")
            console.log(data)
        }
        onRecordStart(data) {
            console.log("onRecordStart")
            console.log(data)
        }
        onRecordChage(data) {
            console.log("onRecordChage")
            console.log(data)
        }
        render() {
            let {tips, content} = this.state;
            const {websocket: {userState, _currentChat}} = this.props;
            let sendBtnDisplay = userState != 'offline' ? "inline" : 'none'; //签入后更改状态
            return (
                <div>
      {
                _currentChat.otherUser.key ?
                    (<div className={styles.send}>
              <div className={styles.toolbars}>
                { /*
                  
                <Icon type="emoji" className={styles['tool-icon']} />
                 <div  style={{display:"inline-block",width:"auto"}}>
                  {myRecord}
                 </div>
                */ }
                <Upload listType='picture'
                    customRequest={this.imageRequest}
                    showUploadList={false}
                    multiple={true}
                    >
                  <Icon type="image" className={styles['tool-icon']} />
                </Upload>
              </div>
                {
                    userState != 'offline' ? (<textarea placeholder="按 Enter 发送, Ctrl + Enter 可换行" ref="textarea" name="content" onKeyUp={(e) => this.enter(e)}></textarea> )
                        : (<textarea placeholder="你还没有上线，不能发送消息" disabled ref="textarea" name="content" onKeyUp={(e) => this.enter(e)}></textarea>)
                    }
              <p className={classnames(styles.hadler, styles.clearfix)}>
                  { /*<button className={classnames(styles.fl,styles.hide)} onClick={()=>this.destroy()}>送客</button>*/ }
                  <button style={{
                        float: "right",
                        display: sendBtnDisplay
                    }} onClick={(e) => this.sends(e, "enter")}>发送</button>
                  <span className={classnames(styles.tips, tips ? styles.show : "")} >不能发送空白信息或特殊字符</span>
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



























