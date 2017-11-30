import { message } from 'antd';
import {getLocalState } from '../utils/helper';
import {queryCardGroup,addCardGroup,loadCardGroup,updateCardGroup,removeCardGroup,queryCardGroupBase } from '../services/cardgroup';

export default {
  namespace: 'cardgroup',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    states:[],
    colors:[],
    themes:[],
    formdate:{},
    loading: true,
    regularFormSubmitting: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryCardGroup, payload);
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
      const response = yield call(removeCardGroup, payload);
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
      const response = yield call(addCardGroup, payload);
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
      const response = yield call(updateCardGroup, payload);
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
        payload: {},
      });
      const response = yield call(loadCardGroup,payload);
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
      const response = yield call(queryCardGroupBase, payload);
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
