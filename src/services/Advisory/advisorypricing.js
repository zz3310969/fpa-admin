import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryAdvisoryPricing(params) {
  return request(`/api/advisory/advisorypricing?${stringify(params)}`);
}

export async function addAdvisoryPricing(params) {
  return request('/api/advisory/advisorypricing', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateAdvisoryPricing(params) {
  return request('/api/advisory/advisorypricing/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeAdvisoryPricing(params) {
  return request(`/api/advisory/advisorypricing/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadAdvisoryPricing(params) {
  return request(`/api/advisory/advisorypricing/`+params['id']);
}

export async function queryAdvisoryPricingBase(params) {
return request(`/api/advisory/advisorypricing/base/`);
}
