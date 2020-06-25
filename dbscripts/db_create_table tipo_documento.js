var mysql = require('mysql');
var settings = require('../js/settings');

var con = mysql.createConnection({
  host     : settings.dbConfig.host,
  user     : settings.dbConfig.user,
  password : settings.dbConfig.password,
  database:  settings.dbConfig.database
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = " CREATE TABLE tipo_documento (" + 
					" id int PRIMARY KEY AUTO_INCREMENT, " +
					" nombre VARCHAR(30) NOT NULL " +
					" ) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
