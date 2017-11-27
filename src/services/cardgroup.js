import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCardGroup(params) {
  return request(`/api/fpa/cardgroup?${stringify(params)}`);
}

export async function addCardGroup(params) {
  return request('/api/fpa/cardgroup', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCardGroup(params) {
  return request('/api/fpa/cardgroup/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCardGroup(params) {
  return request(`/api/fpa/cardgroup/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadCardGroup(params) {
  return request(`/api/fpa/cardgroup/`+params['id']);
}
