import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryLevel(params) {
  return request(`/api/advisory/level?${stringify(params)}`);
}

export async function addLevel(params) {
  return request('/api/advisory/level', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateLevel(params) {
  return request('/api/advisory/level/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeLevel(params) {
  return request(`/api/advisory/level/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadLevel(params) {
  return request(`/api/advisory/level/`+params['id']);
}

export async function queryLevelBase(params) {
return request(`/api/advisory/level/base/`);
}
