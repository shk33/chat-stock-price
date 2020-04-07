class SocketAccesor {
    constructor(ioInstance) {
        this.io = ioInstance;
    }
    
    getSocktetInstance(){
        return this.io;
    }
}

class Singleton {
    constructor(ioInstance) {
        if (!Singleton.instance) {
            Singleton.instance = new SocketAccesor(ioInstance);
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;