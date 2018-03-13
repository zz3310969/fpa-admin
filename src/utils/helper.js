export function getLocalStorage(val) {
  var data = sessionStorage.getItem(val);
  return data;
}

export function getLocalStorageJson(val) {
  var data = sessionStorage.getItem(val);
  return JSON.parse(data);
}


export function getLocalState(val) {
   let states = [{'code':1,'display':'有效'},{'code':0,'display':'无效'},];
  return states;
}


export function getLocalStatus(val) {
   let states = [{'code':1,'display':'可用'},{'code':0,'display':'不可用'},];
  return states;
}



export const loop = (data, id,children) => {
    data.forEach((item, index, arr) => {
      if (item.id == id) {
        item.children = children;
        return ;
      }
      if (item.children) {
        loop(item.children, id, children);
      }
    });
    return data;
  };

export const loopDelete = (data, id) => {
    data.forEach((item, index, arr) => {
      if (item.id == id) {
        arr.splice(index,1);
        return ;
      }
      if (item.children) {
        loopDelete(item.children, id);
      }
    });
    return data;
  };
