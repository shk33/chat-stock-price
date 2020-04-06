const CONSULTING_STOCK_URL = 'https://stooq.com';
const { getStockIdFromMessage } = require('./message');
const { CONSULTING_STOCK_QUEUE } = require('../config/rabbitmq');
const  { publishToQueue } = require('./mqservice');
const axios = require('axios');

const createConsultUrl = (stockId) => {
    return `${CONSULTING_STOCK_URL}/q/l/?s=${stockId}&f=sd2t2ohlcv&h&e=csv`;
}

const putConsultStockCommand = (message, user) => {
    const stockId = getStockIdFromMessage(message);
    const url = createConsultUrl(stockId);
    publishToQueue(CONSULTING_STOCK_QUEUE, {stockId, user})
};

const consultStock = async(stockId) => {
    const url = createConsultUrl(stockId);
    console.log(url)
    try {
        const result = await axios.get(url);
        console.log(result.data)
        console.log(typeof result.data)
        return result;
    } catch (error) {
        throw new Error('Failed to get stock price');
    }
};

module.exports = { putConsultStockCommand, consultStock }