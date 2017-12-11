import { stringify } from 'qs';
import request from '../utils/request';

export async function queryAccount(params) {
  return request(`/api/fpa/account?${stringify(params)}`);
}

export async function addAccount(params) {
  return request('/api/fpa/account', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateAccount(params) {
  return request('/api/fpa/account/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeAccount(params) {
  return request(`/api/fpa/account/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadAccount(params) {
  return request(`/api/fpa/account/`+params['id']);
}

export async function queryAccountBase(params) {
return request(`/api/fpa/account/base/`);
}
