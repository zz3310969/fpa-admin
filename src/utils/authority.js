// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  let a = JSON.parse(localStorage.getItem('antd-pro-authority')) || [];
  return a;
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', JSON.stringify(authority));
}

export function clearAuthority() {
  return localStorage.removeItem('antd-pro-authority');
}