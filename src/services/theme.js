import { stringify } from 'qs';
import request from '../utils/request';

export async function queryTheme(params) {
  return request(`/api/fpa/theme?${stringify(params)}`);
}

export async function addTheme(params) {
  return request('/api/fpa/theme', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateTheme(params) {
  return request('/api/fpa/theme', {
    method: 'PUT',
    body: {
      ...params
    },
  });
}




export async function removeCharacterColor(params) {
  return request(`/api/fpa/theme?${stringify(params)}`, {
    method: 'DELETE'
  });
}

export async function loadCharacterColor(params) {
  return request(`/api/fpa/theme/`+params['id']);
}
