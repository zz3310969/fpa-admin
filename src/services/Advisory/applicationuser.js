import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryApplicationUser(params) {
  return request(`/api/advisory/applicationuser?${stringify(params)}`);
}

export async function addApplicationUser(params) {
  return request('/api/advisory/applicationuser', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateApplicationUser(params) {
  return request('/api/advisory/applicationuser/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeApplicationUser(params) {
  return request(`/api/advisory/applicationuser/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadApplicationUser(params) {
  return request(`/api/advisory/applicationuser/`+params['id']);
}

export async function queryApplicationUserBase(params) {
return request(`/api/advisory/applicationuser/base/`);
}
