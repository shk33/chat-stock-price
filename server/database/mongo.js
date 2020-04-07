const mongoose = require('mongoose');
const { CONN_URI } = require('../config/mongo');

const getMongooseParams = () => {
    mongoUri = CONN_URI;
    mongooseConfig = {
        useNewUrlParser: true,
    };
  
  return {
    mongoUri,
    mongooseConfig,
  };
};

const connect = () => {
    const { mongoUri, mongooseConfig } = getMongooseParams();
    mongoose.connect(mongoUri, mongooseConfig)
    .then(() => {
        console.log('Database connected')
    }).catch((err) => {
        console.log(err);
        process.exit(1);
    });
};

const disconnect = () => {
    mongoose.disconnect();
};

module.exports = {
  connect,
  disconnect,
};
