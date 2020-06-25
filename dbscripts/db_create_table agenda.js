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
  var sql = " CREATE TABLE agenda (" + 
					" id int PRIMARY KEY AUTO_INCREMENT, " +
					" id_evento int NOT NULL, " +
					" descripcion VARCHAR(80) NOT NULL, " +
					" hora_ini time NOT NULL " +
					" ) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
