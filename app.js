var http = require('http');
var httpMsgs = require('./js/httpmsgs');
var settings = require('./js/settings');
var Manager = require('./controller/manager');
var fs = require('fs'); //fileSystem
var qs = require('querystring');

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
                //
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
						case "jpg":
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

			switch(l_path[1])
			{
				//case "root":
				//	Manager.GetHomeSearch(req, resp);
				//break;

				//case "login":
				//	Manager.GetLogin(req, resp);
				//break;
				//
				//case "register":
				//	Manager.GetRegister(req, resp);
				//break;
					
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
