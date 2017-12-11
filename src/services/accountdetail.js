import { stringify } from 'qs';
import request from '../utils/request';

export async function queryAccountDetail(params) {
  return request(`/api/fpa/accountdetail?${stringify(params)}`);
}

export async function addAccountDetail(params) {
  return request('/api/fpa/accountdetail', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateAccountDetail(params) {
  return request('/api/fpa/accountdetail/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeAccountDetail(params) {
  return request(`/api/fpa/accountdetail/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadAccountDetail(params) {
  return request(`/api/fpa/accountdetail/`+params['id']);
}

export async function queryAccountDetailBase(params) {
return request(`/api/fpa/accountdetail/base/`);
}
