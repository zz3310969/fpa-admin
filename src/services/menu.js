import { stringify } from 'qs';
import request from '../utils/request';

export async function queryMenu(params) {
  return request(`/api/base/menu/read?${stringify(params)}`);
}

export async function addMenu(params) {
  return request('/api/base/menu', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateMenu(params) {
  return request('/api/base/menu/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeMenu(params) {
  return request(`/api/base/menu/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadMenu(params) {
  return request(`/api/base/menu/`+params['id']);
}

export async function queryMenuBase(params) {
return request(`/api/base/menu/base`);
}


export async function queryMenuTree(params){
  // const data2 = [{
  //    layout: 'BasicLayout',
  //   name: '首页', // for breadcrumb
  //   path: '',
  //   children:[{
  //     name: '在线咨询',
  //     path: 'advisory',
  //     icon: 'solution',
  //     children: [{
  //       name: '在线咨询服务台',
  //       path: 'chat',
  //       c_path: '../routes/Fpa/Chat/Index',
  //       target: '_blank'
  //     }]
  //   }]
  // }]

  // return data2;

  

  const data = [{
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '',
    children: [{
      name: '在线咨询',
      path: 'advisory',
      icon: 'solution',
      children: [{
        name: '在线咨询服务台',
        path: 'chat',
        c_path: '../routes/Fpa/Chat/Index',
        target: '_blank'
      }, {
        name: '接入系统管理',
        path: 'application',
        c_path: '../routes/Advisory/Application/ApplicationList'
      }, {
        name: '接入系统用户管理',
        path: 'applicationuser',
        c_path: '../routes/Advisory/ApplicationUser/ApplicationUserList'
      }],
    }],
  }];
  return data;

}