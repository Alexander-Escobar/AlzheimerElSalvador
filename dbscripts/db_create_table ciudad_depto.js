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
  var sql = " CREATE TABLE ciudad_depto (" + 
  					" id_pais varchar(3) NOT NULL, " +
					" id int(3) NOT NULL, " +
					" descripcion_ciudad VARCHAR(20) NOT NULL, " +
					" PRIMARY KEY (id_pais, id) " +
					" ) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
