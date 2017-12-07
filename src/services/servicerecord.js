import { stringify } from 'qs';
import request from '../utils/request';

export async function queryServiceRecord(params) {
  return request(`/api/fpa/servicerecord?${stringify(params)}`);
}

export async function addServiceRecord(params) {
  return request('/api/fpa/servicerecord', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateServiceRecord(params) {
  return request('/api/fpa/servicerecord/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeServiceRecord(params) {
  return request(`/api/fpa/servicerecord/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadServiceRecord(params) {
  return request(`/api/fpa/servicerecord/`+params['id']);
}

export async function queryServiceRecordBase(params) {
return request(`/api/fpa/servicerecord/base/`);
}
