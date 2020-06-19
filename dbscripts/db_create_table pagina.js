var mysql = require('mysql');
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
  var sql = "CREATE TABLE pagina_estatica (id int(3) PRIMARY KEY, " +
			"titulo VARCHAR(50) NOT NULL, " +
			"contenido varchar(6000))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});