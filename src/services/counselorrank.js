import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCounselorRank(params) {
  return request(`/api/fpa/counselorrank?${stringify(params)}`);
}

export async function addCounselorRank(params) {
  return request('/api/fpa/counselorrank', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCounselorRank(params) {
  return request('/api/fpa/counselorrank/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCounselorRank(params) {
  return request(`/api/fpa/counselorrank/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadCounselorRank(params) {
  return request(`/api/fpa/counselorrank/`+params['id']);
}

export async function queryCounselorRankBase(params) {
return request(`/api/fpa/counselorrank/base/`);
}
