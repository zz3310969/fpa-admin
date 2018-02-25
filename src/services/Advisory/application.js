import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryApplication(params) {
  return request(`/api/advisory/application?${stringify(params)}`);
}

export async function addApplication(params) {
  return request('/api/advisory/application', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateApplication(params) {
  return request('/api/advisory/application/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeApplication(params) {
  return request(`/api/advisory/application/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadApplication(params) {
  return request(`/api/advisory/application/`+params['id']);
}

export async function queryApplicationBase(params) {
return request(`/api/advisory/application/base/`);
}
