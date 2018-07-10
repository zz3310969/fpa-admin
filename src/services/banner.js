import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryBanner(params) {
  return request(`/api/fpa/banner?${stringify(params)}`);
}

export async function addBanner(params) {
  return request('/api/fpa/banner', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateBanner(params) {
  return request('/api/fpa/banner/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeBanner(params) {
  return request(`/api/fpa/banner/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadBanner(params) {
  return request(`/api/fpa/banner/`+params['id']);
}

export async function queryBannerBase(params) {
return request(`/api/fpa/banner/base/`);
}
