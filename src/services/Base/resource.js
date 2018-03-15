import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryResource(params) {
  return request(`/api/base/resource/tree?${stringify(params)}`);
}

export async function addResource(params) {
  return request('/api/base/resource', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateResource(params) {
  return request('/api/base/resource/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeResource(params) {
  return request(`/api/base/resource/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadResource(params) {
  return request(`/api/base/resource/`+params['id']);
}

export async function queryResourceBase(params) {
return request(`/api/base/resource/base/`);
}

