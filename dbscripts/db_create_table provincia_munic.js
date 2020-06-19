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
  var sql = " CREATE TABLE provincia_munic (" + 
					" id_pais char(3) NOT NULL, " +
					" id_ciudad int(3) NOT NULL, " +
					" id int(3) NOT NULL, " +
					" descripcion_provincia varchar(40) NOT NULL, " +
					" PRIMARY KEY (id_pais, id_ciudad, id) " +
					" ) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
