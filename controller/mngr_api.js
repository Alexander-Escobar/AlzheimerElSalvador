/*
	Lista
	* function getCol
	* putMtto
	* postMtto
	* customMtto
	* deleteMtto
	* remote_check
	* drop_down_list
*/

var db = require('../js/db');
var httpMsgs = require('../js/httpmsgs');
var dbModel = require('../js/dbmodel');
var util = require('util');
var ServMail = require('../js/servmailer');

function getCol(item, index) 
{ return item.col; }

// Mantenimiento PUT Update/Replace
exports.putMtto = function (a_req, a_resp, a_entity)
{
	console.log("mngr_api putMtto");
	
	a_req.on('data', function(data) 
	{
		var jsonContent = JSON.parse(data.toString());
		
		for (var i=0; i < dbModel.models.tables.length; i++)
		{
			if (dbModel.models.tables[i].table === a_entity)
			{
				l_entity = dbModel.models.tables[i]; 
				var l_sql = " UPDATE " + l_entity.table + " SET ";
				var l_sql_where = [];
				var l_sql_val = [];
				
				for (j=0; j < l_entity.columns.length; j++)
				{ 
					
					switch (l_entity.columns[j].type)
					{
						case "int":
						case "float":
							if (!( l_entity.primary_key.includes(l_entity.columns[j].col)))
							{
								l_sql_val.push(l_entity.columns[j].col + "=" + jsonContent[l_entity.columns[j].col]);
							}
							else
							{
								l_sql_where.push(l_entity.columns[j].col + "=" + jsonContent[l_entity.columns[j].col]);
							}
						break;
						
						case "char":
						case "varchar":
						case "textarea":
						case "time":
						case "date":
							if (!( l_entity.primary_key.includes(l_entity.columns[j].col)))
							{
								l_sql_val.push(l_entity.columns[j].col + "= '" + jsonContent[l_entity.columns[j].col] + "' ");
							}
							else
							{
								l_sql_where.push(l_entity.columns[j].col + "= '" + jsonContent[l_entity.columns[j].col] + "' ");
							}
						break;
					}
				}
				
				l_sql = l_sql + l_sql_val + " WHERE " + l_sql_where.join(" and ");
				console.log(l_sql);
				
				db.executeSQL(l_sql, function(a_data, err)
				{
					if (err)
					{httpMsgs.show500(a_req, a_resp, err);}
					else
					{httpMsgs.sendJson(a_req, a_resp, "ok");}
				});
				
			}
		}
		
	})
}

// Mantenimiento POS Insert/Create
exports.postMtto = function (a_req, a_resp, a_entity)
{
	console.log("mngr_api postMtto");
	
	a_req.on('data', function(data) 
	{
		var jsonContent = JSON.parse(data.toString());
		
		if (a_entity === 'resetpass')
		{
			var l_sentence = "";
			l_sentence = " call sp_resetpass('" + jsonContent["correo"] + "', '" + jsonContent["password"] + "', '" + jsonContent["newpassword"] + "');"
			
			db.executeSQL(l_sentence, function(a_data, err)
			{
				if (err)
				{httpMsgs.show500(a_req, a_resp, err);}
				else
				{httpMsgs.sendJson(a_req, a_resp, "ok");}
			});
		}
		else
		{
			for (var i=0; i < dbModel.models.tables.length; i++)
			{
				if (dbModel.models.tables[i].table === a_entity)
				{
					l_entity = dbModel.models.tables[i]; 
					var l_sql = " INSERT INTO " + l_entity.table ;
					var l_sql_col = l_entity.columns.map(getCol).toString();
					var l_sql_val = [];
					
					for (j=0; j < l_entity.columns.length; j++)
					{ 
						switch (l_entity.columns[j].type)
						{
							case "int":
							case "float":
								l_sql_val.push(jsonContent[l_entity.columns[j].col]);
							break;
							
							case "char":
							case "varchar":
							case "textarea":
							case "time":
							case "date":
								if (l_entity.columns[j].hasOwnProperty('treatIns'))
								{ l_sql_val.push( l_entity.columns[j].treatIns.replace("?", jsonContent[l_entity.columns[j].col])); }
								else
								{ l_sql_val.push("'" + jsonContent[l_entity.columns[j].col] + "'"); }
							break;
						}
					}
					
					l_sql = l_sql + " (" + l_sql_col + ") VALUES (" + l_sql_val + ")";
					
					db.executeSQL(l_sql, function(a_data, err)
					{
						if (err)
						{httpMsgs.show500(a_req, a_resp, err);}
						else
						{
							httpMsgs.sendJson(a_req, a_resp, "ok");
							
							if (l_entity.hasOwnProperty('after_insert'))
							{
								var mensaje = {email:jsonContent["correo"], subject:jsonContent["apellido"] +', '+ jsonContent["nombre"]}; 
								ServMail.SSend(mensaje);
							}
						}
					});
					
				}
			}
		}
		
	})
}

