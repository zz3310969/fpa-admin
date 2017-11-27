import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCharacterColor(params) {
  return request(`/api/fpa/charactercolor?${stringify(params)}`);
}

export async function addCharacterColor(params) {
  return request('/api/fpa/charactercolor', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function updateCharacterColor(params) {
  return request('/api/fpa/charactercolor', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}


export async function removeCharacterColor(params) {
  return request(`/api/fpa/charactercolor/`+params['id'], {
    method: 'DELETE',
  });
}

export async function loadCharacterColor(params) {
  return request(`/api/fpa/charactercolor/${params.id}`);
}


export async function queryCharacterColorBase(params) {
  return request(`/api/fpa/charactercolor/base`);
}
