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
  var sql = " CREATE TABLE med_paciente (" + 
  					" id_paciente VARCHAR(9) NOT NULL, " +
					" id_medicamento VARCHAR(10) NOT NULL, " +
					" observacion VARCHAR(80), " +
					" PRIMARY KEY (id_paciente, id_medicamento) " +
					" ) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
