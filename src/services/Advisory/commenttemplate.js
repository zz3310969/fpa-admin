import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryCommentTemplate(params) {
  return request(`/api/advisory/commenttemplate?${stringify(params)}`);
}

export async function addCommentTemplate(params) {
  return request('/api/advisory/commenttemplate', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCommentTemplate(params) {
  return request('/api/advisory/commenttemplate/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCommentTemplate(params) {
  return request(`/api/advisory/commenttemplate/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadCommentTemplate(params) {
  return request(`/api/advisory/commenttemplate/`+params['id']);
}

export async function queryCommentTemplateBase(params) {
return request(`/api/advisory/commenttemplate/base/`);
}
