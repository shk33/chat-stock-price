const amqp = require('amqplib/callback_api');
const { CONN_URL, CONSULTING_STOCK_QUEUE } = require('../config/rabbitmq');

amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    ch.consume(CONSULTING_STOCK_QUEUE, function (msg) {
      console.log('.....');
      setTimeout(function(){
        console.log("Message:", msg.content.toString());
      },4000);
      },{ noAck: true }
    );
  });
});