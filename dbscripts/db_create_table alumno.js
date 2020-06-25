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
  var sql = " CREATE TABLE alumno (" + 
					" id_capacitacion char(8) NOT NULL, " +
					" dui varchar(10) NOT NULL, " +
					" nombre VARCHAR(30) NOT NULL, " +
					" apellido VARCHAR(30) NOT NULL, " +
					" correo VARCHAR(40) NOT NULL, " +
					" id_pais VARCHAR(3) NOT NULL, " +
					" id_departamento int(3) NOT NULL, " +
					" direccion varchar(100), " +
					" PRIMARY KEY (id_capacitacion, dui) " +
					" ) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

