import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCounselor(params) {
  return request(`/api/fpa/counselor?${stringify(params)}`);
}

export async function addCounselor(params) {
  return request('/api/fpa/counselor', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCounselor(params) {
  return request('/api/fpa/counselor/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCounselor(params) {
  return request(`/api/fpa/counselor/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadCounselor(params) {
  return request(`/api/fpa/counselor/`+params['id']);
}

export async function queryCounselorBase(params) {
return request(`/api/fpa/counselor/base/`);
}
