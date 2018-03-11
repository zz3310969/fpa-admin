import { message } from 'antd';

import {queryMenu,addMenu,loadMenu,updateMenu,removeMenu,queryMenuBase,queryMenuTree } from '../services/menu';
import {loop,loopDelete} from '../utils/helper';

export default {
  namespace: 'menu',

  state: {
    data: [],
    formdate:{},
    loading: true,
    regularFormSubmitting: false,
    resources:[],
    menuTypes:[],
    menus:[]
  },

  

  effects: {
    *fetch({ payload,treeData,callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryMenu, payload);
      if(response.state == 'success'){
        if(treeData && treeData.length == 0){
          Object.assign(treeData,response.data);
        }else{
            treeData = loop(treeData,payload.parentId,response.data)
        }
        yield put({
          type: 'save',
          payload: treeData,
        });
      }else{
        throw response;
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (callback) callback();
    },
    *remove({ treeData,payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(removeMenu, payload);
      debugger;
      if(response.state == 'success'){
        yield put({
          type: 'save',
          payload: loopDelete(treeData,payload.id),
        });
      }
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
      const response = yield call(addMenu, payload);
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
      const response = yield call(updateMenu, payload);
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
      const response = yield call(loadMenu,payload);
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
      const response = yield call(queryMenuBase, payload);
      if(response.state == 'success'){
        if(response.data.roleses){
          var roles = new Array();
          response.data.roleses.map(function(index) {
            var r ={};
            r.label = index.description;
            r.value = index.id;
            roles.push(r);
          });
          response.data.roleses = roles;
        }

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
        payload: {formdate: {},data: [],},
      });
    },
    * queryMenuTree({ payload }, { call, put,select }) {
      const menus =  yield call(queryMenuTree, payload);
      console.log("query modle menus");
      console.log(menus)
      // let menus2 =menus.reduce((arr, current) => arr.concat(current.children), []);
      yield put({
        type:'saveMenus',
        payload: menus
      })

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
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    saveMenus(state, { payload }){
      return {
        ...state,
        menus: payload,
      };
    }
  },
};
