import { stringify } from 'qs';
import request from '../utils/request';

export async function queryOrder(params) {
  return request(`/api/fpa/order?${stringify(params)}`);
}

export async function addOrder(params) {
  return request('/api/fpa/order', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateOrder(params) {
  return request('/api/fpa/order/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeOrder(params) {
  return request(`/api/fpa/order/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadOrder(params) {
  return request(`/api/fpa/order/`+params['id']);
}

export async function queryOrderBase(params) {
return request(`/api/fpa/order/base/`);
}
