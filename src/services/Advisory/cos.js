import { stringify } from 'qs';
import request from '../../utils/request';


export async function queryConfig(params) {
  return request(`/api/advisory/cos/config?${stringify(params)}`);
}

export async function querySign(params) {
  return request(`/api/advisory/cos/sign?${stringify(params)}`);
}
