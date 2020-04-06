const isMessageStockCommand = (message) => {
    let isCommand = false;

    if(message.startsWith('/stock=')){
        isCommand = true;
    }

    return isCommand;  
};

module.exports = { isMessageStockCommand }