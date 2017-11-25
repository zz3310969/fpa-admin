import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCardUnit(params) {
  return request(`/api/fpa/cardunit?${stringify(params)}`);
}

export async function addCardUnit(params) {
  return request('/api/fpa/cardunit', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCardUnit(params) {
  return request('/api/fpa/cardunit/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCardUnit(params) {
  return request(`/api/fpa/cardunit?${stringify(params)}`, {
    method: 'DELETE'
  });
}

export async function loadCardUnit(params) {
  return request(`/api/fpa/cardunit/`+params['id']);
}
