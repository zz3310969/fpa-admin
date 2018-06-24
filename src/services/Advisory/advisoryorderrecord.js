import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryAdvisoryOrderRecord(params) {
  return request(`/api/fpa/advisoryorderrecord?${stringify(params)}`);
}

export async function addAdvisoryOrderRecord(params) {
  return request('/api/fpa/advisoryorderrecord', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateAdvisoryOrderRecord(params) {
  return request('/api/fpa/advisoryorderrecord/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeAdvisoryOrderRecord(params) {
  return request(`/api/fpa/advisoryorderrecord/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadAdvisoryOrderRecord(params) {
  return request(`/api/fpa/advisoryorderrecord/`+params['id']);
}

export async function queryAdvisoryOrderRecordBase(params) {
return request(`/api/fpa/advisoryorderrecord/base/`);
}
