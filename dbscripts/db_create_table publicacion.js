var mysql      = require('mysql');
var settings = require('../js/settings');

var con = mysql.createConnection({
  host     : settings.dbConfig.host,
  user     : settings.dbConfig.user,
  password : settings.dbConfig.password,
  database : settings.dbConfig.database
});
// Boletín Informativo de la Asociación
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE publicacion (id int PRIMARY KEY, " +
			"titulo VARCHAR(30) NOT NULL, " +
			"subtitulo VARCHAR(60), " +
			"publicado date NOT NULL, " +
			"url_imagen VARCHAR(30), " +
			"autor varchar(30), " +
			"introduccion varchar(500) NOT NULL, " +
			"tags varchar(50), " +
			"contenido varchar(6000))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
