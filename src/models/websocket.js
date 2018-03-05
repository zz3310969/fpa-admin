import * as service from '../services/websocket';

export default {
    namespace: 'websocket',
    state: {
        messages: undefined,
        client_id: undefined,
        other_id:undefined,
        dddd:['1','2'],
        sendMap:new Map(),
        userState:'offline',
        _currentChat:{
          messages:[{
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
          },],
          //聊天对象头像
          user:{
            img:'https://dummyimage.com/200x200/00662a/FFF&text=Kate'
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
                    case 'openSession':
                        break;
                    case 'closeSession':
                        break;
                    case 'message':
                        // cb(data);
                        
                        
                        const _currentChat = yield select(state => state.websocket._currentChat );
                        if(data.message == 'sendSuccess' || data.message == 'receiverOffline'){

                          const seq = parseInt(data.seq);
                          const sendMap = yield select(state => state.websocket.sendMap );
                          const message = sendMap.get(seq);
                          if(message){
                            message.self = 1;
                            _currentChat.messages.push(message);
                          }
                          sendMap.delete(seq);
                          yield put({
                            type: 'sendMessage',
                            payload: sendMap,
                          });
                          yield put({
                            type: 'receiveMessage',
                            payload: _currentChat,
                          });

                        }else if(data.message == 'messageRequestTransformSuccess'){
                          const _currentChat = yield select(state => state.websocket._currentChat );
                          debugger
                          result.self = 0;
                          _currentChat.messages.push(result);
                          console.log('state', _currentChat);
                          yield put({
                            type: 'receiveMessage',
                            payload: _currentChat,
                          });
                        }
                        
                        
                        break;
                    // 用户退出 更新用户列表
                    case 'pullNotReceivedMessage':
                        if(result && Array.isArray(result)){
                          if (result.length >= 20) {
                            yield call(service.pullNotReceivedMessage, result[0].receiver);
                          }
                          const _currentChat = yield select(state => state.websocket._currentChat );
                          for (var i = 0; i < result.length; i++) {
                            result[i].self = 0;
                            _currentChat.messages.push(result[i]);
                          }              
                          yield put({
                            type: 'receiveMessage',
                            payload: _currentChat,
                          });
                        }
                      
                      break;
                    case 'pullMessage':
                        if(result && Array.isArray(result)){
                          
                          const _currentChat = yield select(state => state.websocket._currentChat );
                          for (var i = 0; i < result.length; i++) {
                            result[i].self = 0;
                            _currentChat.messages.unshift(result[i]);
                          }              
                          yield put({
                            type: 'receiveMessage',
                            payload: _currentChat,
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


    },

    reducers: {
        openSuccess(state, action) {
            //client_id:1
            return {...state, ... action.payload}
        },
        messageSuccess(state, action) {
        //messages{type:'message',data:{....}}
            return {...state, ... action.payload}
        },
        receiveMessage(state, { payload }) {
          return {
            ...state,
            _currentChat:payload,
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
    },
}