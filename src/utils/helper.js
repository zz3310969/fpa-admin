


export function getLocalStorage(val) {
  return sessionStorage.getItem(val);
}


export function getLocalState(val) {
   let states = [{'code':1,'display':'可用'},{'code':0,'display':'不可用'},];
  return states;
}