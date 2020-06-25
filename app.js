// Generales
var http = require('http');
var fs = require('fs'); //fileSystem
var qs = require('querystring');

// Entorno de Trabajo
var httpMsgs = require('./js/httpmsgs');
var settings = require('./js/settings');

// Administracion
var Manager = require('./controller/manager');

// Sistema / Seguridad / Administracion
var Manager_Sys = require('./controller/mngr_sys');
var dbModel = require('./js/dbmodel');
var Manager_Api = require('./controller/mngr_api');

// Session
var url = require("url");
var SessionHandler = require('./js/sessionhandler.js').SessionHandler;
var sessionHandler = new SessionHandler();

ParsePath = function (a_req)
{
	var RequestURL = a_req.url.toLowerCase().trim();
	var domain;
	
	if (RequestURL == "/") 
	{domain = ["", "root"];}
	else
	{domain = RequestURL.split('/');}
	
	if (domain[0] == "") {domain[0] = "/";}
	
	return (domain);
}

var server = http.createServer(function (req, resp)
{
	var l_path = ParsePath(req);
	var userPath = '[a-zA-Z0-9._-]+';
	var fecha = new Date();
	var hora = fecha.getFullYear() + "/" + fecha.getMonth() + "/" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + ":" + fecha.getMilliseconds();

	console.log(hora + "> " + req.method.toUpperCase() + " : " + req.url);
	
	if (settings.servConfig.debug)
	{
		console.log(l_path[0]);
		console.log(l_path[1]);
		console.log(l_path[2]);
		console.log(l_path.length);
	}

	switch(req.method.toUpperCase())
	{
		case "GET":	//	GET
			// Read	
			// 200 (OK), list of customers. Use pagination, sorting and filtering to navigate big lists.  
			// 200 (OK), single customer. 404 (Not Found), if ID not found or invalid.
			switch(l_path[1])
			{
				case "root":	// "/"
					Manager.GetHome(req, resp);
				break;
				
				//case "boletin":		// Pagina del Boletin
				//	Manager.GetBoletin(req, resp);
				//break;
				
				case "boletin":
					if (l_path.length == 2)
					{Manager.GetBoletin(req, resp);}
					else
					{
						var l_userPath = '[a-zA-Z0-9._-]+';
						var path = new RegExp("/boletin/"+l_userPath);
						if (path.test(req.url))
						{
							Manager.GetPublicacion(l_path[2], req, resp);
						}
						else
						{httpMsgs.show404(req, resp);}
					}
					break;	// "/boletin"
				
				//case "evento":		// Pagina del Boletin
				//	Manager.GetBoletin(req, resp);
				//break;
				//
				//case "info":		// Pagina Estatica
				//	Manager.GetStaticPage(1, req, resp);
				//	break;
				//	
				case "politica":	// Pagina Estatica
					Manager.GetStaticPage(2, req, resp);
					break;
					
				//case "termserv":	// Pagina Estatica
				//	Manager.GetStaticPage(3, req, resp);
				//	break;
					
				case "donacion":		// Pagina Estatica
					Manager.GetStaticPage(4, req, resp);
					break;
					
				case "contacto":		// Pagina Estatica
					Manager.GetStaticPage(5, req, resp);
					break;
					
				//case "sitemap.xml":	// sitemap.xml
				//	Manager.GetSiteMap(req, resp);
				//	break;
				
				// rpt
				case "rpt":
					var l_userPath = '[a-zA-Z0-9._-]+';
					var path = new RegExp("/rpt/"+l_userPath);
					Manager_Sys.getRpt(req, resp, l_path[2], l_path[3]);
				break;

				// SYS
				case "sys":
				
				    var l_query = url.parse(req.url, true).query;
					var l_session = sessionHandler.getSession(req, resp);
					
					console.log(req.url)
					console.log(l_session);
					console.log(l_session.name)
					console.log(l_query.name)
				
					if (!l_session.name && l_query.name)
					{ l_session.name = l_query.name; }
					
					if (l_session.name)
					{ 
						// Start - Sesion Valida
						var l_userPath = '[a-zA-Z0-9._-]+';
						var path = new RegExp("/sys/"+l_userPath);
						var l_opc = "";
						if (path.test(req.url))
						{
							switch(req.url)
							{
								case '/sys/panel':
									Manager_Sys.getPanel(req, resp, l_session.perfil);
								break;
							
								case '/sys/logout':
									delete l_session.name;
									delete l_session.perfil;
									Manager.GetHome(req, resp);
								break;
								
								case '/sys/resetpass':
									Manager_Sys.getMttoRP(req, resp, l_session);
								break;
								
								default:
									for (var i=0; i < dbModel.models.tables.length; i++)
									{
										l_opc = dbModel.models.tables[i].name;
										
										console.log('sys default OPC - path');
										console.log(l_opc);
										console.log(l_path[2]);
										
										if (l_opc === l_path[2])
										{ 
											Manager_Sys.getMtto(req, resp, l_opc);
											break;
										}
										
										if (l_path[2].endsWith("_new") && l_opc === l_path[2].substring(0, l_path[2].length - 4))
										{ 
											Manager_Sys.getMtto_new(req, resp, l_opc);
											break;
										}
										
										if (l_path[2].endsWith("_edit") && l_opc === l_path[2].substring(0, l_path[2].length - 5))
										{ 
											Manager_Sys.getMtto_edit(req, resp, l_opc, l_path[3]);
											break;
										}
									}
								break;
							}
							
							
							
							
							//if (req.url === '/sys/panel')
							//{
							//	Manager_Sys.getPanel(req, resp, l_session.name);
							//}
							//else
							//{
							//	if (req.url === '/sys/logout')
							//	{
							//		delete l_session.name;
							//		Manager.GetHome(req, resp);
							//	}
							//	for (var i=0; i < dbModel.models.tables.length; i++)
							//	{
							//		l_opc = dbModel.models.tables[i].name;
							//		
							//		if (l_opc === l_path[2])
							//		{ Manager_Sys.getMtto(req, resp, l_opc); }
							//		
							//		if (l_path[2].endsWith("_new") && l_opc === l_path[2].substring(0, l_path[2].length - 4))
							//		{ Manager_Sys.getMtto_new(req, resp, l_opc); }
							//		
							//		if (l_path[2].endsWith("_edit") && l_opc === l_path[2].substring(0, l_path[2].length - 5))
							//		{ Manager_Sys.getMtto_edit(req, resp, l_opc, l_path[3]); }
							//	}
							//}
						}
						else
						{httpMsgs.show404(req, resp);}
					
						// End - Sesion Valida
					}
					else	// Sesion NO Autenticada
					{ Manager_Sys.getLogin(req, resp, l_session); }

					break;	//  "sys"

				
				case "api":
					if (req.url === '/api/categoria') 
					{
						Manager_Sys.getCategoriaList(req, resp);
					}
					break;
				
				case "favicon.ico":
					// Icon format	image/x-icon
					if (req.url === '/favicon.ico') 
					{
						var img = fs.readFileSync('./favicon.ico');
						resp.writeHead(200, 
										{"Content-Type": "image/x-icon",
										'Content-Length': Buffer.byteLength(img),
										'Cache-Control': settings.httpConfig.cache_control
										});
						
						resp.end(img,'binary');
						return;
					}
					break;
					
				case ".well-known":
					// security.txt	text/plain
					if (req.url === '/.well-known/security.txt')
					{
						var txtfile = fs.readFileSync('./security.txt');
						resp.writeHead(200,
										{"Content-Type": "text/plain",
										'Content-Length': Buffer.byteLength(txtfile),
										'Cache-Control': settings.httpConfig.cache_control
										});
						resp.end(txtfile,'utf-8');
						return;
					}
					else
					{ return; }
					break;
					
				case "robots.txt":
					// sitemap.xml
					if (req.url === '/robots.txt')
					{
						var txtfile = fs.readFileSync('./robots.txt');
						resp.writeHead(200, {"Content-Type": "text/plain"});
						resp.end(txtfile,'utf-8');
						return;
					}
					else
					{ return; }
					break;
					
				case "css":	// Cascading Style Sheets (CSS)
					httpMsgs.showResource(req, resp, "/css/", ".css", l_path[2], "text/css", "utf-8");
					break;
					
				case "js":	// JavaScript (ECMAScript)
					httpMsgs.showResource(req, resp, "/js/", ".js", l_path[2], "text/javascript", "utf-8");
					break;
				
				case "img":
				case "video":
				case "fonts":
					switch (l_path[2].substr(-3, 3))
					{
						case "mp4":
							httpMsgs.showResource(req, resp, "/" + l_path[1] + "/", ".mp4", l_path[2], "application/octet-stream", "utf-8");
							break;
						
						case "png":		// Image (.png)
							httpMsgs.showResource(req, resp, "/" + l_path[1] + "/", ".png", l_path[2], "application/octet-stream", "utf-8");
							break;
						
						case "peg":	// JPEG images (.jpeg / .jpg)
							httpMsgs.showResource(req, resp, "/" + l_path[1] + "/", ".jpeg", l_path[2], "image/jpeg", "utf-8");
							break;
							
						case "jpg": // JPEG images (.jpeg / .jpg)
							httpMsgs.showResource(req, resp, "/" + l_path[1] + "/", ".jpg", l_path[2], "image/jpeg", "utf-8");
							break;
						
						case "ff2":
							// Web Open Font Format (WOFF)
							httpMsgs.showResource(req, resp, "/fonts/", ".woff2", l_path[2], "font/woff2", "utf-8");
							break;
						
						case "off":
							// Web Open Font Format (WOFF)
							httpMsgs.showResource(req, resp, "/fonts/", ".woff", l_path[2], "font/woff", "utf-8");
							break;
						
						case "ttf":
							// TrueType Font
							httpMsgs.showResource(req, resp, "/fonts/", ".ttf", l_path[2], "font/ttf", "utf-8");
							break;
						
						case "eot":
							// Archive document (multiple files embedded)
							httpMsgs.showResource(req, resp, "/fonts/", ".eot", l_path[2], "application/octet-stream", "utf-8");				
							break;
					}
					break;	// img_prob, img, fonts

				default:
					console.log('GET default:'+req.url);
					httpMsgs.show404(req, resp);
					break;
					
			}
			break;	//"GET":


		case "POST":	//	POST
			//	Create	
			//	201 (Created), 'Location' header with link to /customers/{id} containing new ID.	
			//	404 (Not Found), 409 (Conflict) if resource already exists.
			console.log("POST: %s",req.url);
			
			switch(l_path[1])
			{
				//case "root":
				//	Manager.GetHomeSearch(req, resp);
				//break;

				case "sys":
					if (req.url === '/sys/login') 
					{
						var l_session2 = sessionHandler.getSession(req, resp);
						Manager_Sys.getLogin(req, resp, l_session2);
					}
				break;
				
				//case "register":
				//	Manager.GetRegister(req, resp);
				//break;
				
				case "api_remote":		// Api Remote Check
					Manager_Api.remote_check(req, resp, l_path[2]);
				break;
				
				case "api_ddl":		// Api Drop Down List
					//Manager_Sys.getCategoriaList(req, resp);
					Manager_Api.drop_down_list(req, resp, l_path[2]);
				break;
				
				case "api_resetpass":	// Api Reset Password
					Manager_Api.customMtto(req, resp, l_path[2]);
				break;
				
				// api
				case "api":
					var l_userPath = '[a-zA-Z0-9._-]+';
					var path = new RegExp("/api/"+l_userPath);
//					if (path.test(req.url))
//					{
//						for (var i=0; i < dbModel.models.tables.length; i++)
//						{
//							if (dbModel.models.tables[i].name === l_path[2])
//							{
//								//path = new RegExp("/api/"+l_path[2]+"/"+l_userPath);
								Manager_Api.postMtto(req, resp, l_path[2]);
//							}
//						}
//					}
//					else
//					{httpMsgs.show405(req, resp);}
					//httpMsgs.send200(req, resp);
				break;
					
				default:
					console.log('POST default:'+req.url);
					httpMsgs.show404(req, resp);
				break;
			}
		break;	//	POST


		case "PUT":	// PUT
			//	Update/Replace
			//	405 (Method Not Allowed), unless you want to update/replace every resource in the entire collection.
			//	200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.
			
			
			switch(l_path[1])
			{
				//case "root":
				//	Manager.GetHomeSearch(req, resp);
				//break;

				// api
				case "api":
					var l_userPath = '[a-zA-Z0-9._-]+';
					var path = new RegExp("/api/"+l_userPath);
//					if (path.test(req.url))
//					{
//						for (var i=0; i < dbModel.models.tables.length; i++)
//						{
//							if (dbModel.models.tables[i].name === l_path[2])
//							{
//								//path = new RegExp("/api/"+l_path[2]+"/"+l_userPath);
								Manager_Api.putMtto(req, resp, l_path[2]);
//							}
//						}
//					}
//					else
//					{httpMsgs.show405(req, resp);}
					//httpMsgs.send200(req, resp);
				break;
				
				default:
					console.log('PUT default:'+req.url);
					httpMsgs.show404(req, resp);
				break;
			}
			break; // PUT


		case "PATCH":	// PATCH
			//	Update/Modify
			//	405 (Method Not Allowed), unless you want to modify the collection itself.	
			//	200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.
			break;	// PATCH


		case "DELETE":	// Delete
			//	Delete
			//	405 (Method Not Allowed), unless you want to delete the whole collection—not often desirable.
			//	200 (OK). 404 (Not Found), if ID not found or invalid.
			
			switch(l_path[1])
			{
				//case "root":
				//	Manager.GetHomeSearch(req, resp);
				//break;
				
				// api
				case "api":
					var l_userPath = '[a-zA-Z0-9._-]+';
					var path = new RegExp("/api/"+l_userPath);
					if (path.test(req.url))
					{
						for (var i=0; i < dbModel.models.tables.length; i++)
						{
							if (dbModel.models.tables[i].name === l_path[2])
							{
//								//path = new RegExp("/api/"+l_path[2]+"/"+l_userPath);
								Manager_Api.deleteMtto(req, resp, l_path[2], l_path[3]);
							}
						}
					}
//					else
//					{httpMsgs.show405(req, resp);}
					//httpMsgs.send200(req, resp);
				break;


				default:
					console.log('DELETE default:'+req.url);
					httpMsgs.show404(req, resp);
				break;
			}
			break;	// Delete
			
        default:
			console.log('DEFAULT:'+req.url);
            httpMsgs.show405(req, resp);
            break;	// default
		
	}

    //resp.end();
}).listen(settings.servConfig.webPort, function()
{
    console.log("Empecé a escuchar en el puerto:" + settings.servConfig.webPort);
});
