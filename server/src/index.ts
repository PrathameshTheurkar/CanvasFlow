import {connection, server as WebSocketServer} from 'websocket';
import http from 'http';
import { IncomingMessages, SupportedMessage } from './messages/IncomingMessages';
import { UserManager } from './user/UserManager';
import { OutgoingMessage, SupportedMessage as OutgoingSupportedMessage } from './messages/outgoingMessages';
import { InMemoryStore } from './store/InMemoryStore';

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

const userManager = new UserManager();
const store = new InMemoryStore();

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin: string) {
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            // connection.sendUTF(message.utf8Data);
            requestHandler(connection, JSON.parse(message.utf8Data));
        }
    });
});


const requestHandler = (ws: connection, message: IncomingMessages) => {
    if(message.type == SupportedMessage.JOIN) {
        const {canvasId, userId, name} = message.payload;

        userManager.addUser(canvasId, userId, name, ws);

        const outgoingMessage: OutgoingMessage  = {
            type: OutgoingSupportedMessage.JOIN,
            payload: {
                canvasId,
                userId,
                name
            }
        }

        userManager.broadcast(canvasId, userId, outgoingMessage);
        
    } else if(message.type == SupportedMessage.DRAW) {
        const {canvasId, userId, prevX, prevY, x, y, name} = message.payload;

        store.addCursor(canvasId, userId, prevX, prevY, x, y, name);

        const outgoingMessage: OutgoingMessage = {
            type: OutgoingSupportedMessage.DRAW,
            payload: {
                canvasId,
                userId, 
                prevX,
                prevY,
                x,
                y,
                name
            }
        }

        userManager.broadcast(canvasId, userId, outgoingMessage);
    } else if(message.type == SupportedMessage.ERASE) {
        const {canvasId, userId, x, y} = message.payload;

        store.removeCursor(canvasId, userId, x, y);

        const outgoingMessage: OutgoingMessage = {
            type: OutgoingSupportedMessage.ERASE,
            payload: {
                canvasId,
                userId,
                x, 
                y
            }
        }

        userManager.broadcast(canvasId, userId, outgoingMessage);
    }
}