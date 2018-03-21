import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryQuickReply(params) {
  return request(`/api/advisory/quickreply?${stringify(params)}`);
}

export async function addQuickReply(params) {
  return request('/api/advisory/quickreply', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateQuickReply(params) {
  return request('/api/advisory/quickreply/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeQuickReply(params) {
  return request(`/api/advisory/quickreply/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadQuickReply(params) {
  return request(`/api/advisory/quickreply/`+params['id']);
}

export async function queryQuickReplyBase(params) {
return request(`/api/advisory/quickreply/base/`);
}

export async function queryMyQuickReply(params) {
  return request(`/api/advisory/quickreply/my?${stringify(params)}`);
}
