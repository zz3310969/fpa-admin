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

