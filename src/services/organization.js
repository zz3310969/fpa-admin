import { stringify } from 'qs';
import request from '../utils/request';

export async function queryOrganization(params) {
  return request(`/api/base/org/read?${stringify(params)}`);
}

export async function addOrganization(params) {
  return request('/api/base/org', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateOrganization(params) {
  return request('/api/base/org/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeOrganization(params) {
  return request(`/api/base/org/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadOrganization(params) {
  return request(`/api/base/org/`+params['id']);
}

export async function queryOrganizationBase(params) {
return request(`/api/base/org/base/`);
}

