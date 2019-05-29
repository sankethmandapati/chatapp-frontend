import socketIoClient from 'socket.io-client';
import config from './config';

class Socket {
    constructor() {
        this.socketInstance = null;
        this.isConnected = false;
        this.messageListener = this.messageListener.bind(this);
        this.friendsChangeListener = this.friendsChangeListener.bind(this);
        this.emit = this.emit.bind(this);
    }
    connect(accessToken) {
        if(!this.isConnected) {
            this.socketInstance = socketIoClient(config.baseUrl, {
                query: {
                    token: accessToken
                }
            });
            this.isConnected = true;
        }
    }
    disconnect() {
        this.userDetails = {
            accessToken: '',
            userId: '',
            userName: ''
        };
        this.isConnected = false;
        this.socketInstance.close();
    }
    getInstance() {
        return this.socketInstance;
    }
    messageListener(fn) {
        console.log("listening for new messages..");
        this.socketInstance.on("message", async (msg) => {
            console.log("new message!: ", msg);
            fn(msg);
        });
    }
    friendsChangeListener(fn) {
        this.socketInstance.on('users-update', fn);
    }
    sendMessage(msg) {
        this.socketInstance.send(msg);
    }
    emit(eventName, data) {
        return new Promise((resolve, reject) => {
            this.socketInstance.emit(eventName, data, (res) => {
                if(!res.success) {
                    return reject(res.data);
                }
                return resolve(res.data);
            });
        });
    }
}
export default new Socket();