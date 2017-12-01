/* eslint-disable eqeqeq,key-spacing */
import { message } from 'antd';

import { queryCharacterColor, addCharacterColor, loadCharacterColor, updateCharacterColor, removeCharacterColor, queryCharacterColorBase } from '../services/charactercolor';

export default {
  namespace: 'charactercolor',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    states: [],
    colors: [],
    formdate: {},
    loading: true,
    regularFormSubmitting: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryCharacterColor, payload);
      if (response.state == 'success') {
        yield put({
          type: 'save',
          payload: response.data,
        });
      } else {
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
      const response = yield call(removeCharacterColor, payload);
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
      const response = yield call(addCharacterColor, payload);
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: false,
      });
      if (response.state == 'success') {
        message.success(response.message);
        if (callback) callback();
      } else if (response.message) {
        message.error(response.message);
      } else {
        message.error('提交失败');
      }
    },
    *update({ payload }, { call, put }) {
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: true,
      });
      const response = yield call(updateCharacterColor, payload);
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: false,
      });
      if (response.state == 'success') {
        message.success(response.message);
        if (callback) callback();
      } else if (response.message) {
        message.error(response.message);
      } else {
        message.error('提交失败');
      }
    },
    *fetchBasic({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: {},
      });
      const response = yield call(loadCharacterColor, payload);
      if (response.state == 'success') {
        let resdata = Object.assign({}, response.data);

        let colorIds = [];
        if(resdata.colorId != null && resdata.color2Id!=null){
          colorIds[0] = resdata.colorId+'';
          colorIds[1] = resdata.color2Id+'';
        }else if(resdata.colorId != null && resdata.color2Id ==null){
          colorIds[0] = resdata.colorId+'';
        }
        resdata.colorIds = colorIds;
        console.log(resdata);
        yield put({
          type: 'show',
          payload: resdata,
        });
      } else if (response.message) {
        message.error(response.message);
      } else {
        message.error('提交失败');
      }

      yield put({
        type: 'changeLoading',
        payload: {},
      });
    },
    *base({ payload }, { call, put }) {
      const response = yield call(queryCharacterColorBase, payload);
      if (response.state == 'success') {
        yield put({
          type: 'load',
          payload: response.data,
        });
      } else {
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
        formdate: payload,
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
