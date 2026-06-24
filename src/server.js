import { WebSocket } from "ws";

function sendJson(socket,payload){
    if(socket.readyState!=WebSocket.OPEN) continue;//this will return
socket.send(JSON.stringify(payload))}


function broadcast(wss,payload){
    for(const client of wss.clients){
        if(client.readyState!= WebSocket.OPEN) return;// it have all active connections and send
        //send to all client which are online

        client.send(JSON.stringify(payload));
    }
}

export function attachwebSocketServer(server){
const wss = new WebSocketServer({ server, path: '/ws', maxPayload:
1024 * 1024 })//create new ws server uses same port for http and listens whenn http want to upgrade to ws /ws only
//req comes from this path are elegible rest are handled by http max size allowed nfor single message in ws

wss.on('connection',(socket)=>{
    sendJson(socket,{type:'welcome'});
    socket.on('error',console.error)
})


function broadcastMatchCreated(match){
broadcast(wss, { type: 'match_created', data: match });
} //This function broadcasts a match creation event to all connected WebSocket clients.

// Here's the breakdown:

// Takes a match parameter - receives match data (like match details, ID, teams, etc.)
// Calls broadcast(wss, ...) - sends a message to all active WebSocket connections
// Sends a JSON object with:
// type: 'match_created' - identifies the event type for clients
// data: match - includes the match details
//wss is our websocet server which is active we have to use it together

return {broadcastMatchCreated}
}
