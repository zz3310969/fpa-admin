import { routerRedux } from 'dva/router';
import { fakeAccountLogin, fakeMobileLogin } from '../services/api';
import { getLocalStorage } from '../utils/helper';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *accountSubmit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      sessionStorage.removeItem('token');
      const response = yield call(fakeAccountLogin, payload);
      if(response.value){
        response.status = 'ok';
        response.type = 'account';
        sessionStorage.setItem('token',response.value);
      }else{
        response.status = 'error';
        response.type = 'account';
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *mobileSubmit(_, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(fakeMobileLogin);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *logout(_, { put }) {
      sessionStorage.removeItem('token');
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });
      yield put(routerRedux.push('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
  subscriptions: {
    set({ dispatch }) {
      const data = getLocalStorage('token');
      if (!data){
          dispatch({ type: 'logout', payload: {}, });
      }
    }
  },
};
