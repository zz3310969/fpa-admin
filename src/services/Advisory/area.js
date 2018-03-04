import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryArea(params) {
  return request(`/api/advisory/area/tree?${stringify(params)}`);
}

export async function addArea(params) {
  return request('/api/advisory/area', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateArea(params) {
  return request('/api/advisory/area/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeArea(params) {
  return request(`/api/advisory/area/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadArea(params) {
  return request(`/api/advisory/area/`+params['id']);
}

export async function queryAreaBase(params) {
return request(`/api/advisory/area/base/`);
}
