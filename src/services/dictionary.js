import { stringify } from 'qs';
import request from '../utils/request';

export async function queryUser(params) {
  return request(`/api/dictionary/read?${stringify(params)}`);
}

export async function addUser(params) {
  return request('/api/dictionary/user', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateUser(params) {
  return request('/api/dictionary/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeUser(params) {
  return request(`/api/dictionary/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadUser(params) {
  return request(`/api/dictionary/`+params['id']);
}

export async function queryUserBase(params) {
return request(`/api/dictionary/base/`);
}

export async function queryCurrent() {
  return request('/api/currentUser');
}