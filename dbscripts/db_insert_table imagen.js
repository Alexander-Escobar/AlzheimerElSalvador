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
  var sql = "INSERT INTO imagen (nombre, texto_alternativo, descripcion) VALUES ?";

  //Make an array of values:
  var values = [
			["stock-photo-78152441.jpg", "foto hombre en tono grises", "foto hombre en tono grises" ],
			["stock-photo-133415415.jpg", "foto anciana cara", "foto anciana cara con fondo negro" ],
			["ima1.jpg", "foto grupo ancianos", "foto grupo ancianos en el parque" ],
			["intro.png", "foto portada sitio", "foto portada cara con fondo negro" ]
  ];
  //Execute the SQL statement, with the value array:
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
