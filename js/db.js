var mysql = require('mysql');
var settings = require('../js/settings');

exports.executeSQL = function (sql, callback)
{
    var con = new mysql.createConnection(settings.dbConfig);
    
    con.connect(function(err) 
	{
        if (err) 
        {
            callback(null, err);
            //throw err;
        }
        if (settings.servConfig.debug){console.log("Connected!");}
        con.query(sql, function (err, result) {
          if (err) 
          {
            callback(null, err);
            //throw err;
          }
		  if (settings.servConfig.debug){console.log("Sentencia Ejecutada:"+sql);}
          callback(result);
		  
		  con.end();
        });
    });
};

exports.executeSQLarray = function (sql, array, callback)
{
	var con = new mysql.createConnection(settings.dbConfig);
    
    con.connect(function(err) 
	{
        if (err) 
        {
            callback(null, err);
            //throw err;
        }
        if (settings.servConfig.debug){console.log("Connected!");}
        con.query(sql, array, function (err, result) {
          if (err) 
          {
            callback(null, err);
            //throw err;
          }
          if (settings.servConfig.debug){console.log("Sentencia Ejecutada:"+sql);}
          callback(result);
		  
		  con.end();
        });
    });
}