// Mantenimiento Custom/Personalizado
exports.customMtto = function (a_req, a_resp, a_id)
{
	var l_entity = null;
	
	console.log("mngr_api customMtto");
	console.log(a_id);
	
	var l_sentence = "";
	l_sentence = " call sp_fresetpass('" + a_id + "');"
		
	db.executeSQL(l_sentence, function(a_data, err)
	{
		if (err)
		{httpMsgs.show500(a_req, a_resp, err);}
		else
		{
			httpMsgs.sendJson(a_req, a_resp, "ok");
			var mensaje = {email:a_id, subject:''}; 
			ServMail.SSend(mensaje, 1);
		}
	});
}

// Mantenimiento DELETE
exports.deleteMtto = function (a_req, a_resp, a_entity, a_id)
{
	var l_entity = null;
	
	console.log("mngr_api deleteMtto");

	for (var i=0; i < dbModel.models.tables.length; i++)
	{
		if (dbModel.models.tables[i].name === a_entity)
		{
			l_entity = dbModel.models.tables[i]; 
			var l_sql = l_entity.sql_delete;

			db.executeSQLarray(l_sql, [a_id], function(data, err)
			{
				if (err)
				{httpMsgs.show500(a_req, a_resp, err);}
				else
				{ httpMsgs.sendJson(a_req, a_resp, "ok");}
			});
		}
	}
}

// Validacion externa
exports.remote_check = function(a_req, a_resp, a_entity)
{
	var l_entity = null;
	var l_sql = "";
	
	console.log("mngr_api remote_check");
	
	a_req.on('data', function(data) 
	{
		console.log(a_entity);
		console.log(data.toString());
		
		for (var i=0; i < dbModel.models.tables.length; i++)
		{
			if (dbModel.models.tables[i].name === a_entity)
			{
				l_entity = dbModel.models.tables[i];
				var l_col = data.toString().replace("%40", "@").split("=")[0];	// .replace("%40", "@") eliminando la arroba
				var l_val = data.toString().replace("%40", "@").split("=")[1];
				var l_label = "";
				var l_valid = false;
				var l_message = "ok";
				var l_responder = [];
				
				for (var j=0; j < l_entity.columns.length; j++)
				{
					if (l_entity.columns[j].col === l_col)
					{
						if (l_entity.columns[j].hasOwnProperty('remote_check'))
						{ 
							l_sql = l_entity.columns[j].remote_check;
							l_label = l_entity.columns[j].label;
						}
					}
				}

				db.executeSQLarray(l_sql, [l_val], function(data, err)
				{
					if (err)
					{httpMsgs.show500(a_req, a_resp, err);}
					else
					{
						console.log(data);
						if (data[0].existe > 0)
						{ 
							valid = false; 
							message = "El valor para [" + l_label + "] ya existe";
							httpMsgs.sendJson(a_req, a_resp, {valid, message});
						}
						else
						{ valid = true;
						httpMsgs.sendJson(a_req, a_resp, {valid});}

						
					}
				});
			}
		}
	})
}

// Validacion externa, retorna lista de valores
exports.drop_down_list = function(a_req, a_resp, a_entity)
{
	var l_entity = null;
	var l_sql = "";
	
	console.log("mngr_api drop_down_list");
	
	a_req.on('data', function(data) 
	{
		console.log(a_entity);
		console.log(data.toString());
		
		for (var i=0; i < dbModel.models.tables.length; i++)
		{
			if (dbModel.models.tables[i].name === a_entity)
			{
				l_entity = dbModel.models.tables[i];
				//var l_col = data.toString().replace("%40", "@").split("=")[0];	// .replace("%40", "@") eliminando la arroba
				var l_val = data.toString().replace("%40", "@").split("=")[1];
				//var l_label = "";
				//var l_valid = false;
				//var l_message = "ok";
				//var l_responder = [];
				
				//console.log(l_col);
				console.log(l_val);
				
				for (var j=0; j < l_entity.columns.length; j++)
				{
					if (l_entity.columns[j].col === l_val)
					{
						if (l_entity.columns[j].hasOwnProperty('dropdownlist'))
						{ 
							l_sql = l_entity.columns[j].dropdownlist;
							//l_label = l_entity.columns[j].label;
						}
						
						if (l_entity.columns[j].hasOwnProperty('dropdownsearch'))
						{ 
							l_sql = l_entity.columns[j].dropdownsearch;
							//l_label = l_entity.columns[j].label;
						}
					}
				}

				db.executeSQLarray(l_sql, [l_val], function(data, err)
				{
					if (err)
					{httpMsgs.show500(a_req, a_resp, err);}
					else
					{httpMsgs.sendJson(a_req, a_resp, data);}
				});
			}
		}
	})
}

