var config = {};

config.mongo = {};

config.mongo.host = process.env.MONGO_PORT_27017_TCP_ADDR;
config.mongo.port = process.env.MONGO_PORT_27017_TCP_PORT;
config.mongo.username = '';
config.mongo.password = '';
config.mongo.db = 'books';

module.exports = config;