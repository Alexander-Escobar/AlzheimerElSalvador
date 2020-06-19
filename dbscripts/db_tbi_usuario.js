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
  var sql = " DROP TRIGGER tbi_usuario; ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
	console.log(result);
  });
});


delimiter $$

CREATE TRIGGER tbi_usuario 
	BEFORE INSERT 
	ON usuario FOR EACH ROW 
BEGIN
	IF (NEW.password IS NULL) THEN
		SET NEW.password = MD5(MD5(NEW.correo));
	END IF;
END;

$$

delimiter ;
