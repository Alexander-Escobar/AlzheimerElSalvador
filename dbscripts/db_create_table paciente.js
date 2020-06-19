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
  var sql = " CREATE TABLE paciente (" + 
					" carnet varchar(9) NOT NULL, " +
					" nombre VARCHAR(30) NOT NULL, " +
					" apellido VARCHAR(30) NOT NULL, " +
					" id_cuidador varchar(9) NOT NULL, " +
					" id_pais VARCHAR(3) NOT NULL, " +
					" id_departamento int(3) NOT NULL, " +
					" id_profesion VARCHAR(2) , " +
					" id_parentesco VARCHAR(2) , " +
					" edad_medicacion int(2) , " +
					" fec_nacimiento date , " +
					" medicacion VARCHAR(300)  " +
					" ) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

