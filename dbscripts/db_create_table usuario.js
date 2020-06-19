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
  var sql = " CREATE TABLE usuario (" + 
					" correo VARCHAR(50) PRIMARY KEY, " +
					" nombre VARCHAR(30) NOT NULL, " +
					" apellido VARCHAR(30) NOT NULL, " +
					" password VARCHAR(60) NOT NULL, " +
					" perfil VARCHAR(30) " +
					" ) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
