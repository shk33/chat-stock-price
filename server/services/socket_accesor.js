class SocketAccesor {
    constructor(ioInstance) {
        console.log('Inside Socket accesor instance');
        this.io = ioInstance;
        console.log(ioInstance);
    }
    
    getSocktetInstance(){
        console.log('Inside getSocketInstance');
        console.log(this.io)
        return this.io;
    }
}

class Singleton {
    constructor(ioInstance) {
        console.log('Printing Singleton Instance')
        console.log(Singleton.instance)
        if (!Singleton.instance) {
            console.log('Creating Singleton')
            Singleton.instance = new SocketAccesor(ioInstance);
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;