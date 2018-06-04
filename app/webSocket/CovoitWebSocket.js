import LOGGER from '../utils/logger';

export default class CovoitWebSocket {

    connectedUsers = [];
    ws = null;

    constructor(ws) {
        LOGGER.info("registering WebSocket");
        this.ws = ws;

        ws.on('connection', this.onConnection.bind(this));

        ws.broadcast = this.broadcast.bind(this);
    }

    onConnection(ws) {
        LOGGER.debug('WebSocket connected');
        ws.on('message', this.onMessage.bind(this));
    }

    onMessage(message) {
        LOGGER.debug('WebSocket onMessage');
        if (message.startsWith('register:')) {
            this.connectedUsers.push(message.split(':')[1]);
        }
    }

    broadcast(view) {
        LOGGER.debug("WebSocket Broadcasting", view);
        this.ws.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(view));
            }
        });
    }

}