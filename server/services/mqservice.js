import amqp from 'amqplib/callback_api';
const CONN_URL = 'amqp://wdkddtqi:dCKERUaoeOlsJ8xgZDjwrZEXogbBkMnr@shark.rmq.cloudamqp.com/wdkddtqi';

let ch = null;

amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, channel) {
      ch = channel;
   });
});

export const publishToQueue = async (queueName, data) => {
   ch.sendToQueue(queueName, new Buffer(data));
}

process.on('exit', (code) => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});