import { message } from 'antd';

import {queryCardTestResult,addCardTestResult,loadCardTestResult,updateCardTestResult,removeCardTestResult,queryCardTestResultBase } from '../services/cardtestresult';

export default {
  namespace: 'cardtestresult',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    formdate:{customer:{},cardTestResultDetailVoList:[],chats:[],result:{}},
    loading: true,
    scenes:[],
    regularFormSubmitting: false,
    basicLoading:true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryCardTestResult, payload);
      if(response.state == 'success'){
        yield put({
          type: 'save',
          payload: response.data,
        });
      }else{
        throw response;
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *remove({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(removeCardTestResult, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });

      if (callback) callback();
    },
    *add({ payload }, { call, put }) {
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: true,
      });
      const response = yield call(addCardTestResult, payload);
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: false,
      });
      if(response.state == 'success'){
        message.success(response.message);
      }else if(response.message){
        message.error(response.message);
      }else{
        message.error('提交失败');
      }
    },
    *update({ payload }, { call, put }) {
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: true,
      });
      const response = yield call(updateCardTestResult, payload);
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: false,
      });
      if(response.state == 'success'){
        message.success(response.message);
      }else if(response.message){
        message.error(response.message);
      }else{
        message.error('提交失败');
      }
    },
    *fetchBasic({payload}, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: { basicLoading: true },
      });
      const response = yield call(loadCardTestResult,payload);
      if(response.state == 'success'){
        const result = JSON.parse(response.data.result); 
        response.data.result = result;
        yield put({
          type: 'show',
          payload: response.data,
        });
      }else if(response.message){
        message.error(response.message);
      }else{
        message.error('提交失败');
      }
      
      yield put({
        type: 'changeLoading',
        payload: { basicLoading: false },
      });
    },
    *base({ payload }, { call, put }) {
      const response = yield call(queryCardTestResultBase, payload);
      if(response.state == 'success'){
        yield put({
          type: 'load',
          payload: response.data,
        });
      }else{
        throw response;
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    load(state, action) {
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
        ...action.payload,
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
