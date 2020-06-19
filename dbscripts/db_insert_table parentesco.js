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
  var sql = "INSERT INTO parentesco (id, descripcion) VALUES ?";

  //Make an array of values:
  var values = [
			[1, "N/A"],
			[2, "Amigo/a"],
			[3, "Conocido/a"],
			[4, "Esposo/a"],
			[5, "Hermano/a"],
			[6, "Hijo/a"],
			[7, "Madre"],
			[8, "Nieto/a"],
			[9, "Padre"],
			[10, "Primo/a"],
			[11, "Tio/a"],
			[12, "Vecino/a"]
  ];
  //Execute the SQL statement, with the value array:
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
