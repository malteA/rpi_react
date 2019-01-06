
const EventEmitter = require("events");
const wsEmitter = new EventEmitter();
const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;

let emitter;
let connectedClients = [];

const configureWs = (server) => {
    const wss = new WebSocketServer({ server });

    wss.broadcast = (data) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })
    }

    wss.on("connection", (ws, req) => {
        const ip = req.connection.remoteAddress;
        ws.send("gday mate");
        console.log(ip);
    });

    return wss;
}

const configureWsEmitter = (ws) => {
    wsEmitter.on("event", () => {
        ws.broadcast("hi from emitter");
        // ws.send("hi from emitter");
        console.log("A");
    });

    return wsEmitter;
}


exports.wsEmitter = (server) => {
    if (!server) {
        return emitter;
    }

    const ws = configureWs(server);
    emitter = configureWsEmitter(ws);

    return emitter;
};