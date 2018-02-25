import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryAdvisoryTheme(params) {
  return request(`/api/advisory/advisorytheme?${stringify(params)}`);
}

export async function addAdvisoryTheme(params) {
  return request('/api/advisory/advisorytheme', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateAdvisoryTheme(params) {
  return request('/api/advisory/advisorytheme/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeAdvisoryTheme(params) {
  return request(`/api/advisory/advisorytheme/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadAdvisoryTheme(params) {
  return request(`/api/advisory/advisorytheme/`+params['id']);
}

export async function queryAdvisoryThemeBase(params) {
return request(`/api/advisory/advisorytheme/base/`);
}
