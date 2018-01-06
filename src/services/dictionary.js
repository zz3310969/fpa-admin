import { stringify } from 'qs';
import request from '../utils/request';

export async function queryDictionary(params) {
  return request(`/api/base/dictionary/read?${stringify(params)}`);
}

export async function addDictionary(params) {
  return request('/api/base/dictionary', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateDictionary(params) {
  return request('/api/base/dictionary/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeDictionary(params) {
  return request(`/api/base/dictionary/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadDictionary(params) {
  return request(`/api/base/dictionary/`+params['id']);
}

export async function queryDictionaryBase(params) {
return request(`/api/base/dictionary/base/`);
}

