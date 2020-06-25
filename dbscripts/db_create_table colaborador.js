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
  var sql = " CREATE TABLE colaborador (" + 
					" codigo char(8) PRIMARY KEY, " +
					" id_institucion VARCHAR(10) NOT NULL, " +
					" nombre VARCHAR(30) NOT NULL, " +
					" apellido VARCHAR(30) NOT NULL, " +
					" telefono VARCHAR(8) NOT NULL, " +
					" correo VARCHAR(40) NOT NULL, " +
					" id_tipo_documento int(3) NOT NULL, " +
					" documento VARCHAR(20) NOT NULL " +
					" ) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
