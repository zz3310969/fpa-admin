import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCard(params) {
  return request(`/api/fpa/card?${stringify(params)}`);
}

export async function addCard(params) {
  return request('/api/fpa/card', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCard(params) {
  return request('/api/fpa/card/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCard(params) {
  return request(`/api/fpa/card/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadCard(params) {
  return request(`/api/fpa/card/`+params['id']);
}
