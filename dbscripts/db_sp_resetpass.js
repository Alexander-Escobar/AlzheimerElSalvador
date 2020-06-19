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
  var sql = " DROP PROCEDURE IF EXISTS sp_resetpass; ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
	console.log(result);
  });
});


delimiter $$

CREATE PROCEDURE sp_resetpass(IN a_correo VARCHAR(50), IN a_pass VARCHAR(60), IN a_newpass VARCHAR(60))
BEGIN
	declare v_exist int;
	declare v_return varchar(7);

	SET v_return = "FAILURE";
	
	SELECT count(1)
	FROM usuario
	WHERE correo = a_correo 
		AND password = MD5(a_pass)
	INTO v_exist;
	
	if (v_exist > 0) then
		UPDATE usuario
			set password = MD5(a_newpass)
		WHERE correo = a_correo
			AND password = MD5(a_pass);
		
		SET v_return = "OK";
	end if;
	
	SELECT v_return;
END;
$$

delimiter ;

