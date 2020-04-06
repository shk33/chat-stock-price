const amqp = require('amqplib/callback_api');
const { CONN_URL, CONSULTING_STOCK_QUEUE } = require('../config/rabbitmq');
const { consultStock } = require('../services/stock');

console.log('Start Stock Worker');

amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.consume(CONSULTING_STOCK_QUEUE, function (msg) {
            console.log('.....');
            console.log(msg);
            const msgString = msg.content.toString();
            const payload = JSON.parse(msgString);

            consultStock(payload.stockId).then(response => {
                // console.log(response)
            });

            },{ noAck: true }
        );
    });
});