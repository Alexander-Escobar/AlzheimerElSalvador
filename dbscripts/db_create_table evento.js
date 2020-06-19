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
  var sql = "CREATE TABLE evento (" +
			"id int PRIMARY KEY, " +
			"titulo VARCHAR(100) NOT NULL, " +
			"fec_evento date NOT NULL, "+
			"hora_ini time , "+
			"hora_fin time , "+
			"direccion varchar(200) NOT NULL, "+
			"dir_longitud varchar(30) , "+
			"dir_latitud varchar(30) , "+
			"costo float(7,2) NOT NULL, "+
			"informacion varchar(3000), "+
			"descripcion varchar(200), "+
			"imagen varchar(50))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});