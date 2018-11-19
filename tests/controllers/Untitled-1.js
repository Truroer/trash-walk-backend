const Sequelize = require('sequelize');

let connection;
const connect = () => {
    connection = Sequelize.connect('DB_URI');
}

module.exports = {
    connection,
    connect
}


const db = require('this-same-file');
db.connect()
db.connection
