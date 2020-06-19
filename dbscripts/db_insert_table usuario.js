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
  //Make SQL statement:
  var sql = "INSERT INTO usuario (correo, nombre, apellido, password, perfil) VALUES ?";

  //Make an array of values:
  var values = [
			["alexander.enrique.escobar@gmail.com", "Alexander", "Escobar", "5b56707735bed7117162b252685a19a1", "admin"]//,
			//["karen.penate@ues.edu.sv", "Karen", "Peñate", "5b56707735bed7117162b252685a19a1", "admin"]
			//["test@ues.edu.sv", "Karen", "Peñate", "operador"]
  ];
  //Execute the SQL statement, with the value array:
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
