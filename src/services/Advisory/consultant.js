import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryConsultant(params) {
  return request(`/api/advisory/consultant?${stringify(params)}`);
}

export async function addConsultant(params) {
  return request('/api/advisory/consultant', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateConsultant(params) {
  return request('/api/advisory/consultant/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeConsultant(params) {
  return request(`/api/advisory/consultant/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadConsultant(params) {
  return request(`/api/advisory/consultant/`+params['id']);
}

export async function queryConsultantBase(params) {
return request(`/api/advisory/consultant/base/`);
}
