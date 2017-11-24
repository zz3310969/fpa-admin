import { stringify } from 'qs';
import request from '../utils/request';

export async function queryActivity(params) {
  return request(`/api/vote/activity?${stringify(params)}`);
}

export async function addActivity(params) {
  return request('/api/vote/activity', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function updateActivity(params) {
  return request('/api/vote/activity', {
    method: 'PUT',
    body: {
      ...params
    },
  });
}

export async function removeActivity(params) {
  return request('/api/vote/activity', {
    method: 'DELETE',
    body: {
      ...params
    },
  });
}