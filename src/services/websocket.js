import { stringify } from 'qs';

let websocket = undefined;
function getWebsocket(url) {
    console.log('websocket client', websocket);
    if (!websocket) {
        websocket = new WebSocket(url);
        websocket.onerror = OnSocketError;
    }
    return websocket;
}

export async function watchList(config, cb) {
    const client = getWebsocket(config.url+`?token=zlt`);
    client.onopen = () => {
    	online('zlt');
        //client.send(JSON.stringify({type: 'login', ...config}));
    };
    // return client.onmessage = (data) => {
    //     cb(data);
    // };

    
}

function OnSocketError(ev){
	  console.log('Socket error:', data);
}

export async function send(data) {
    console.log('send', data);
    const websocket = getWebsocket('');
    websocket.send(JSON.stringify(data));
}


export async function online(token) {
    console.log('online', token);
    let parms = {"clientType":"h5","requestType":"online","token":token};
    const websocket = getWebsocket('');
    websocket.send(JSON.stringify(parms));
}

export async function logout(config, code, reason) {
    const websocket = getWebsocket(config.url);
    websocket.close(code, reason);
}

export async function pullNotReceivedMessage(data) {
    console.log('pullNotReceivedMessage', data);
    const websocket = getWebsocket('');
    websocket.send(JSON.stringify(data));
}


export function listen(action) {
	websocket.onmessage = (event) => {
	    action(event.data);
  };
}

export function listen1(cb) {
  ws.onopen = event => {
    console.log('connected');
    ws.send(Date.now());
  };

  ws.onclose = event => {
    console.log('disconnected');
  };

  ws.onerror = event => {
    console.log(event.data);
  };
  ws.onmessage = event => {

    console.log(`Roundtrip time: ${Date.now() - event.data} ms`);

    setTimeout(() => {
      ws.send(Date.now());
    }, 30000);

    cb(event.data);
  };
}