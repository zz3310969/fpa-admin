import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryAdvisoryModes(params) {
  return request(`/api/advisory/advisorymodes?${stringify(params)}`);
}

export async function addAdvisoryModes(params) {
  return request('/api/advisory/advisorymodes', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateAdvisoryModes(params) {
  return request('/api/advisory/advisorymodes/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeAdvisoryModes(params) {
  return request(`/api/advisory/advisorymodes/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadAdvisoryModes(params) {
  return request(`/api/advisory/advisorymodes/`+params['id']);
}

export async function queryAdvisoryModesBase(params) {
return request(`/api/advisory/advisorymodes/base/`);
}
