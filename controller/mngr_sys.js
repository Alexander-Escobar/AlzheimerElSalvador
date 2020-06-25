var db = require('../js/db');
var httpMsgs = require('../js/httpmsgs');
var dbModel = require('../js/dbmodel');
var confPanel = require('../js/confpanel');
var servRPT = require('../js/servrpt');
var dbModelRPT = require('../js/dbmodelrpt');

/*
	Gestiona y administra el BackEnd del Aplicativo, Contiene la logica para presentar al usuario los CRUD de los mantenimientos y el panel
	
	Listado
	* getLogin
	* getPanel		Panel del Sistema, muestra las opciones asociadas a un usuario
	* getMttoRP
	* getMtto		Grid del Mantenimiento
	* getMtto_new	Formulario de Creacion de registros
	* getMtto_edit	Formulario de Edicion de registros
	* getCategoriaList		** CREO QUE NO SE USA **
	* getRpt		Reporteador
*/

exports.getLogin = function(a_req, a_resp, a_arg)
{
	console.log("mngr_sys getLogin");
	switch(a_req.method.toUpperCase())
	{
		case "GET":
			httpMsgs.showLogin(a_req, a_resp, null);
		break;
		
		case "POST":
		
			var POST = {};
			a_req.on('data', function(data)
			{
				console.log("ingreso");
				data = data.toString();
				console.log(data);
				data = data.split('&');
				//console.log(data);
				
				for (var i = 0; i < data.length; i++) 
				{
					var _data = data[i].split("=");
					POST[_data[0]] = _data[1];
				}
				console.log(POST);
				
				var l_sql = "SELECT " +
						" U.correo, " +
						" U.nombre, U.apellido, " +
						" U.password, U.perfil " +
						" FROM usuario U " +
						" WHERE U.correo = ? " +
						"    and U.password = MD5(?) ";
				
				db.executeSQLarray(l_sql, [POST["inputEmail"].replace("%40", "@"), POST["inputPassword"]], function(data, err) //, 
				{
					//console.log(data);
					if (err)
					{ httpMsgs.show500(a_req, a_resp, "INGRESO NO ES POSIBLE");}
					else
					{ 
						if (data && data.length > 0)
						{ 
							a_arg.name = data[0].nombre;
							a_arg.correo = data[0].correo;
							a_arg.perfil = data[0].perfil;
							
							console.log("modificado");
							console.log(a_arg);
							exports.getPanel(a_req, a_resp, data[0].perfil);
						}
						else
						{ httpMsgs.showLogin(a_req, a_resp, a_arg);}
					}
				});
			})
			//httpMsgs.show500(a_req, a_resp, "nada");
		break;
	
	} // SWITCH
	return;
}

exports.getPanel = function(a_req, a_resp, a_arg)
{
	var l_confPanel = null;
	console.log("getPanel");

	for (var i=0; i < confPanel.menu.perfil.length; i++)
	{
		if (confPanel.menu.perfil[i].nombre === a_arg)
		{
			l_confPanel = confPanel.menu.perfil[i]; 
			httpMsgs.Mtto_panel(a_req, a_resp, l_confPanel);
		}
	}

	if (l_confPanel === null)
	{ httpMsgs.show500(a_req, a_resp, "El Usuario Posee un Perfil No identificado"); }
}

exports.getMttoRP = function (a_req, a_resp, a_arg)
{
	// getMttoResetPassword
	var l_entity = null;
	console.log("mngr_sys getMttoRP");
	console.log(a_arg);
	httpMsgs.Mtto_resetpass(a_req, a_resp, "data", a_arg);
}


exports.getMtto = function (a_req, a_resp, a_entity)
{
	var l_entity = null;
	
	for (var i=0; i < dbModel.models.tables.length; i++)
	{
		if (dbModel.models.tables[i].name === a_entity)
		{
			l_entity = dbModel.models.tables[i]; 
			var l_sql = l_entity.sql_select;

			db.executeSQL(l_sql, function(data, err)
			{
				if (err)
				{httpMsgs.show500(a_req, a_resp, err);}
				else
				{
					httpMsgs.MttoList(a_req, a_resp, data, l_entity);
					//MttoListDetail
				}
			});
		}
	}

	if (l_entity === null)
	{ httpMsgs.show500(a_req, a_resp, "Opcion de Mantenimiento NO encontrada"); }
}

exports.getMtto_new = function  (a_req, a_resp, a_entity)
{
	var l_entity = null;
	
	for (var i=0; i < dbModel.models.tables.length; i++)
	{
		if (dbModel.models.tables[i].name === a_entity)
		{
			l_entity = dbModel.models.tables[i]; 
			var l_sql = l_entity.sql_new;

			console.log("setencia %s:", l_sql);
			db.executeSQL(l_sql, function(data, err)
			{
				if (err)
				{httpMsgs.show500(a_req, a_resp, err);}
				else
				{httpMsgs.Mtto_new(a_req, a_resp, data, l_entity);}
			});
		}
	}

	if (l_entity === null)
	{ httpMsgs.show500(a_req, a_resp, "Opcion de Mantenimiento NO encontrada"); }
}

exports.getMtto_edit = function  (a_req, a_resp, a_entity, a_id)
{
	var l_entity = null;
	
	for (var i=0; i < dbModel.models.tables.length; i++)
	{
		if (dbModel.models.tables[i].name === a_entity)
		{
			l_entity = dbModel.models.tables[i]; 
			var l_sql = l_entity.sql_edit;
			
			console.log(l_sql);
			console.log(a_id);

			db.executeSQLarray(l_sql, [a_id], function(data, err)
			{
				if (err)
				{httpMsgs.show500(a_req, a_resp, err);}
				else
				{httpMsgs.Mtto_edit(a_req, a_resp, data, l_entity);}
			});
		}
	}

	if (l_entity === null)
	{ httpMsgs.show500(a_req, a_resp, "Opcion de Mantenimiento NO encontrada"); }
}

exports.getCategoriaList = function (a_req, a_resp)
{
	a_req.on('data', function(data) 
	{
		console.log(data.toString());
	});
	
	var l_sql = " SELECT P.iso3 as id, nombre FROM pais P ";
    db.executeSQL(l_sql, function(data, err)
    {
        if (err)
        {httpMsgs.show500(a_req, a_resp, err);}
        else
        {httpMsgs.sendJson(a_req, a_resp, data);}
    });
};

exports.getRpt = function(a_req, a_resp, a_entity, a_id)
{
	console.log("mngr_sys getRpt");
	
	var l_entity = null;
	
	for (var i=0; i < dbModelRPT.models.report.length; i++)
	{
		if (dbModelRPT.models.report[i].name === a_entity)
		{
			l_entity = dbModelRPT.models.report[i]; 
			var l_sql = l_entity.sql_select;

			db.executeSQLarray(l_sql, [a_id], function(data, err)
			{
				if (err)
				{httpMsgs.show500(a_req, a_resp, err);}
				else
				{
					servRPT.GetReport(a_req, a_resp, data, l_entity);
				}
			});
		}
	}

	if (l_entity === null)
	{ httpMsgs.show500(a_req, a_resp, "Opcion de Reporte NO encontrada"); }
}

