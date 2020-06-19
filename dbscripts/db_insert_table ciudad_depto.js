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
  var sql = "INSERT INTO ciudad_depto (id_pais, id, descripcion_ciudad) VALUES ?";

  //Make an array of values:
  var values = [
				["SLV", 1, 	"Ahuachapán" ],
				["SLV", 2, 	"Cabañas" ],
				["SLV", 3, 	"Chalatenango" ],
				["SLV", 4, 	"Cuscatlán" ],
				["SLV", 5, 	"La Libertad" ],
				["SLV", 6, 	"Morazán" ],
				["SLV", 7, 	"La Paz" ],
				["SLV", 8, 	"Santa Ana" ],
				["SLV", 9, 	"San Miguel" ],
				["SLV", 10,	"Sonsonate" ],
				["SLV", 11,	"San Salvador" ],
				["SLV", 12,	"San Vicente" ],
				["SLV", 13,	"La Unión" ],
				["SLV", 14,	"Usulután" ]
  ];
  //Execute the SQL statement, with the value array:
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
