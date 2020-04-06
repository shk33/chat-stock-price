const amqp = require('amqplib/callback_api');
const { CONN_URL, CONSULTING_STOCK_QUEUE } = require('../config/rabbitmq');
const { consultStock } = require('../services/stock');
const { publishMessage, publishAndSaveMessage } = require('../services/message');

const init = () => {
    console.log('Start Stock Worker');
    
    amqp.connect(CONN_URL, function (err, conn) {
        conn.createChannel(function (err, ch) {
            ch.consume(CONSULTING_STOCK_QUEUE, function (msg) {
                console.log('.....');
                console.log(msg);
                const msgString = msg.content.toString();
                const payload = JSON.parse(msgString);
    
                consultStock(payload.stockId)
                .then(response => {
                    const { symbol, price } = response;
                    publishAndSaveMessage(`${symbol} quote is ${price} per share`, payload.user);
                })
                .catch(error => {
                    publishMessage(`Failed to get ${payload.stockId} stock info. Could be invalid sotck symbol or service is unavailable.`, payload.user);
                });
    
                },{ noAck: true }
            );
        });
    });
}

module.exports = { init };