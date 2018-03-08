import * as service from '../services/websocket';
import {loadCustomerByopenid}  from '../services/customer';


/*const newUser = {
  messages:[],
  const:0,
};*/

function newUser() {
  return {
  messages:[],
  count:0,
};
}

export default {
    namespace: 'websocket',
    state: {
        user_id:'zlt',
        sessionUser:new Map(),
        sendMap:new Map(),
        userState:'offline',
        allChat:new Map(),
        _currentChat:{
          messages:[/*{
            createTime:'2018-03-01',
            payload:'你好',
            self:0,
            img:'',
            type:'TXT'
          },{
            createTime:'2018-03-01',
            payload:'我也好',
            self:'1',
            type:'TXT'
          },{
            createTime:'2018-03-02',
            payload:'你在哪儿',
            self:0,
            type:'AUDIO',
            length:5
          },{
            createTime:'2018-03-01',
            payload:'我在上海',
            self:'1',
            type:'AUDIO',
            length:2
          },{
            createTime:'2018-03-05',
            payload:'呼叫总部',
            self:0,
            type:'TXT'
          },{
            createTime:'2018-03-01',
            payload:'我是莱德',
            self:'1',
            type:'TXT'
          },*/],
          //聊天对象头像
          otherUser:{
            head_image_url:'https://dummyimage.com/200x200/00662a/FFF&text=Kate'
          }

        }
    },
    subscriptions: {
        watchWebSocket({dispatch, history}) {
            return history.listen(({pathname}) => {
                dispatch({type: 'open'});
            });
        },
        socketMessage({ dispatch }) {
          return service.listen((data) => {
            dispatch({ type: 'message', payload: data });
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
        * open({payload}, {put, call}) {
            //wss://echo.websocket.org

            const config = {url: 'ws://127.0.0.1:8181/roof-im/connect.ws',token:'code', user_name: 'xxx', user_id: 1, room_id: 999};
            // service.watchList(config, (data) => {
            //     dispatch({type: data.type, payload: data});
            // });

            yield call(service.watchList, config);
        },
        * message({payload}, {put, call,select}) {
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

                        for (var i = 0; i < result.length; i++) {
                          let receiver = sessionUser.get(result[i].receiver);
                          if (!receiver) {
                            const response = yield call(loadCustomerByopenid, {openid:result[i].receiver});
                            if(response.state == 'success'){
                              let u = Object.assign({},response.data);
                              u.username = u.weixinOpenId;
                              u.head_image_url = u.weixinHeadImage;
                              u.key = i+'';
                              sessionUser.set(result[i].receiver,u);
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
                        let _currentChat = yield select(state => state.websocket._currentChat );
                        if(data.message == 'sendSuccess' || data.message == 'receiverOffline'){//接收自己发送的消息
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
                            allChat.set(message.receiver,receiver);
                            if(_currentChat.otherUser.username == message.receiver){
                              _currentChat.messages.push(message);

                            }
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
                          sender.messages.push(result);
                          allChat_.set(result.sender,sender);
                          if(_currentChat.otherUser.username == result.sender){
                              _currentChat.messages.push(result);
                              
                            }
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
                            let sender = allChat.get(result[i].sender);
                            if (!sender) {
                              allChat.set(result[i].sender,newUser());
                              sender = allChat.get(result[i].sender);
                            }
                            /*if(!sender.messages){
                              sender.messages = new Array();
                            }*/
                            result[i].self = 0;
                            sender.messages.push(result[i]);
                            allChat.set(result[i].sender,sender);
                            if(_currentChat.otherUser.username == result[i].sender){
                              _currentChat.messages.push(result[i]);
                            }
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

                            let sender = allChat.get(result[i].sender);
                            
                            if (!sender) {
                              allChat.set(result[i].sender,newUser());
                              sender = allChat.get(result[i].sender);
                            }
                            result[i].self = 0;
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
          yield call(service.pullMessage, payload);
        },
        * changeState({ payload, callback ,dispatch}, { call, put,select }) {
          debugger
          let parms = {...payload};
          parms.clientType='h5';
          if(parms.requestType == 'online'){
            service.watchList();
            //service.listen(callback);
            service.listen((data) => {
              dispatch({ type: 'websocket/message', payload: data });
            });
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
          let currentChat = {};
          currentChat.otherUser = Object.assign({}, payload);
          currentChat.messages = Object.assign([], receiver.messages);
          yield put({
              type: 'changeUserSuccess',
              payload: {_currentChat:currentChat},
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