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
  var sql = " CREATE TABLE ctrlasistencia (" + 
					" id int PRIMARY KEY AUTO_INCREMENT, " +
					" id_proyecto int NOT NULL, " +
					" id_colaborador char(8) NOT NULL, " +
					" fec_evento date NOT NULL, " +
					" hora_entrada time NOT NULL, " +
					" hora_salida time NOT NULL, " +
					" total_horas int(3) GENERATED ALWAYS AS (HOUR(TIMEDIFF(hora_entrada, hora_salida))) VIRTUAL " +
					" ) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
