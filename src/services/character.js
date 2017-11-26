import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCharacter(params) {
  return request(`/api/fpa/character?${stringify(params)}`);
}

export async function addCharacter(params) {
  return request('/api/fpa/character', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCharacter(params) {
  return request('/api/fpa/character/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCharacter(params) {
  return request(`/api/fpa/character?${stringify(params)}`, {
    method: 'DELETE'
  });
}

export async function loadCharacter(params) {
  return request(`/api/fpa/character/`+params['id']);
}

export async function queryCharacterBase(params) {
  return request(`/api/fpa/character/base`);
}
