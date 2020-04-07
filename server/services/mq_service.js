const amqp = require('amqplib/callback_api');
const { CONN_URL } = require('../config/rabbitmq')

let ch = null;

amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
    });
});

const publishToQueue = async (queueName, data) => {
    console.log(JSON.stringify(data))
    ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
}

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});

module.exports = { publishToQueue };