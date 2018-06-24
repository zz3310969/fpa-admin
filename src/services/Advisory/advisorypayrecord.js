import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryAdvisoryPayRecord(params) {
  return request(`/api/fpa/advisorypayrecord?${stringify(params)}`);
}

export async function addAdvisoryPayRecord(params) {
  return request('/api/fpa/advisorypayrecord', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateAdvisoryPayRecord(params) {
  return request('/api/fpa/advisorypayrecord/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeAdvisoryPayRecord(params) {
  return request(`/api/fpa/advisorypayrecord/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadAdvisoryPayRecord(params) {
  return request(`/api/fpa/advisorypayrecord/`+params['id']);
}

export async function queryAdvisoryPayRecordBase(params) {
return request(`/api/fpa/advisorypayrecord/base/`);
}
