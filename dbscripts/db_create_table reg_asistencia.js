var mysql      = require('mysql');
var settings = require('../js/settings');

var con = mysql.createConnection({
  host     : settings.dbConfig.host,
  user     : settings.dbConfig.user,
  password : settings.dbConfig.password,
  database : settings.dbConfig.database
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE reg_asistencia (" +
			" id_evento int NOT NULL, " +
			" id_tipo_documento int(3) NOT NULL, " +
			" documento VARCHAR(20) NOT NULL, " +
			" nombre VARCHAR(30) NOT NULL, " +
			" apellido VARCHAR(30) NOT NULL, " +
			" id_carnet varchar(9), " +
			" tarjeta varchar(20), " +
			" id_pais VARCHAR(3) NOT NULL, " +
			" id_departamento int(3) NOT NULL, " +
			" direccion varchar(100), " +
			" correo VARCHAR(40) NOT NULL, " +
			" telefono VARCHAR(8) NOT NULL, " +
			" comentario varchar(80), " +
			" PRIMARY KEY(id_evento, documento) " +
			" )";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});