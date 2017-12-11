import { stringify } from 'qs';
import request from '../utils/request';

export async function queryWithdraw(params) {
  return request(`/api/fpa/withdraw?${stringify(params)}`);
}

export async function addWithdraw(params) {
  return request('/api/fpa/withdraw', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateWithdraw(params) {
  return request('/api/fpa/withdraw/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeWithdraw(params) {
  return request(`/api/fpa/withdraw/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadWithdraw(params) {
  return request(`/api/fpa/withdraw/`+params['id']);
}

export async function queryWithdrawBase(params) {
return request(`/api/fpa/withdraw/base/`);
}
