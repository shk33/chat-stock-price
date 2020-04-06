const CSV = require('csv-string');

const parseCSVfromString = (csvStr) => {
    const arr = CSV.parse(csvStr);
    console.log(arr);
    return arr;
};


module.exports = {parseCSVfromString}