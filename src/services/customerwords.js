import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCustomerWords(params) {
  return request(`/api/fpa/customerwords?${stringify(params)}`);
}

export async function addCustomerWords(params) {
  return request('/api/fpa/customerwords', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCustomerWords(params) {
  return request('/api/fpa/customerwords/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCustomerWords(params) {
  return request(`/api/fpa/customerwords/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadCustomerWords(params) {
  return request(`/api/fpa/customerwords/`+params['id']);
}

export async function queryCustomerWordsBase(params) {
return request(`/api/fpa/customerwords/base/`);
}
