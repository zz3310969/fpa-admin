import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryCommissionPricing(params) {
  return request(`/api/advisory/commissionpricing?${stringify(params)}`);
}

export async function addCommissionPricing(params) {
  return request('/api/advisory/commissionpricing', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateCommissionPricing(params) {
  return request('/api/advisory/commissionpricing/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeCommissionPricing(params) {
  return request(`/api/advisory/commissionpricing/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadCommissionPricing(params) {
  return request(`/api/advisory/commissionpricing/`+params['id']);
}

export async function queryCommissionPricingBase(params) {
return request(`/api/advisory/commissionpricing/base/`);
}
