import * as service from '../services/websocket';
import {loadCustomerByopenid,loadCustomerByopenids}  from '../services/customer';
import pathToRegexp from 'path-to-regexp';
import {okAdvisoryOrder} from '../services/Advisory/advisoryorder';
import {getLocalStorageJson}  from '../utils/helper';
import { Modal } from 'antd';

function newUser() {
  return {
  messages:[],
  count:0,
};
}

export default {
    namespace: 'websocket',
    state: {
        token:sessionStorage.getItem('token'),
        user:getLocalStorageJson('user'),
        sessionUser:new Map(),
        sendMap:new Map(),
        userState:'offline',
        allChat:new Map(),
        _currentChat:{
          messages:[],
          //聊天对象头像
          otherUser:{
            testResult:{}
            // key:'1',
            //head_image_url:'https://dummyimage.com/200x200/00662a/FFF&text=Kate'
          }

        }
    },
    subscriptions: {
        watchWebSocket({dispatch, history}) {
            return history.listen(({pathname}) => {
                const match = pathToRegexp('/advisory/chat').exec(pathname);
                if(match){
                  dispatch({type: 'open'});
                }
            });
        },
        socketMessage({ dispatch,history }) {
          return history.listen(({pathname}) => {
                const match = pathToRegexp('/advisory/chat').exec(pathname);
                if(match){
                  service.listen((data) => {
                  dispatch({ type: 'message', payload: data,dispatch:dispatch });
                });
                }
            });
        },
        /*socketStatus({ dispatch }) {
          const status = service.getSocketStatus();
          console.log('status:'+status);
          if(status == 'opened'){
            return service.listen((data) => {
                dispatch({ type: 'message', payload: data });
              });
          }
        },*/
    },
    effects: {
        * open({payload,callback}, {put, call,select}) {
            //wss://echo.websocket.org
            let token = yield select(state => state.websocket.token );
            const config = {'token':token}

            yield call(service.watchList, config);

            if(callback) callback();
        },
        * close({payload,callback}, {put, call,select}) {
            //wss://echo.websocket.org

            let otherUser = yield select(state => state.websocket._currentChat.otherUser );
            
            let token = yield select(state => state.websocket.token );

            const config = {'token':token,'sessionId':otherUser.im.sessionId,'weixinOpenId':otherUser.username}

            yield call(service.closeSession, config);

            if(callback) callback();
        },
        * ok({payload, callback}, {put, call, select}) {
            yield call(okAdvisoryOrder, payload);

            if (callback) callback();
        },
        * message({payload, callback ,dispatch}, {put, call,select}) {
            console.log('message', payload);
            const data = JSON.parse(payload);
            if (data) {
                const result = data.result;
                switch (data.requestType) {
                    case 'ping':
                        // cb(data);
                        break;
                    case 'login':
                    case 'online':
                        console.log('上线');
                        yield put({
                            type: 'changeUserState',
                            payload: 'online',
                          });
                        yield call(service.querySession, {});
                        dispatch({ type: 'websocket/pullNotReceivedMessage',});
                        break;
                    case 'offline':
                        console.log('下线');
                        yield put({
                            type: 'changeUserState',
                            payload: 'offline',
                          });
                        break;
                    case 'hide':
                        console.log('隐身');
                        yield put({
                            type: 'changeUserState',
                            payload: 'hide',
                          });
                        break;
                    case 'querySession':
                        console.log('querySession');
                        let sessionUser = yield select(state => state.websocket.sessionUser );
                        let openids = [];
                        let sessionIds = new Map();
                        let _currentChat_ = yield select(state => state.websocket._currentChat );
                        for (var i = 0; result && i < result.length; i++) {
                          let remain = ((result[i].endTime - new Date().getTime()) / 60000).toFixed(0);
                          if(_currentChat_.otherUser.username == result[i].receiver){
                              _currentChat_.otherUser.remain = remain;
                            }
                          let receiver = sessionUser.get(result[i].receiver);

                          if (!receiver) {
                            openids.push(result[i].receiver);
                            sessionIds.set(result[i].receiver,result[i]);
                            /*const response = yield call(loadCustomerByopenid, {openid:result[i].receiver});
                            if(response.state == 'success'){
                              let u = Object.assign({},response.data);
                              u.username = u.weixinOpenId;
                              u.head_image_url = u.weixinHeadImage;
                              u.key = i+'';
                              sessionUser.set(result[i].receiver,u);
                            }*/
                          }else{
                            receiver.remain = remain;
                            sessionUser.set(result[i].receiver,receiver);
                          }
                          

                        }
                        if (openids.length > 0) {
                          const response_ = yield call(loadCustomerByopenids, {openids:openids.join()});
                          if(response_.state == 'success'){
                              let userArray = Object.assign([],response_.data);
                              
                              for (var u of userArray) {
                                u.username = u.weixinOpenId;
                                u.head_image_url = u.weixinHeadImage;
                                u.key = u.username;
                                u.im = sessionIds.get(u.username);
                                let remain = ((u.im.endTime - new Date().getTime()) / 60000).toFixed(0);
                                u.remain = remain;

                                sessionUser.set(u.username,u);
                              }
                            }
                        }


                        yield put({
                          type: 'save',
                          payload: sessionUser,
                        });
                        break;
                    case 'openSession':
                        break;
                    case 'closeSession':
                        break;
                    case 'message':

                        // cb(data);
                        if(result.source == 'system'){

                          result.payload = JSON.parse(result.payload);
                          const modal = Modal.confirm({
                            title: '提醒',
                            content: result.payload.viewWord,
                            okText: '接受',
                            cancelText: '拒绝',
                            onOk() {
                              
                              dispatch({type: 'websocket/ok', payload:{orderNum:result.payload.orderNum},});

                              console.log('OK');
                            },
                            onCancel() {
                              console.log('Cancel');
                            },
                          });
                        }
                        let _currentChat = yield select(state => state.websocket._currentChat );

                        if((data.message == 'sendSuccess' || data.message == 'receiverOffline') && result.payload != "closeSession-max"){//接收自己发送的消息

                          let seq = parseInt(data.seq);
                          let allChat = yield select(state => state.websocket.allChat );
                          let sendMap = yield select(state => state.websocket.sendMap );
                          let message = sendMap.get(seq);
                          if(message){
                            let receiver = allChat.get(message.receiver);
                            if (!receiver) {
                              allChat.set(message.receiver,newUser());
                              receiver = allChat.get(message.receiver);
                            }
                            message.self = 1;
                            receiver.messages.push(message);
                            if(_currentChat.otherUser.username == message.receiver){
                              _currentChat.messages.push(message);
                            }
                            allChat.set(message.receiver,receiver);
                          }
                          sendMap.delete(seq);
                          yield put({
                            type: 'sendMessage',
                            payload: sendMap,
                          });
                          yield put({
                            type: 'receiveMessage',
                            payload: {_currentChat,allChat},
                          });

                        }else if(data.message == 'messageRequestTransformSuccess'){//接收别人发送的消息
                          //let websocket = yield select(state => state.websocket );
                          let _currentChat = yield select(state => state.websocket._currentChat );
                          let allChat_ =  yield select(state => state.websocket.allChat);
                          
                          let sender = allChat_.get(result.sender);
                            if (!sender) {
                              allChat_.set(result.sender,newUser());
                              sender = allChat_.get(result.sender);
                            }
                          result.self = 0;
                          //

                          if(result.type=="AUD"){
                            result.payload = JSON.parse(result.payload);
                          }
                          sender.messages.push(result);
                          if(_currentChat.otherUser.username == result.sender){
                              _currentChat.messages.push(result);
                            }else{
                              sender.count = sender.count + 1 ;
                            }
                            allChat_.set(result.sender,sender);
                          yield put({
                            type: 'receiveMessage',
                            payload: {_currentChat,allChat:allChat_},
                          });
                        }
                        
                        
                        break;
                    // 拉取未读
                    case 'pullNotReceivedMessage':
                        if(result && Array.isArray(result)){
                          if (result.length >= 20) {
                            yield call(service.pullNotReceivedMessage, result[0].sender);
                          }
                          const _currentChat = yield select(state => state.websocket._currentChat );
                          const allChat = yield select(state => state.websocket.allChat );
                          for (var i = 0; i < result.length; i++) {

                            if(result[i].source == 'system'){
                              const payload = JSON.parse(result[i].payload);
                              const modal = Modal.confirm({
                                title: '提醒',
                                content: payload.viewWord,
                                okText: '接受',
                                cancelText: '拒绝',
                                onOk() {
                                  dispatch({type: 'websocket/ok', payload:{orderNum:payload.orderNum},});
                                  console.log('OK');
                                },
                                onCancel() {
                                  console.log('Cancel');
                                },
                              });
                            }
                            let sender = allChat.get(result[i].sender);
                            if (!sender) {
                              allChat.set(result[i].sender,newUser());
                              sender = allChat.get(result[i].sender);
                            }
                            result[i].self = 0;
                            if(result[i].type=="AUD"){
                              result[i].payload = JSON.parse(result[i].payload);
                            }
                            sender.messages.push(result[i]);
                            if(_currentChat.otherUser.username == result[i].sender){
                              _currentChat.messages.push(result[i]);
                            }else{
                              sender.count ++;
                            }
                            allChat.set(result[i].sender,sender);
                          }              
                          yield put({
                            type: 'receiveMessage',
                            payload: {_currentChat,allChat},
                          });
                        }
                      
                      break;
                    case 'pullMessage':
                        if(result && Array.isArray(result)){
                          const _currentChat = yield select(state => state.websocket._currentChat );
                          const allChat = yield select(state => state.websocket.allChat);
                          
                          for (var i = 0; i < result.length; i++) {
                            if (result[i].payload == "closeSession-max") {
                              continue;
                            }
                            let sender = allChat.get(result[i].sender);
                            if (!sender) {
                              allChat.set(result[i].sender,newUser());
                              sender = allChat.get(result[i].sender);
                            }
                            if(_currentChat.otherUser.username == result[i].receiver){
                              result[i].self = 1;
                            }else{
                              result[i].self = 0;
                            }

                            if(result[i].type=="AUD"){
                              result[i].payload = JSON.parse(result[i].payload);
                            }
                            sender.messages.unshift(result[i]);
                            allChat.set(result[i].sender,sender);

                            if(_currentChat.otherUser.username == result[i].receiver || _currentChat.otherUser.username == result[i].sender){
                              _currentChat.messages.unshift(result[i]);
                            }
                          } 

                          yield put({
                            type: 'receiveMessage',
                            payload: {_currentChat,allChat},
                          });
                        }
                      
                      break;
                    case 'logout':
                        break;
                }
            }


            
            yield put({type: 'messageSuccess', payload: payload.client_id});
        },
        /** send({payload}, {put, call}) {
            yield call(service.send, {config: {url: 'wss://echo.websocket.org'}, data: payload});
        },*/
        * send({ payload, callback }, { call, put,select }) {
          yield call(service.send, payload);
          const sendMap = yield select(state => state.websocket.sendMap );
          sendMap.set(payload.seq ,payload);
          yield put({
              type: 'sendMessage',
              payload: sendMap,
            });
          if (callback) callback();
        },
        * pullMessage({ payload, callback }, { call, put,select }) {
          const currentChat = yield select(state => state.websocket._currentChat );
          if (currentChat.messages.length >0 ) {
            payload.endTime = currentChat.messages[0].createTime;
          }

          yield call(service.pullMessage, payload);
        },
        * changeState({ payload, callback ,dispatch}, { call, put,select }) {
          
          let parms = {...payload};
          parms.clientType='h5';
          if(parms.requestType == 'online'){
            dispatch({ type: 'open'});
            service.listen((data) => {
                dispatch({ type: 'websocket/message', payload: data,dispatch:dispatch });
              });

            //service.listen(callback);
            
          }else if(parms.requestType == 'offline'){
            yield put({
              type: 'changeUserState',
              payload: 'offline',
            });
          }

          yield call(service.online, parms);
          if (callback) callback();
        },
        * pullNotReceivedMessage({ payload, callback }, { call, put,select }) {
          
          yield call(service.pullNotReceivedMessage, payload);
        },

        * changeUser({ payload, callback }, { call, put,select }) {
          const allChat = yield select(state => state.websocket.allChat );
          
          let receiver = allChat.get(payload.username);
          if (!receiver) {
            allChat.set(payload.username,newUser());
            receiver = allChat.get(payload.username);
          }
          receiver.count = 0;
          allChat.set(payload.username,receiver);

          let currentChat = {};
          currentChat.otherUser = Object.assign({}, payload);
          
          currentChat.messages = Object.assign([], receiver.messages);
          yield put({
              type: 'changeUserSuccess',
              payload: {_currentChat:currentChat,allChat},
            });
        },
        * querySession({ payload, callback }, { call, put,select }) {
          const userState = yield select(state => state.websocket.userState );
          if(userState != 'offline'){
            yield call(service.querySession, payload);
          }
          
        },


    },

    reducers: {
        save(state, action) {
            return {...state, ... action.payload}
        },
        messageSuccess(state, action) {
        //messages{type:'message',data:{....}}
            return {...state, ... action.payload}
        },
        receiveMessage(state, { payload }) {
          
          return {
            ...state,
            ...payload,
          };
        },
        sendMessage(state, { payload }) {
          return {
            ...state,
            sendMap:payload,
          };
        },
        changeUserState(state, { payload }){
          return {
            ...state,
            userState:payload,
          };
        },
        changeUserSuccess(state, { payload }){
          return {
            ...state,
            ...payload,
          };
        },
    },
}