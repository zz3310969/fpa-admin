import { message } from 'antd';
import uuidv1  from'uuid/v1';

import { queryConfig,querySign} from '../../services/Advisory/cos';
import COS from '../../utils/cos-js-sdk-v5';
import request from '../../utils/request';
import { stringify } from 'qs';

var cos;


export default {
  namespace: 'cos',

  state: {
    cosOptions:{},
    signOptions:{},
  },

  effects: {
    * config({payload,callback}, { call, put }) {
      
      const response = yield call(queryConfig,payload);
      if(response.state == 'success'){
        yield put({
          type: 'save',
          payload:{'cosOptions':response.data} ,
        });
      }else if(response.message){
        message.error(response.message);
      }else{
        message.error('查询配置出错');
      }
      if(callback) callback();
      
    },
    * sign({payload}, { call, put }) {
      
      const response = yield call(querySign,payload);
      if(response.state == 'success'){
        yield put({
          type: 'save',
          payload: {'signOptions':response.data},
        });
      }else if(response.message){
        message.error(response.message);
      }else{
        message.error('查询签名出错');
      }
      
    },

    * upload({payload,dispatch}, { call, put,select }) {
      
      if(!cos){
      	// 初始化实例
      	let signOptions_ = yield select(state => state.cos.signOptions );

		  cos = new COS({
		    getAuthorization: function (params, callback) {
		    	/*request(`/api/advisory/cos/sign?${stringify(params)}`).then(response =>{
		    		debugger
				    if(response.state == 'success'){
				        signOptions_ = response.data;
				        debugger
				        callback(response.data.sign);
				      }else if(response.message){
				        message.error(response.message);
				      }else{
				        message.error('查询配置出错');
				      }
		    	})*/
		    	/*
			      */
			      
		        // 异步获取签名
		        var authorization = COS.getAuthorization({
		            SecretId: 'AKIDSpCPQFhNfmmcJ0Q0FKE7pNjuuiKlN73o',
		            SecretKey: 'kKjOsEPOCoFUlwviLm27IJ9nFWcaNyOc',
		            Method: params.Method,
		            Key: params.Key
		        });
		        callback(authorization);
		        //callback('q-sign-algorithm=sha1&q-ak=AKIDSpCPQFhNfmmcJ0Q0FKE7pNjuuiKlN73o&q-sign-time=1520907600;1520914800&q-key-time=1520907600;1520914800&q-header-list=&q-url-param-list=&q-signature=6c0344447c590ec3f6226a2de861801764ae8f4c')

		        /*if (signOptions_.sign && (signOptions_.expiredTime - new Date().getTime() > 0)){
			      callback(signOptions_.sign);
			    }else{
			    

			    }*/
		    }
		});
		yield put({
          type: 'save',
          payload: {'signOptions':signOptions_},
        });
	}
	let cosOptions = yield select(state => state.cos.cosOptions );
  let token = yield select(state => state.websocket.token );
  let _currentChat = yield select(state => state.websocket._currentChat );
  
	let key = cosOptions.path + uuidv1()+".jpg";
	cos.sliceUploadFile({
        Bucket: cosOptions.bucket,
        Region: cosOptions.region,
        Key: key,
        Body: payload,
    }, function (err, data) {
        console.log(err, data);
        if(!err){
          let data = {
              "clientType": "h5",
              "createTime": new Date().getTime(),
              'seq': new Date().getTime(),
              "payload": cosOptions.cosUrl + key,
              "receiver": _currentChat.otherUser.username,
              "requestType": "message",
              "token": token,
              "type": "IMG"
            };
          dispatch({
              type: 'websocket/send',
              payload: data,
          });
        }
        
    });
	
      
    },
    
    *clean({ payload }, { call, put }){
      yield put({
        type: 'show',
        payload: {formdate: {},},
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    show(state, { payload }) {
      return {
        ...state,
        formdate:payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeRegularFormSubmitting(state, { payload }) {
      return {
        ...state,
        regularFormSubmitting: payload,
      };
    },
  },
};
