import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryCommentRecord(params) {
  return request(`/api/advisory/commentrecord?${stringify(params)}`);
}

export async function addCommentRecord(params) {
  return request('/api/advisory/commentrecord', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCommentRecord(params) {
  return request('/api/advisory/commentrecord/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCommentRecord(params) {
  return request(`/api/advisory/commentrecord/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadCommentRecord(params) {
  return request(`/api/advisory/commentrecord/`+params['id']);
}

export async function queryCommentRecordBase(params) {
return request(`/api/advisory/commentrecord/base/`);
}
