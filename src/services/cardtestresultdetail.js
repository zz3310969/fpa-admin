import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCardTestResultDetail(params) {
  return request(`/api/fpa/cardtestresultdetail?${stringify(params)}`);
}

export async function addCardTestResultDetail(params) {
  return request('/api/fpa/cardtestresultdetail', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCardTestResultDetail(params) {
  return request('/api/fpa/cardtestresultdetail/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCardTestResultDetail(params) {
  return request(`/api/fpa/cardtestresultdetail/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadCardTestResultDetail(params) {
  return request(`/api/fpa/cardtestresultdetail/`+params['id']);
}
