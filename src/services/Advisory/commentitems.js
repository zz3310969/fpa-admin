import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryCommentItems(params) {
  return request(`/api/advisory/commentitems?${stringify(params)}`);
}

export async function addCommentItems(params) {
  return request('/api/advisory/commentitems', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCommentItems(params) {
  return request('/api/advisory/commentitems/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCommentItems(params) {
  return request(`/api/advisory/commentitems/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadCommentItems(params) {
  return request(`/api/advisory/commentitems/`+params['id']);
}

export async function queryCommentItemsBase(params) {
return request(`/api/advisory/commentitems/base/`);
}
