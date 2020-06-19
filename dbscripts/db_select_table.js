var mysql      = require('mysql');
var settings = require('../js/settings');

var connection = mysql.createConnection({
  host     : settings.dbConfig.host,
  user     : settings.dbConfig.user,
  password : settings.dbConfig.password,
  database : settings.dbConfig.database
});

connection.connect(function(err) {
  if (err) throw err;
  var a_filter = '05';
  var l_sql = " select * from medicamento; ";
  connection.query(l_sql, function (err, result, fields) 
  {
    if (err) throw err;
    console.log(result);
  });
});
