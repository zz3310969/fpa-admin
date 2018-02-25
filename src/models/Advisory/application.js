import { message } from 'antd';

import {queryApplication,addApplication,loadApplication,updateApplication,removeApplication,queryApplicationBase } from '../../services/Advisory/application';

export default {
  namespace: 'application',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    formdate:{},
    loading: true,
    regularFormSubmitting: false,
    status:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryApplication, payload);
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
      const response = yield call(removeApplication, payload);
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
    *add({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: true,
      });
      const response = yield call(addApplication, payload);
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: false,
      });
      if(response.state == 'success'){
        message.success(response.message);
        if (callback) callback();
      }else if(response.message){
        message.error(response.message);
      }else{
        message.error('提交失败');
      }
    },
    *update({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: true,
      });
      const response = yield call(updateApplication, payload);
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: false,
      });
      if(response.state == 'success'){
        message.success(response.message);
        if (callback) callback();
      }else if(response.message){
        message.error(response.message);
      }else{
        message.error('提交失败');
      }
    },
    *fetchBasic({payload}, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: {},
      });
      const response = yield call(loadApplication,payload);
      if(response.state == 'success'){
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
        payload: {},
      });
    },
    *base({ payload }, { call, put }) {
      const response = yield call(queryApplicationBase, payload);
      if(response.state == 'success'){
        yield put({
          type: 'load',
          payload: response.data,
        });
      }else{
        throw response;
      }
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
