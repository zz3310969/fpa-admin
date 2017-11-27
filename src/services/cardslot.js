import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCardSlot(params) {
  return request(`/api/fpa/cardslot?${stringify(params)}`);
}

export async function addCardSlot(params) {
  return request('/api/fpa/cardslot', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCardSlot(params) {
  return request('/api/fpa/cardslot/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCardSlot(params) {
  return request(`/api/fpa/cardslot/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadCardSlot(params) {
  return request(`/api/fpa/cardslot/`+params['id']);
}
