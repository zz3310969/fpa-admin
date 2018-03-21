import { stringify } from 'qs';

let websocket = undefined;
let url = undefined;
if(process.env.NODE_ENV == 'development'){
  url = testWsUrl;
}else{
  url = productionWsUrl;
}

//let url = 'ws://127.0.0.1:8181/roof-im/connect.ws';
var socketOpen = false;
var socketMsgQueue = [];
let token_ = undefined;
process.env.webscoketUrl;
console.log(process);
console.log();
console.log(process.env.NODE_ENV);

      
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
    msg.clientType='h5',
    websocket.send(JSON.stringify(msg));
  } else {
     socketMsgQueue.push(msg)
  }
}


export async function watchList(config, cb) {
	token_ = config.token
    const client = getWebsocket(url+`?token=`+token_);
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
    const websocket = getWebsocket(url+`?token=`+token_);
    //websocket.send(JSON.stringify({"clientType":"h5","requestType":"pullNotReceivedMessage","token":"zlt", "seq" : "1"}));
    sendSocketMessage({"clientType":"h5","requestType":"pullNotReceivedMessage","token":token_, "seq" : "1"});
}

export async function pullMessage(data) {
    console.log('pullMessage', data);
    const websocket = getWebsocket(url+`?token=`+token_);
    sendSocketMessage({"clientType":"h5","requestType":"pullMessage","offset" : 0, "seq" : "1",...data});
}


export function listen(action) {
	console.log('listen', action);
	getWebsocket(url+`?token=`+token_);
	
	websocket.onmessage = (event) => {
	    action(event.data);
  };
}

export async function querySession(data) {
    console.log('querySession', data);
    const websocket = getWebsocket(url+`?token=`+token_);
    sendSocketMessage({"clientType":"h5","requestType":"querySession","token":token_, "seq" : "1"});
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