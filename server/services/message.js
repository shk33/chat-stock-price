const STOCK_COMMAND = '/stock=';

const isMessageStockCommand = (message) => {
    let isCommand = false;

    if(message.startsWith(STOCK_COMMAND)){
        isCommand = true;
    }

    return isCommand;  
};

const getStockIdFromMessage = (message) => {
    const parts = message.split(STOCK_COMMAND);
    return parts[1];
}

module.exports = { isMessageStockCommand, getStockIdFromMessage }