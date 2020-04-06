const CONSULTING_STOCK_URL = 'https://stooq.com';
const { getStockIdFromMessage } = require('./message');
const { CONSULTING_STOCK_QUEUE } = require('../config/rabbitmq');
const  { publishToQueue } = require('mqservice');

const createConsultUrl = (stockId) => {
    return `${CONSULTING_STOCK_URL}/q/l/?s=${stockId}&f=sd2t2ohlcv&h&e=csv`;
}

const consultStockPrice = (message, user) => {
    const stockId = getStockIdFromMessage(message);
    const consultUrl = createConsultUrl(stockId);
    publishToQueue(CONSULTING_STOCK_QUEUE, {url, user})
};

module.exports = { consultStockPrice } 