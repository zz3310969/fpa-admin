import { stringify } from 'qs';
import request from '../utils/request';

export async function queryTransmitTemplate(params) {
  return request(`/api/fpa/transmittemplate?${stringify(params)}`);
}

export async function addTransmitTemplate(params) {
  return request('/api/fpa/transmittemplate', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateTransmitTemplate(params) {
  return request('/api/fpa/transmittemplate/'+params['id'], {
    method: 'PUT',
    body: {
      ...params
    },
  });
}


export async function removeTransmitTemplate(params) {
  return request(`/api/fpa/transmittemplate/`+params['id'], {
    method: 'DELETE'
  });
}

export async function loadTransmitTemplate(params) {
  return request(`/api/fpa/transmittemplate/`+params['id']);
}
