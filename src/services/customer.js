import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCustomer(params) {
  return request(`/api/fpa/customer?${stringify(params)}`);
}

export async function addCustomer(params) {
  return request('/api/fpa/customer', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCustomer(params) {
  return request('/api/fpa/customer/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCustomer(params) {
  return request(`/api/fpa/customer/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadCustomer(params) {
  return request(`/api/fpa/customer/`+params['id']);
}

export async function queryCustomerBase(params) {
  return request(`/api/fpa/customer/base`);
}

