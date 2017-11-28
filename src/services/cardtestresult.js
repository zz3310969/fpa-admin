import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCardTestResult(params) {
  return request(`/api/fpa/cardtestresult?${stringify(params)}`);
}

export async function addCardTestResult(params) {
  return request('/api/fpa/cardtestresult', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCardTestResult(params) {
  return request('/api/fpa/cardtestresult/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCardTestResult(params) {
  return request(`/api/fpa/cardtestresult/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadCardTestResult(params) {
  return request(`/api/fpa/cardtestresult/`+params['id']);
}

export async function queryCardTestResultBase(params) {
  return request(`/api/fpa/cardtestresult/base`);
}
