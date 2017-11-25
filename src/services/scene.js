import { stringify } from 'qs';
import request from '../utils/request';

export async function queryScene(params) {
  return request(`/api/fpa/scene?${stringify(params)}`);
}

export async function addScene(params) {
  return request('/api/fpa/scene', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateScene(params) {
  return request('/api/fpa/scene/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}




export async function removeTheme(params) {
  return request(`/api/fpa/scene?${stringify(params)}`, {
    method: 'DELETE'
  });
}

export async function loadTheme(params) {
  return request(`/api/fpa/scene/`+params['id']);
}
