import { stringify } from 'qs';
import request from '../utils/request';

export async function queryRefund(params) {
  return request(`/api/fpa/refund?${stringify(params)}`);
}

export async function addRefund(params) {
  return request('/api/fpa/refund', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateRefund(params) {
  return request('/api/fpa/refund/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeRefund(params) {
  return request(`/api/fpa/refund/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadRefund(params) {
  return request(`/api/fpa/refund/`+params['id']);
}

export async function queryRefundBase(params) {
return request(`/api/fpa/refund/base/`);
}
