const CONSULTING_STOCK_URL = 'https://stooq.com';
const { getStockIdFromMessage } = require('./message');
const { CONSULTING_STOCK_QUEUE } = require('../config/rabbitmq');
const  { publishToQueue } = require('./mqservice');
const { parseCSVfromString } = require('../helpers/csv');
const axios = require('axios');

const createConsultUrl = (stockId) => {
    return `${CONSULTING_STOCK_URL}/q/l/?s=${stockId}&f=sd2t2ohlcv&h&e=csv`;
}

const getStockInfoFromCsvString = (csvString) => {
    const parsed = parseCSVfromString(csvString);
    const symbols = parsed[0];
    const values = parsed[1];

    const indexOfOpen = symbols.indexOf('Open');
    const openValue = values[indexOfOpen];

    const indexOfSymbol = symbols.indexOf('Symbol');
    const symbolValue = values[indexOfSymbol];

    if(openValue === 'N/D'){
        throw new Error();
    }

    return {price: openValue, symbol: symbolValue };
};

const putConsultStockCommand = (message, user) => {
    const stockId = getStockIdFromMessage(message);
    const url = createConsultUrl(stockId);
    publishToQueue(CONSULTING_STOCK_QUEUE, {stockId, user})
};

const consultStock = async(stockId) => {
    const url = createConsultUrl(stockId);
    try {
        const result = await axios.get(url);
        const price = getStockInfoFromCsvString(result.data)
        return price;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to get stock price');
    }
};

module.exports = { putConsultStockCommand, consultStock }