const CSV = require('csv-string');

const parseCSVfromString = (csvStr) => {
    const arr = CSV.parse(csvStr);
    return arr;
};


module.exports = {parseCSVfromString}