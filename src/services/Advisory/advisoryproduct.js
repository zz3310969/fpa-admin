import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryAdvisoryProduct(params) {
  return request(`/api/advisory/advisoryproduct?${stringify(params)}`);
}

export async function addAdvisoryProduct(params) {
  return request('/api/advisory/advisoryproduct', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateAdvisoryProduct(params) {
  return request('/api/advisory/advisoryproduct/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeAdvisoryProduct(params) {
  return request(`/api/advisory/advisoryproduct/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadAdvisoryProduct(params) {
  return request(`/api/advisory/advisoryproduct/`+params['id']);
}

export async function queryAdvisoryProductBase(params) {
return request(`/api/advisory/advisoryproduct/base/`);
}
