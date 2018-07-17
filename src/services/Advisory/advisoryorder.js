import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryAdvisoryOrder(params) {
  return request(`/api/advisory/advisoryorder?${stringify(params)}`);
}

export async function addAdvisoryOrder(params) {
  return request('/api/advisory/advisoryorder', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateAdvisoryOrder(params) {
  return request('/api/advisory/advisoryorder/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function okAdvisoryOrder(params) {
  return request('/api/advisory/advisoryorder/ok/'+params['orderNum'], {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function removeAdvisoryOrder(params) {
  return request(`/api/advisory/advisoryorder/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadAdvisoryOrder(params) {
  return request(`/api/advisory/advisoryorder/`+params['id']);
}

export async function queryAdvisoryOrderBase(params) {
return request(`/api/advisory/advisoryorder/base/`);
}
