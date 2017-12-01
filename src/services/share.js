import { stringify } from 'qs';
import request from '../utils/request';

export async function queryShare(params) {
  return request(`/api/fpa/share?${stringify(params)}`);
}

export async function addShare(params) {
  return request('/api/fpa/share', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateShare(params) {
  return request('/api/fpa/share/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeShare(params) {
  return request(`/api/fpa/share/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadShare(params) {
  return request(`/api/fpa/share/`+params['id']);
}

export async function queryShareBase(params) {
return request(`/api/fpa/share/base/`);
}
