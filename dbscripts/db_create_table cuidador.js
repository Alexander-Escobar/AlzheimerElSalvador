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
  var sql = " CREATE TABLE cuidador (" + 
					" carnet varchar(9) PRIMARY KEY, " +
					" nombre VARCHAR(30) NOT NULL, " +
					" apellido VARCHAR(30) NOT NULL, " +
					" id_pais VARCHAR(3) NOT NULL, " +
					" id_departamento int(3) NOT NULL, " +
					" direccion varchar(100), " +
					" correo VARCHAR(40) NOT NULL, " +
					" telefono VARCHAR(8) NOT NULL, " +
					" id_profesion VARCHAR(2) NOT NULL " +
					" ) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
