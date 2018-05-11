const dbSession = require('../dbConnection');

function createTableToday() {
    var createTable = "CREATE TABLE IF NOT EXISTS users(users_id int(11) NOT NULL AUTO_INCREMENT,"
        + "userName varchar(20) DEFAULT NULL," + "userEmail varchar(50) DEFAULT NULL," + "userAddress varchar(20) DEFAULT NULL," + "userContact varchar(20) DEFAULT NULL,"
        + "userSender varchar(20) DEFAULT NULL,"+ "PRIMARY KEY (users_id)) ENGINE=InnoDB DEFAULT CHARSET=latin1";

    dbSession.getDBSession().query(createTable, function (err, res) {
        if (!err) {
            console.log("Table created successfully.");
        } else {
            console.log("Error occured to create Table.");
        }
    });
}

function getUsers() {
    return new Promise((resolve, reject) => {
        dbSession.getDBSession().query("select * from users", function (err, rows) {
            if (!err) {
                resolve(rows);
            } else {
                reject(err.message);
            }
        });
    });
}

function saveUser(userObject) {
    return new Promise((resolve, reject) => {
        dbSession.getDBSession().query("INSERT INTO users (userName, userEmail, userAddress, userContact, userSender) VALUES (?,?,?,?,?)", [userObject.userName, userObject.userEmail, userObject.userAddress, userObject.userContact, userObject.userSender], function (err, rows) {
            if (!err) {
                resolve(userObject);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    getUsers: getUsers,
    saveUser: saveUser,
    createTable: createTableToday
};