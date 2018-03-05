import { stringify } from 'qs';

let websocket = undefined;
let url = 'ws://127.0.0.1:8181/roof-im/connect.ws';
var socketOpen = false;
var socketMsgQueue = [];
function getWebsocket(url) {
    if (!websocket) {
        websocket = new WebSocket(url);
        websocket.onerror = OnSocketError;
        websocket.onclose = event => {
		    console.log('通道被关闭');
		    websocket = undefined;
		    socketOpen = false;
		};
		websocket.onopen = () => {
	      socketOpen = true
		  for (var i = 0; i < socketMsgQueue.length; i++){
		     sendSocketMessage(socketMsgQueue[i])
		  }
		  socketMsgQueue = []
	    };
	    
    }
    return websocket;
}

function sendSocketMessage(msg) {
	
  if (socketOpen) {

    websocket.send(JSON.stringify(msg));
  } else {
     socketMsgQueue.push(msg)
  }
}


export async function watchList(config, cb) {
    const client = getWebsocket(url+`?token=zlt`);
    
    // return client.onmessage = (data) => {
    //     cb(data);
    // };

    
}



function OnSocketError(ev){
	  console.log('Socket error:', data);
}

export async function send(data) {
    console.log('send', data);
    //websocket.send(JSON.stringify(data));
    sendSocketMessage(data);
}


export async function online(data) {
    console.log('online', data);
    //const websocket = getWebsocket(url+`?token=`+data.token);
    //websocket.send(JSON.stringify(data));
    sendSocketMessage(data);
}

export async function logout(config, code, reason) {
    const websocket = getWebsocket(config.url);
    websocket.close(code, reason);
}

export async function pullNotReceivedMessage(data) {
    console.log('pullNotReceivedMessage', data);
    const websocket = getWebsocket('');
    //websocket.send(JSON.stringify({"clientType":"h5","requestType":"pullNotReceivedMessage","token":"zlt", "seq" : "1"}));
    sendSocketMessage({"clientType":"h5","requestType":"pullNotReceivedMessage","token":"zlt", "seq" : "1"});
}

export async function pullMessage(data) {
    console.log('pullMessage', data);
    const websocket = getWebsocket('');
    sendSocketMessage({"clientType":"h5","requestType":"pullMessage","sender":'cde',"offset" : 0,"token":"zlt", "seq" : "1"});
}


export function listen(action) {
	console.log('listen', action);
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