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
  var sql = " CREATE TABLE capacitacion (" + 
					" codigo char(8) PRIMARY KEY, " +
					" nombre VARCHAR(80) NOT NULL, " +
					" duracion int(3) NOT NULL, " +
					" descripcion VARCHAR(200) " +
					" ) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
