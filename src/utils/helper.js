export function getLocalStorage(val) {
  return sessionStorage.getItem(val);
}


export function getLocalState(val) {
   let states = [{'code':1,'display':'����'},{'code':0,'display':'������'},];
  return states;
}


export function getLocalStatus(val) {
   let states = [{'code':1,'display':'��'},{'code':0,'display':'��'},];
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
