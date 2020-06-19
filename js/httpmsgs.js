/*
	Listado de Paginas
	===========================
	sendJson
	GetHTML
	showHead
	showFooter
	showHome
	showBook
	showResource
	http 500		"Internal Error occurred"
	http 405		"Method Not supported"
	http 404		"NOT FOUND / Error Page"
	http 413		"Request Entity Too Large"
	http 200		"OK"

*/

var settings = require('../js/settings');
var qs = require("querystring");
var fs = require('fs'); //fileSystem
var BlackList = require('../js/session_blacklist');

var StringBuilder = require("stringbuilder");
StringBuilder.extend("string");

exports.sendJson = function(req, resp, data)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs sendJson");}
	
    resp.writeHead(200, {"Content-Type":"application/json"});
    if (data)
    {resp.write(JSON.stringify(data));}
    resp.end();
}

exports.GetHTML = function(a_sb_body, resp)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs GetHTML");}
	
	var html = new StringBuilder()
	, head = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end 
	, l_sb_NavBar = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end 
	, l_sb_Adds = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end
	//, l_sb_Footer = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end
	, l_sb_Analytics = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end
	;

	var initTag, endTag, attr;
 
	initTag = '<{0}>';
	endTag = '</{0}>';
	attr = '{0}="{1}"';

	exports.showHead(head);
	exports.showNabBar(l_sb_NavBar);
	exports.showAdds(l_sb_Adds, "A");
	//exports.showFooter(l_sb_Footer);
	exports.showAnalytics(l_sb_Analytics);
	
	// Creando la pagina HTML 
	html
		.appendLine('<!DOCTYPE html>')
		.appendLine('<html {0}>', attr.format('lang', 'en'))
		// <head>
		.appendLine(initTag.format('head'))
		.append(head)
		.appendLine(endTag.format('head'))
		// </head>
		
		// <body>
		.appendLine(initTag.format('body'))

		// SideBar
		.append(l_sb_NavBar)
		
		//	// <ADS A>
		//.append(l_sb_Adds)
		//	// </ADS A>

		// <Body Area>
		.append(a_sb_body)
		// </Body Area>

		//// Pie de Paginas
		////.append(l_sb_Footer)

		//// Analytics
		//.append(l_sb_Analytics)
		
		.appendLine(endTag.format('body'))					
		// </body>
		.append(endTag.format('html'));						// end HTML
 
	html.build(function(err, result)
	{
		if (err) return console.log("ERROR:" + err);
		resp.writeHead(200, {"Content-Type":"text/html"});
		resp.write(result)
		resp.end();
	});
}

exports.GetHTMLsys = function(a_sb_body, resp)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs GetHTML");}
	
	var html = new StringBuilder()
	, head = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end 
	, l_sb_NavBar = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end 
	, l_sb_Adds = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end
	, l_sb_Analytics = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end
	;

	var initTag, endTag, attr;
 
	initTag = '<{0}>';
	endTag = '</{0}>';
	attr = '{0}="{1}"';

	// [12]	flexdatalist			
	// [13] dataTables				
	// [14] dataTables, buttons		
	// [15] dataTables, select		
	// [16] Validetta / Validaciones
	// [33]	sweetalert.min.js Alertas			
	// [36]	flexdatalist						
	// [37] dataTables							
	// [38] dataTables / Button					
	// [39] dataTables / Select					
	// [40] dataTables / Export Flash			
	// [41] dataTables / Export jszip			
	// [42] dataTables / Export pdfmake			
	// [43] dataTables / Export vfs_fonts		
	// [44] dataTables / Export buttons html5	
	// [45] dataTables / Export buttons print	
	// [46] js Ctrl Values						
	// [47] js Get Values						
	// [48] Validetta / Validaciones			
	// [49] Validetta / validettaLang-es-ES

	exports.showHead(head, [0,1,2,3,4,5,7,8,9,10,30,31,32,35,37,13,14,38,15,39,40,41,42,43,44,45,33,46,47,48,16,49]);
	exports.showNabBar(l_sb_NavBar);
	exports.showAdds(l_sb_Adds, "A");
	exports.showAnalytics(l_sb_Analytics);
	
	// Creando la pagina HTML 
	html
		.appendLine('<!DOCTYPE html>')
		.appendLine('<html {0}>', attr.format('lang', 'en'))
		
		// <head>
		.appendLine(initTag.format('head'))
		.append(head)
		.appendLine('<style>')
		.appendLine('td.highlight {')
		.appendLine('background-color: whitesmoke !important;')
		.appendLine('}</style>')
		.appendLine(endTag.format('head'))
		// </head>
		
		// <body>
		.appendLine(initTag.format('body'))

		// SideBar
		.appendLine('<div class="bg-dark" >')
		.append(l_sb_NavBar)
		.appendLine('</div>')

		// <Body Area>
		.appendLine('    <div class="container">')
		.append(a_sb_body)
		.appendLine('    </div>')
		// </Body Area>
		
		.appendLine(endTag.format('body'))					
		// </body>
		.append(endTag.format('html'));						// end HTML
 
	html.build(function(err, result)
	{
		if (err) return console.log("ERROR:" + err);
		resp.writeHead(200, {"Content-Type":"text/html"});
		resp.write(result)
		resp.end();
	});
}

exports.showAdds = function(a_sb_adds, a_type)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs showAdds");}
	
	a_sb_adds
		.appendLine('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>')
		.appendLine('<!-- club_libro -->')
		.appendLine('<ins class="adsbygoogle"')
		.appendLine('     style="display:block"')
		.appendLine('     data-ad-client="ca-pub-7370990273406069"')
		.appendLine('     data-ad-slot="8320712499"')
		.appendLine('     data-ad-format="auto"></ins>')
		.appendLine('<script>')
		.appendLine('(adsbygoogle = window.adsbygoogle || []).push({});')
		.appendLine('</script>');
}

exports.showAnalytics = function(a_sb_string)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs showAnalytics");}
	
	a_sb_string
		.appendLine('<!-- Global site tag (gtag.js) - Google Analytics -->')
		.appendLine('<script async src="https://www.googletagmanager.com/gtag/js?id=UA-121296516-1"></script>')
		.appendLine('<script>')
		.appendLine('  window.dataLayer = window.dataLayer || [];')
		.appendLine('  function gtag(){dataLayer.push(arguments);}')
		.appendLine('  gtag("js", new Date());')
		.appendLine('')
		.appendLine('  gtag("config", "UA-121296516-1");')
		.appendLine('</script>');
}

exports.showHead = function(a_sb_head, a_include_head)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs Head");}
	
	var initTag, endTag, tag, attr, lorem;
	var Secue = [0,1,2,3,4,5,7,8,9,10,30,31,32,33];
	var ls_strng = '';
 
	if ( typeof(a_include_head) !== "undefined" && a_include_head !== null ) 
	{
		Secue = a_include_head;
	}
	//if ( some_variable != null ) {}
 
	initTag = '<{0}>';
	endTag = '</{0}>';
	tag = '{0}{{1}}{1}'.format(initTag, endTag);
	attr = '{0}="{1}"';
	
 	// Creando el Encabezado 
	a_sb_head
		// <!-- Meta -->
		.appendLine(tag.format('title', settings.Title))


		
		for (var i=0; i < Secue.length; i++)
		{
			ls_strng = '';
			
			//ls_strng = settings.httpConfig.headers[Secue[i]].type
			
			for (var j=0; j < settings.httpConfig.headers[Secue[i]].dataPair.length; j++)
			{
				ls_strng = ls_strng + " " + attr.format(settings.httpConfig.headers[Secue[i]].dataPair[j][0],settings.httpConfig.headers[Secue[i]].dataPair[j][1]);
			}
			
			switch(settings.httpConfig.headers[Secue[i]].type) 
			{
			  case "meta":
				tag = '<meta {0}>';
				break;
			  case "link":
				tag = '<link {0}>';
				break;
			  case "script":
				tag = '<script {0}></script>';
				break;
			  default:
				// code block
			}
			a_sb_head
				.appendLine(tag, ls_strng)
			
			//a_sb_head
			//.appendLine('<'+settings.httpConfig.headers[Secue[i]].type+' {0}>', attr.format('charset', 'UTF-8'))
			
			//if ( i == )
			//{
			//	settings.httpConfig.headers[i]
			//	
			//	if (a_metadata.columns[j].hasOwnProperty('remote_check'))
			//}
		}

	a_sb_head
		.appendLine('<!-- x -->')
		.appendLine('');
}

exports.showNabBar = function(a_sb_NavBar)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs showNabBar");}
	
	var l_sb_GooSearchNavBar = new StringBuilder({ newline: '\r\n\t' });

	initTag = '<{0}>';
	endTag = '</{0}>';
	attr = '{0}="{1}"';

	exports.GooSearch(l_sb_GooSearchNavBar);

	a_sb_NavBar
		.appendLine('<nav class="navbar navbar-expand-lg navbar-dark ">') // bg-dark
		.appendLine('  <span class="navbar-brand mb-0 h1 animated rotateIn"><img src="/img/avatar.png" width="25" height="25" class="d-inline-block align-top" alt="">Alzheimer<span class="badge badge-pill badge-secondary">El Salvador</span></span>')

		.appendLine('  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">')
		.appendLine('    <span class="navbar-toggler-icon"></span>')
		.appendLine('  </button>')
		.appendLine('')
		.appendLine('  <div class="collapse navbar-collapse" id="navbarColor02">')
		.appendLine('    <ul class="navbar-nav mr-auto">')
		.appendLine('      <li class="nav-item active">')
		.appendLine('        <a class="nav-link" href="/"><i class="fa fa-home" aria-hidden="true"></i> Home</a>')
		.appendLine('      </li>')
		.appendLine('      <li class="nav-item">')
		.appendLine('        <a class="nav-link" href="/boletin"><i class="fa fa-bullhorn" aria-hidden="true"></i> Boletin</a>')
		.appendLine('      </li>')
		//.appendLine('      <li class="nav-item">')
		//.appendLine('        <a class="nav-link" href="/evento"><i class="fa fa-calendar" aria-hidden="true"></i> Eventos</a>')
		//.appendLine('      </li>')
		.appendLine('      <li class="nav-item">')
		.appendLine('        <a class="nav-link" href="/donacion"><i class="fa fa-heart" aria-hidden="true"></i> Donaciones</a>')
		.appendLine('      </li>')
		.appendLine('      <li class="nav-item">')
		.appendLine('        <a class="nav-link" href="/contacto"><i class="fa fa-map-marker" aria-hidden="true"></i> Contáctanos</a>')
		.appendLine('      </li>')
		.appendLine('      <li class="nav-item">')
		.appendLine('        <a class="nav-link" target="_blank" href="https://www.facebook.com/Alzheimer-El-Salvador-256581527700226/"><i class="fa fa-facebook" aria-hidden="true"></i> Facebook</a>')
		.appendLine('      </li>')
		.appendLine('      <li class="nav-item">')
		.appendLine('        <a class="nav-link" target="_blank" href="https://www.youtube.com/channel/UC-9qz9aOLouMEmYMmS2Vw_g"><i class="fa fa-youtube" aria-hidden="true"></i> YouTube</a>')
		.appendLine('      </li>')
		.appendLine('    </ul>')
		.appendLine('	<div id="searchGoogle" class="collapse">')
		.append(l_sb_GooSearchNavBar)
		.appendLine('	</div>')
		.appendLine('	<button type="button" class="btn btn-dark" data-toggle="collapse" data-target="#searchGoogle" onclick="this.style.display = \'none\'"><i class="fa fa-search"></i></button>')

		.appendLine('  </div>')
		.appendLine('</nav>')
;
}

exports.showFooter = function(a_sb_bodyFooter)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs showFooter");}
	
	var l_sb_Adds = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end
	exports.showAdds(l_sb_Adds, "B");
	
	a_sb_bodyFooter
		.appendLine('<footer class="container-fluid text-center">')
		.append(l_sb_Adds)
		//.appendLine('		<!--=== Footer Version 1 ===-->')
		.appendLine('		<div class="footer-v1">')
		.appendLine('			<div class="footer">')
		.appendLine('				<div class="container">')
		.appendLine('					<div class="row">')
		.appendLine('						<!-- About -->')
		.appendLine('						<div class="col-md-4 md-margin-bottom-40">')
		.appendLine('							<div class="headline"><h2>Resolución.Club</h2></div>')
		.appendLine('							<a href="/"><img id="logo-footer" class="footer-logo" src="/img/32x32.png" alt="Resolución.Club"></a>')
		.appendLine('							<p>' + settings.Description + '</p>')
		.appendLine('						</div><!--/col-md-4-->')
		.appendLine('						<!-- End About -->')
		.appendLine('')
		.appendLine('						<!-- Link List -->')
		.appendLine('						<div class="col-md-4 md-margin-bottom-40">')
		.appendLine('							<div class="headline"><h2>Links Utiles</h2></div>')
		.appendLine('							<ul class="list-unstyled link-list">')
		.appendLine('								<li><i class="fa fa fa-home"></i> <a href="/">Home</a></li>')
		.appendLine('								<li><i class="fa fa-book"></i> <a href="/categoria">Categorias</a></li>')
		.appendLine('								<li><i class="fa fa-info"></i> <a href="/info">Información</a></li>')
		.appendLine('								<li><i class="fa fa-asterisk"></i> <a href="/politica">Politica de Privacidad</a></li>')
		.appendLine('								<li><i class="fa fa-asterisk"></i> <a href="/termserv">Terminos del Servicio</a></li>')
		.appendLine('							</ul>')
		.appendLine('						</div><!--/col-md-4-->')
		.appendLine('						<!-- End Link List -->')
		.appendLine('')
		.appendLine('						<!-- Address -->')
		.appendLine('						<div class="col-md-4 map-img md-margin-bottom-40">')
		.appendLine('							<div class="headline"><h2>Contáctanos</h2></div>')
		.appendLine('							<address class="md-margin-bottom-40">')
		.appendLine('								San Salvador, SS <br />')
		.appendLine('								El Salvador, Centro America <br />')
		.appendLine('								Email: <a href="mailto:info@Resolucion.Club" class="">info@Resolucion.Club</a>')
		.appendLine('							</address>')
		.appendLine('						</div><!--/col-md-4-->')
		.appendLine('						<!-- End Address -->')
		.appendLine('					</div>')
		.appendLine('				</div>')
		.appendLine('			</div><!--/footer-->')
		.appendLine('')
		.appendLine('			<div class="copyright">')
		.appendLine('				<div class="container">')
		.appendLine('					<div class="row">')
		.appendLine('						<div class="col-md-6">')
		.appendLine('							<p>' + settings.Rights_Reserved + ' | <a href="/politica">Politica de Privacidad</a> | <a href="/termserv">Terminos del Servicio</a>')
		.appendLine('							</p>')
		.appendLine('						</div>')
		.appendLine('')
		.appendLine('						<!-- Social Links -->')
		.appendLine('						<div class="col-md-6">')
		.appendLine('							<ul class="footer-socials list-inline">')
		.appendLine('								<li class="list-inline-item">')
		.appendLine('									<a href="http://facebook.com/Resolucion.Club" target="_blank" class="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook">')
		.appendLine('										<i class="fa fa-facebook"></i>')
		.appendLine('									</a>')
		.appendLine('								</li>')
		//.appendLine('								<li class="list-inline-item">')
		//.appendLine('									<a href="#" class="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Google Plus">')
		//.appendLine('										<i class="fa fa-google-plus"></i>')
		//.appendLine('									</a>')
		//.appendLine('								</li>')
		.appendLine('								<li class="list-inline-item">')
		.appendLine('									<a href="/info" class="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Info +">')
		.appendLine('										<i class="fa fa-info"></i>')
		.appendLine('									</a>')
		.appendLine('								</li>')
		.appendLine('							</ul>')
		.appendLine('						</div>')
		.appendLine('						<!-- End Social Links -->')
		.appendLine('					</div>')
		.appendLine('				</div>')
		.appendLine('			</div><!--/copyright-->')
		.appendLine('		</div>')
		//.appendLine('		<!--=== End Footer Version 1 ===-->')
		.appendLine('	</div><!--/End Wrapepr-->')
		.appendLine('</footer>')	
}

exports.showHome = function(a_req, a_resp, a_data)
{
    if (settings.servConfig.debug){console.log("Procesando HttpMsgs showHome");}

	//var sb = new StringBuilder({newline: "\r\n"});
	var l_block = new StringBuilder({ newline: '\r\n\t' }); // add a tab at the end
	var l_i = 0;

	if (a_data)
	{
		if (settings.servConfig.debug){console.log(a_data);}
		
		l_block
		.appendLine('<video id="bg-video" class="fullscreen-video" autoplay="autoplay" loop="loop" poster="' + settings.Image.pathbase + 'img/intro.png" muted>')
		.appendLine('	<source src="' + settings.Image.pathbase + 'video/intro.mp4" type="video/mp4">')
		.appendLine('</video>')
		.appendLine('  <aside class="sidebar moe">')
		.appendLine('  <header class="sidebar-header moe">')
		.appendLine('    <figure class="sidebar-avatar moe">')
		.appendLine('      <img class="sidebar-avatar-in" src="' + settings.Image.pathbase + 'img/avatar.png" />')
		.appendLine('      <img class="sidebar-avatar-logo moe" src="' + settings.Image.pathbase + 'img/logo_asociacion.png" />')
		.appendLine('    </figure>')
		.appendLine('    <div class="sidebar-title moe">Alzheimer | El Salvador</div>')
		.appendLine('  </header>')
		.appendLine('')
		
		// SideBar / Barra de Encabezado, Barra de Navegacion  
			.appendLine('  <nav class="sidebar-nav animated slideInDown" role="navigation">')
			.appendLine('    <ul>')
			.appendLine('      <li class="sidebar-nav-item moe">')
			.appendLine('        <i class="sidebar-nav-item-icon fa fa-bullhorn"></i><a class="sidebar-nav-item-zelda moe" href="/boletin">Boletin</a>')
			.appendLine('      </li>')
			//.appendLine('      <li class="sidebar-nav-item moe">')
			//.appendLine('        <i class="sidebar-nav-item-icon fa fa-calendar"></i><a class="sidebar-nav-item-zelda moe" href="/evento">Eventos</a>')
			//.appendLine('      </li>')
			.appendLine('      <li class="sidebar-nav-item moe">')
			.appendLine('        <i class="sidebar-nav-item-icon fa fa-heart"></i><a class="sidebar-nav-item-zelda moe" href="/donacion">Donaciones</a>')
			.appendLine('      </li>')
			.appendLine('      <li class="sidebar-nav-item moe">')
			.appendLine('        <i class="sidebar-nav-item-icon fa fa-map-marker"></i><a class="sidebar-nav-item-zelda moe" href="/contacto">Contáctanos</a>')
			.appendLine('      </li>')
			.appendLine('      <li class="sidebar-nav-item moe">') //active
			//.appendLine('        <i class="sidebar-nav-item-icon fa fa-facebook"></i><a class="sidebar-nav-item-zelda moe" href="https://www.w3schools.com">Facebook</a>')
			.appendLine('      </li>')
			.appendLine('      <li class="sidebar-nav-item moe">') //active
			.appendLine('        <i class="sidebar-nav-item-icon fa fa-facebook"></i><a class="sidebar-nav-item-zelda moe" target="_blank" href="https://www.facebook.com/Alzheimer-El-Salvador-256581527700226/">Facebook</a>')
			.appendLine('      </li>')
			.appendLine('      <li class="sidebar-nav-item moe">')
			.appendLine('        <i class="sidebar-nav-item-icon fa fa-youtube"></i><a class="sidebar-nav-item-zelda moe" target="_blank" href="https://www.youtube.com/channel/UC-9qz9aOLouMEmYMmS2Vw_g">YouTube</a>')
			.appendLine('      </li>')
			//.appendLine('      <li class="sidebar-nav-item moe">')
			//.appendLine('        <i class="sidebar-nav-item-icon fa fa-sign-out"></i><a class="sidebar-nav-item-zelda moe">Logout</a>')
			//.appendLine('      </li>')
			.appendLine('    </ul>')
			.appendLine('  </nav>')
		// SideBar fin
		.appendLine('')
		.appendLine('  <footer class="sidebar-footer">')
		.appendLine('    <span class="sidebar-footer-icon moe">···</span>')
		.appendLine('    <span class="sidebar-footer-label moe">· · ·</span>')
		.appendLine('  </footer>')
		.appendLine('</aside>')
		
			.appendLine('<main class="main moe">')
			.appendLine('  <span class="toggle">')
			.appendLine('    <!-- fa-angle-double-left fa-bars fa-th-list -->')
			.appendLine('    <i class="fa fa-bars"></i>')
			.appendLine('  </span>')
			.appendLine('')
			.appendLine('  <article class="content moe">')
			.appendLine('        <h1 class="logo animated rotateIn">Alzheimer<span class="badge badge-pill badge-secondary">El Salvador</span></h1>')
			
			.appendLine('        <div class="social hidden-xs">')
			.appendLine('			<button id="Button_Sonido" title="Volumen/Mute" ><i class="fa fa-volume-down animated infinite bounceIn delay-1s"></i></button>')
			.appendLine('			<button id="Button_Pausa" title="Play/Pausa" ><i class="fa fa-play animated infinite bounceIn delay-4s"></i></button>')
			
			////.appendLine('			<button type="button" class="sidebar-nav-item-icon fa fa-area-chart" data-toggle="collapse" data-target="#demo">Conoce Mas de Nosotros</button>')
			//.appendLine('			<a href="https://www.facebook.com/Alzheimer-El-Salvador-256581527700226/"><i class="fa fa-play"></i></a>')
			//.appendLine('			<a href="https://www.youtube.com/channel/UC-9qz9aOLouMEmYMmS2Vw_g"><i class="fa fa-youtube-square"></i></a>')
			////.appendLine('            <a href="WebSite/Login.html"><i class="fa fa-sign-in"></i></a>')
			.appendLine('        </div>')
			
			//.appendLine('    <p>...nunc consectetur tempor nulla. Etiam sed nisi eget lectus vestibulum finibus sit amet tincidunt velit. Maecenas mauris lacus, venenatis et dui ut, efficitur dictum quam. Nam rutrum in ex accumsan varius. Maecenas ac velit ante. Donec tristique')
			//.appendLine('      dui mi. Donec fringilla eros vitae orci tempus fringilla. In feugiat ante sit amet nunc vehicula tempus. Aenean eu enim sed magna venenatis consectetur. Morbi accumsan sollicitudin felis, ut lacinia libero consequat eu.</p>')
			//.appendLine('')
			//.appendLine('    <p>Fusce cursus tincidunt odio, vitae viverra libero faucibus sit amet. Suspendisse velit libero, semper sed nisl ac, sollicitudin volutpat ligula. In hac habitasse platea dictumst. Nullam vitae quam maximus erat sodales condimentum nec vel odio. Aenean')
			//.appendLine('      non facilisis elit, et scelerisque tellus. Vivamus pretium pulvinar ipsum eget feugiat. Nullam cursus nisl at lacus imperdiet rutrum. Sed faucibus elit a nulla commodo, vel mattis est suscipit. Proin iaculis pretium mattis.</p>')
			//.appendLine('')
			//.appendLine('    <p>Nulla sed aliquet dui. Integer vel malesuada ligula. Sed placerat dapibus lacus a molestie. Duis auctor diam imperdiet felis varius, tristique fringilla nulla fringilla. Mauris molestie volutpat dui, ac ornare nibh venenatis nec. Quisque non posuere')
			//.appendLine('      nulla. In bibendum imperdiet nisl eu varius. Etiam maximus egestas accumsan. Proin ac viverra massa. Maecenas eget ante at elit dictum vehicula. Nam augue mauris, ullamcorper in nisi a, interdum placerat urna. Vestibulum efficitur lectus a ex finibus,')
			//.appendLine('      vitae lacinia orci blandit. Maecenas ut ligula quis ligula accumsan facilisis. Donec scelerisque ligula congue ligula cursus luctus. Nam a diam libero.</p>')
			//.appendLine('    </br>')
			//.appendLine('    <hr>')
			

			.appendLine('  </article>')
			.appendLine('</main>')
			.appendLine('<link rel="stylesheet"  href="/css/intro.css">')
			.appendLine('<script src="' + settings.Image.pathbase + 'js/sidebar.js" type="text/javascript"></script>')
			.appendLine('<script src="' + settings.Image.pathbase + 'js/videobackground.js" type="text/javascript"></script>')
			


		//.appendLine('<div id="AlzheimerFront" class="btn-block">')
		//
		//.appendLine('</div>')

			//.appendLine('    <div>')
			//.appendLine('')
			//.appendLine('        <video id="bg-video" class="fullscreen-video" autoplay="autoplay" loop="loop" poster="img/intro.png" muted>')
			//.appendLine('            <source src="video/intro.mp4" type="video/mp4">')
			//.appendLine('        </video>')
			//.appendLine('')
			//.appendLine('        <h1 class="logo">Alzheimer<span class="badge badge-pill badge-secondary">El Salvador</span></h1>')
			//.appendLine('        <div class="social hidden-xs">')
			//.appendLine('            <a href="https://www.facebook.com/Alzheimer-El-Salvador-256581527700226/"><i class="fa fa-facebook-square"></i></a>')
			//.appendLine('            <a href="https://www.youtube.com/channel/UC-9qz9aOLouMEmYMmS2Vw_g"><i class="fa fa-youtube-square"></i></a>')
			////.appendLine('            <a href="WebSite/Login.html"><i class="fa fa-sign-in"></i></a>')
			//.appendLine('        </div>')
			//.appendLine('')
	        //
			
        //.appendLine('<div class="collapse miniblock" id="demo">')
		//.appendLine('<div class="tab-pane fade active show" id="demo">')
        //.appendLine('    <!--<h3 class="text-left">Conoce Mas de Nosotros</h3>-->')
        //.appendLine('    <ul class="nav nav-tabs">')
        //.appendLine('        <li class="active"><a data-toggle="tab" href="#Grupo">Nuestros Datos</a></li>')
        //.appendLine('        <li><a data-toggle="tab" href="#Mision">Mision</a></li>')
        //.appendLine('        <li><a data-toggle="tab" href="#Vision">Vision</a></li>')
        //.appendLine('    </ul>')
        //.appendLine('')
        //.appendLine('    <div class="tab-content">')
        //.appendLine('        <div id="Grupo" class="tab-pane fade in active">')
        //.appendLine('            <h2 class="text_intro">Grupo de Apoyo Alzheimer</h2>')
        //.appendLine('            <p class="text_intro">')
        //.appendLine('                Reuniones mensuales: último sábado de cada mes<br />')
        //.appendLine('                Lugar: Auditorio del Hospital Policlínico Arce del ISSS<br />')
        //.appendLine('                Hora: 8:00 am a 12:00 md.<br />')
        //.appendLine('                San Salvador<br />')
        //.appendLine('                Tel.: (503) 2237-0787 Oficina<br />')
        //.appendLine('                Cel.: (503) 7947-4979 WhatsApp<br />')
        //.appendLine('            </p>')
        //.appendLine('        </div>')
        //.appendLine('        <div id="Mision" class="tab-pane fade">')
        //.appendLine('            <h2 class="text_intro">Nuestra Misión</h2>')
        //.appendLine('            <p class="text_intro text-justify">Somos una Asociación <b>NO</b> Gubernamental sin Fines de Lucro con la finalidad de impulsar la atención integral y especializada en Alzheimer y otras demencias mediante investigaciones sobre Alzheimer, la planificación, organización y coordinación de programas y servicios de apoyo a pacientes, familias, cuidadores y sociedad en general.</p>')
        //.appendLine('        </div>')
        //.appendLine('        <div id="Vision" class="tab-pane fade">')
        //.appendLine('            <h2 class="text_intro">Nuestra Visión</h2>')
        //.appendLine('            <p class="text_intro text-justify">')
        //.appendLine('                La Asociación de Familiares de pacientes Alzheimer de El Salvador tiene la visión de contribuir al reto de tratar e informar sobre la enfermedad de Alzheimer y las demencias en general y a mejorar la calidad de vida tanto de pacientes como de las familias y cuidadores afectados.')
        //.appendLine('                Así mismo La Asociación de Familiares de pacientes Alzheimer de El Salvador trata de ser una Entidad en el tratamiento, investigación, manejo y la prevención de esta enfermedad organizando grupos de apoyo en la sociedad salvadoreña y así fortalecer nuestra organización con pilares sólidos representativos y transparentes en la prestación y creación de servicios de calidad para los afectados.')
        //.appendLine('            </p>')
        //.appendLine('        </div>')
        //.appendLine('    </div>')
        //.appendLine('</div>')
	}

	exports.GetHTMLStandar(l_block, a_resp, 200, "", [0,1,2,3,4,5,7,8,9]); //
}	//ShowHOME

exports.showStaticPage = function(a_req, a_resp, a_data)
{
    if (settings.servConfig.debug){console.log("Procesando HttpMsgs showStaticPage");}

	var l_block = new StringBuilder({ newline: '\r\n\t' }); // add a tab at the end

	if (a_data)
	{
		if (a_data.length > 0)
		{
			l_block.append('\t')
				.appendLine('<div>')
				//.appendLine('<br><h2>' + a_data[0].titulo + '</h2><br>' )
				.appendLine(a_data[0].contenido)
				.appendLine('</div>');
		}			
	}
	
	exports.GetHTML(l_block, a_resp);
}	//showStaticPage

exports.showResource = function(a_req, a_resp, a_route, a_ext, a_file, a_contentType, a_format)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs showResource");}
	
	try
	{
		var l_userPath = '[a-zA-Z0-9._-]+';
		var l_path = new RegExp( a_route + l_userPath + a_ext);
		
		if (l_path.test(a_req.url))
		{
			if (fs.existsSync("." + a_route + a_file))
			{
				var l_Thisfile = fs.readFileSync("." + a_route + a_file);	//'.' + req.url
				a_resp.writeHead(200,
								{"Content-Type": a_contentType,
								'Content-Length': Buffer.byteLength(l_Thisfile),
								'Cache-Control': settings.httpConfig.cache_control
								});

				a_resp.end(l_Thisfile, a_format);
				//return;
			}
			else
			{
				if (settings.servConfig.debug){console.log("archivo no encontrado existsSync:"+"." + a_route + a_file);}
				exports.show500(a_req, a_resp, "archivo no encontrado existsSync");
			}
		}
		else
		{
			if (settings.servConfig.debug){console.log("archivo no encontrado url");}
			exports.show500(a_req, a_resp, "archivo no encontrado url:"+"." + a_route + a_file);
		}
	} catch (err)
	{exports.show404(a_req, a_resp, err);}
}

exports.showBoletinList = function(a_req, a_resp, a_data)
{
    if (settings.servConfig.debug){console.log("Procesando HttpMsgs showBoletinList");}

	//var sb = new StringBuilder({newline: "\r\n"});
	var l_block = new StringBuilder({ newline: '\r\n\t' }); // add a tab at the end
	var l_isbn10 = '';
	var l_isbn13 = '';
	var l_tema = 0;
	var l_tema_ult = 0;
	var l_problema = '', l_problema_div = '';
	var l_problema_nivel = '';
	
	var l_sb_NavBar = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end 
	exports.showNabBar(l_sb_NavBar);
	
	var l_sb_Adds = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end
	exports.showAdds(l_sb_Adds, "D");
	if (settings.servConfig.debug){console.log(a_data);}
	if (a_data)
	{
		console.log(a_data[i]);
		
		l_block
			// SideBar
			.appendLine('<div  >') // class="bg-dark"
			.append(l_sb_NavBar)
			.appendLine('</div>')
			.appendLine('  <br>')
		for (var i=0; i < a_data.length; i++)
		{
			l_block
		.appendLine('<div class="content">')
		
		.appendLine('<div class="mb-3" style="max-width: 95%;"> ')
		.appendLine('  <div class="row ">')
		.appendLine('    <div class="col-md-4">')
		.appendLine('      <img src="/img/' + a_data[i].url_imagen + '" alt="amigos tercera edad" class="card-img">')
		.appendLine('    </div>')
		.appendLine('    <div class="col-md-8">')

		.appendLine('	<div class="row">')
		.appendLine('		<h1>'+ a_data[i].titulo +'</h1>')
		.appendLine('	</div>')
		.appendLine('	<div class="row">')
		.appendLine('		<h3>'+ a_data[i].subtitulo +'</h3>')
		.appendLine('	</div>')
		.appendLine('	<div class="row">')
		.appendLine('				<span class="boletin-autor">'+ a_data[i].autor +' | &nbsp;</span>')
		.appendLine('				<span class="boletin-post-date"><i class="fa fa-calendar" aria-hidden="true"></i>&nbsp;'+ a_data[i].publicado +'&nbsp;</span>')
		.appendLine('				<span class="boletin-tags"> | &nbsp;<i class="fa fa-tags" aria-hidden="true"></i> '+ a_data[i].tags +'</span>')
		.appendLine('	</div>')
		.appendLine('	<div class="row">')
		.appendLine('	<p>')
		.appendLine('		'+ a_data[i].introduccion +'')
		.appendLine('	</p>')
		.appendLine('	</div>')
		.appendLine('	<div class="text-right">')
		.appendLine('		<hr class="boletin-hr">')
		.appendLine('		<a class="btn btn-outline-secondary" tabindex="-1" role="button" aria-disabled="true" target="_blank" href="boletin/'+ a_data[i].id +'"><i class="fa fa-book"></i> leer Mas...</a>')
		.appendLine('	</div>')
		
		.appendLine('    </div>')	// col-md-8
		.appendLine('  </div>')		// class="row 
		.appendLine('</div>')		// class="mb-3" style="max-width: 95%;"
		.appendLine('</div>')		// div class="content"
		}

		l_block
		.appendLine('<div class="content">')
		.appendLine('	<hr class="boletin-hr">')
		.appendLine('	<h3>')
		.appendLine('	<a class="btn btn-outline-secondary disabled" tabindex="-1" role="button" aria-disabled="true" target="_blank" href="boletin/siguiente"><i class="fa fa-angle-left fa-2x"></i> Anterior</a>')
		.appendLine('	<a class="btn btn-outline-secondary disabled" tabindex="-1" role="button" aria-disabled="true" target="_blank" href="boletin/anterior">Siguiente <i class="fa fa-angle-right fa-2x"></i></a>')
		.appendLine('	<hr class="boletin-hr">')
		.appendLine('	</h3>')
		.appendLine('	<h3>')
		//.appendLine('	<i class="fa fa-share-alt" aria-hidden="true"></i> ')
		.appendLine('	<a class="btn btn-outline-secondary" tabindex="-1" role="button" aria-disabled="true" target="_blank" href="https://www.facebook.com/Alzheimer-El-Salvador-256581527700226/"><i class="fa fa-facebook fa-2x"></i></a>')
		.appendLine('	<a class="btn btn-outline-secondary" tabindex="-1" role="button" aria-disabled="true" target="_blank" href="https://www.youtube.com/channel/UC-9qz9aOLouMEmYMmS2Vw_g"><i class="fa fa-youtube fa-2x"></i></a>')
		.appendLine('	</h3>')
	
		.appendLine('	')
		.appendLine('	<button id="button_scrolltop" type="button" class="btn btn-outline-secondary button-scrolltop" onclick="FuncScrollTop()" title="Arriba" ><i class="fa fa-arrow-up" aria-hidden="true"></i></button>')
		.appendLine('</div>')
		.appendLine('    <script>')
		.appendLine('    <!-- // When the user scrolls down 20px from the top of the document, show the button -->')
		.appendLine('    window.onscroll = function() {FuncScroll()};')
		.appendLine('    ')
		.appendLine('    function FuncScroll() ')
		.appendLine('    {')
		.appendLine('        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {')
		.appendLine('            document.getElementById("button_scrolltop").style.display = "block";')
		.appendLine('        } else {')
		.appendLine('            document.getElementById("button_scrolltop").style.display = "none";')
		.appendLine('        }')
		.appendLine('    }')
		.appendLine('    ')
		.appendLine('    // When the user clicks on the button, scroll to the top of the document')
		.appendLine('    function FuncScrollTop() ')
		.appendLine('    {')
		.appendLine('        document.body.scrollTop = 0; // For Safari')
		.appendLine('        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera')
		.appendLine('    }')
		.appendLine('    </script>')
	}

	exports.GetHTMLStandar(l_block, a_resp, 200, "", [0,1,2,3,4,5,7,8,9,11,30,32]); //[0,1,2,3,4,5,7,8,9,10,12,13,14,15];
}	//showBoletinList


exports.showPublicacion = function(a_req, a_resp, a_data)
{
    if (settings.servConfig.debug){console.log("Procesando HttpMsgs showPublicacion");}

	//var sb = new StringBuilder({newline: "\r\n"});
	var l_block = new StringBuilder({ newline: '\r\n\t' }); // add a tab at the end
	var enable_botton_ult = '';
	var enable_botton_pri = '';
	var tema_anterior = "0";
	var tema_siguiente = "0";
	
	
	var l_sb_NavBar = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end 
	exports.showNabBar(l_sb_NavBar);
	
	var l_sb_Adds = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end
	exports.showAdds(l_sb_Adds, "D");
	if (settings.servConfig.debug){console.log(a_data);}
	if (a_data)
	{
		tema_anterior = a_data[0].id - 1;
		tema_siguiente = a_data[0].id + 1;
		
		if (a_data[0].ult_id == a_data[0].id)
		{
			enable_botton_ult = "disabled";
			enable_botton_pri = "";
		}
		
		if (a_data[0].id == "1")
		{
			enable_botton_ult = "";
			enable_botton_pri = "disabled";
		}
			
		l_block
			// SideBar
			.appendLine('<div  >') // class="bg-dark"
			.append(l_sb_NavBar)
			.appendLine('</div>')
			.appendLine('  <br>')
			
		.appendLine('<div class="container">')
		.appendLine('	<div class="row">')
		.appendLine('		<div class="col-8" >')
		.appendLine('			<div>')
		.appendLine('				<span class="boletin-post-date">'+ a_data[0].publicado+'</span>')
		.appendLine('			</div>')
		.appendLine('		</div>')
		.appendLine('		<!-- <div class="col "> -->')
		.appendLine('		<!-- One of three columns -->')
		.appendLine('		<!-- </div> -->')
		.appendLine('		<div class="col-4">')
		.appendLine('			<div style="text-align: right;">')
		.appendLine('				<span class="boletin-autor">'+ a_data[0].autor +'</span>')
		.appendLine('				<img class="boletin-avatar" src="/img/default-avatar.png" alt="avatar">')
		.appendLine('			</div>')
		.appendLine('		</div>')
		.appendLine('	</div>')
		.appendLine('</div>')
		.appendLine('')
		.appendLine('<div class="content">')
		.appendLine('	<div>')
		.appendLine('		<h1>'+ a_data[0].titulo +'</h1>')
		.appendLine('		<h3>'+ a_data[0].subtitulo +'</h3>')
		.appendLine('	</div>')
		.appendLine('	<img src="/img/'+ a_data[0].url_imagen +'" alt="'+ a_data[0].titulo +'" class="boletin-image">')
		.appendLine('	<p>')
		.appendLine('		'+ a_data[0].introduccion )
		.appendLine('	</p>')
		.appendLine('	<hr class="boletin-hr">')
		.appendLine('	')
		.appendLine('	<p>')
		.appendLine('		' + a_data[0].contenido)
		.appendLine('	</p>')
		.appendLine('	<br><br>')
		.appendLine('	<hr class="boletin-hr">')
		.appendLine('	<h3>')
		.appendLine('	<a class="btn btn-outline-secondary ' + enable_botton_pri + '" tabindex="-1" role="button" aria-disabled="true" target="_self" href="/boletin/' + tema_anterior + '"><i class="fa fa-angle-left fa-2x"></i> Anterior</a>')
		.appendLine('	<a class="btn btn-outline-secondary ' + enable_botton_ult + '" tabindex="-1" role="button" aria-disabled="true" target="_self" href="/boletin/' + tema_siguiente + '">Siguiente <i class="fa fa-angle-right fa-2x"></i></a>')
		.appendLine('	</h3>')
		.appendLine('	<hr class="boletin-hr">')
		.appendLine('	<h3>')
		//.appendLine('	<i class="fa fa-share-alt" aria-hidden="true"></i> ')
		.appendLine('	<a class="btn btn-outline-secondary" tabindex="-1" role="button" aria-disabled="true" target="_blank" href="https://www.facebook.com/Alzheimer-El-Salvador-256581527700226/"><i class="fa fa-facebook fa-2x"></i></a>')
		.appendLine('	<a class="btn btn-outline-secondary" tabindex="-1" role="button" aria-disabled="true" target="_blank" href="https://www.youtube.com/channel/UC-9qz9aOLouMEmYMmS2Vw_g"><i class="fa fa-youtube fa-2x"></i></a>')
		.appendLine('	</h3>')
	
		.appendLine('	')
		.appendLine('	<button id="button_scrolltop" type="button" class="btn btn-outline-secondary button-scrolltop" onclick="FuncScrollTop()" title="Arriba" ><i class="fa fa-arrow-up" aria-hidden="true"></i></button>')
		.appendLine('</div>')
		.appendLine('    <script>')
		.appendLine('    <!-- // When the user scrolls down 20px from the top of the document, show the button -->')
		.appendLine('    window.onscroll = function() {FuncScroll()};')
		.appendLine('    ')
		.appendLine('    function FuncScroll() ')
		.appendLine('    {')
		.appendLine('        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {')
		.appendLine('            document.getElementById("button_scrolltop").style.display = "block";')
		.appendLine('        } else {')
		.appendLine('            document.getElementById("button_scrolltop").style.display = "none";')
		.appendLine('        }')
		.appendLine('    }')
		.appendLine('    ')
		.appendLine('    // When the user clicks on the button, scroll to the top of the document')
		.appendLine('    function FuncScrollTop() ')
		.appendLine('    {')
		.appendLine('        document.body.scrollTop = 0; // For Safari')
		.appendLine('        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera')
		.appendLine('    }')
		.appendLine('    </script>')
	}

	exports.GetHTMLStandar(l_block, a_resp, 200, "", [0,1,2,3,4,5,7,8,9,11,30,32]); //[0,1,2,3,4,5,7,8,9,10,12,13,14,15];
}	//showPublicacion

exports.GooSearch = function(a_sb_search)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs GooSearch");}
	
	a_sb_search
		.appendLine("<script>")
		.appendLine("  (function() {")
		.appendLine("    var cx = '012966141528089159085:cq30h4ygq2i';")
		.appendLine("    var gcse = document.createElement('script');")
		.appendLine("    gcse.type = 'text/javascript';")
		.appendLine("    gcse.async = true;")
		.appendLine("    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;")
		.appendLine("    var s = document.getElementsByTagName('script')[0];")
		.appendLine("    s.parentNode.insertBefore(gcse, s);")
		.appendLine("  })();")
		.appendLine("</script>")
		.appendLine("<gcse:search></gcse:search>");
}

exports.GetHTMLStandar = function(a_sb_body, a_resp, a_code, a_msg, a_head_include)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs GetHTMLStandar");}
	
	var html = new StringBuilder()
	, head = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end 
	, l_sb_NavBar = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end 
	, l_sb_Adds = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end
	, l_sb_Footer = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end
	, l_sb_Analytics = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end
	;

	var initTag, endTag, attr;
 
	initTag = '<{0}>';
	endTag = '</{0}>';
	attr = '{0}="{1}"';

	exports.showHead(head, a_head_include);
	//exports.showNabBar(l_sb_NavBar);
	//exports.showAdds(l_sb_Adds, "A");
	//exports.showFooter(l_sb_Footer);
	//exports.showAnalytics(l_sb_Analytics);
	
	// Creando la pagina HTML 
	html
		.appendLine('<!DOCTYPE html>')
		.appendLine('<html {0}>', attr.format('lang', 'en'))
		
		// <head>
		.appendLine(initTag.format('head'))
		.append(head)
		.appendLine(endTag.format('head'))
		// </head>
		
		// <body>
		.appendLine(initTag.format('body'))
		.append(a_sb_body)
		.appendLine(endTag.format('body'))					
		// </body>
		
		.append(endTag.format('html'));						// end HTML
 
	html.build(function(err, result)
	{
		if (err) return console.log("ERROR:" + err);
		a_resp.writeHead(a_code, a_msg, {"Content-Type":"text/html"});
		a_resp.write(result)
		a_resp.end();
	});
}

// Respuestas y Accesos NO PERMITIDOS
exports.show500 = function(req, resp, err)
{
    console.log("Procesando HttpMsgs show500: " + err);
	console.log("Peticion a Procesar>> " + req.method.toUpperCase() + " : " + req.url + "<<");
	console.log(BlackList.ipTest(req));
	console.log(req.headers);
	
	var l_My_body = new StringBuilder({ newline: '\r\n\t' });
	
	l_My_body.append('\t')
		
		//	<!--=== Error V5 ===-->
		.appendLine('<div class="container valign__middle">')
		.appendLine('	<a class="logo-a" href="/"><img alt="Alzheimer El Salvador" src="/img/logo_asociacion.png"></a>')
		.appendLine('	<h1>500: Internal Error</h1>')			
		.appendLine('	<div class="error-v5">')
		.appendLine('	<p>Al parecer la peticion que realizas No es valida<br>Es posible que la URL este mal escrita, o necesitas iniciar sesion para poder acceder a ese recurso<br><br>puedes volver a intentar mas tarde</p>')
		.appendLine('				<a class="nav-item nav-link" href="/"><span class="fa fa-home"></span> Volver a Home</a>')
		.appendLine('				<a class="nav-item nav-link" href="/boletin"><span class="fa fa-book"></span> Puedes revisar nuestro boletin</a>')
		.appendLine('				<a class="nav-item nav-link" href="https://www.facebook.com/Alzheimer-El-Salvador-256581527700226/" target="_blank"><span class="fa fa-facebook-square"></span> Visita nuestro grupo en Facebook</a>')
		.appendLine('	</div>')
		.appendLine('</div><!--/container-->');
	
	exports.GetHTMLStandar(l_My_body,  resp, 500, "Internal Error occurred");
}

exports.show405 = function(req, resp, err)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs show405");}
	
    console.log("Procesando HttpMsgs 405: " + err);
	console.log("Peticion a Procesar>> " + req.method.toUpperCase() + " : " + req.url + "<<");
	console.log(BlackList.ipTest(req));
	console.log(req.headers);
	
	var l_My_body = new StringBuilder({ newline: '\r\n\t' });
	
	l_My_body.append('\t')
		
		//	<!--=== Error V5 ===-->
		.appendLine('<div class="container valign__middle">')
		.appendLine('	<a class="logo-a" href="/"><img alt="Resolución.Club" src="/img/name512x120.png"></a>')
		.appendLine('	<h1>405: Method Not supported/Allowed</h1>')			
		.appendLine('	<div class="error-v5">')
		.appendLine('	<p>Sabes ¿por que? se suicido el Libro de Matematicas<br>R/Es que tenia muchos problemas<br><br>...y nos parace que no sera el unico...</p>')
		.appendLine('				<a class="nav-item nav-link" href="/"><span class="fa fa-home"></span> Volver a Home</a>')
		.appendLine('				<a class="nav-item nav-link" href="/categoria"><span class="fa fa-book"></span> Busca en las Categorias</a>')
		.appendLine('				<a class="nav-item nav-link" href="http://facebook.com/Resolucion.club" target="_blank"><span class="fa fa-facebook-square"></span> Visita nuestro grupo en Facebook</a>')
		.appendLine('	</div>')
		.appendLine('</div><!--/container-->');
	
	exports.GetHTMLStandar(l_My_body, resp, 405, "Method Not supported/Allowed");
}

exports.show404 = function(req, resp, err)
{
    console.log("Procesando HttpMsgs 404: " + err);
	console.log("Peticion a Procesar>> " + req.method.toUpperCase() + " : " + req.url + "<<");
	console.log(BlackList.ipTest(req));
	console.log(req.headers);
	
	var l_My_body = new StringBuilder({ newline: '\r\n\t' });
	
	l_My_body.append('\t')
		
		//	<!--=== Error V5 ===-->
		.appendLine('<div class="container valign__middle">')
		.appendLine('	<a class="logo-a" href="/"><img alt="Resolución.Club" src="/img/name512x120.png"></a>')
		.appendLine('	<h1>404 Not Found</h1>')			
		.appendLine('	<div class="error-v5">')
		.appendLine('	<p>Sabes ¿por que? se suicido el Libro de Matematicas<br>R/Es que tenia muchos problemas<br><br>...y nos parace que no sera el unico...</p>')
		.appendLine('				<a class="nav-item nav-link" href="/"><span class="fa fa-home"></span> Volver a Home</a>')
		.appendLine('				<a class="nav-item nav-link" href="/categoria"><span class="fa fa-book"></span> Busca en las Categorias</a>')
		.appendLine('				<a class="nav-item nav-link" href="http://facebook.com/Resolucion.club" target="_blank"><span class="fa fa-facebook-square"></span> Visita nuestro grupo en Facebook</a>')
		.appendLine('	</div>')
		.appendLine('</div><!--/container-->');

	exports.GetHTMLStandar(l_My_body, resp, 404, "Not Found");
}

exports.show413 = function(req, resp, err)
{
    console.log("Procesando HttpMsgs 413: " + err);
	console.log("Peticion a Procesar>> " + req.method.toUpperCase() + " : " + req.url + "<<");
	console.log(BlackList.ipTest(req));
	console.log(req.headers);
	
	var l_My_body = new StringBuilder({ newline: '\r\n\t' });
	
	l_My_body.append('\t')
		
		//	<!--=== Error V5 ===-->
		.appendLine('<div class="container valign__middle">')
		.appendLine('	<a class="logo-a" href="/"><img alt="Resolución.Club" src="/img/name512x120.png"></a>')
		.appendLine('	<h1>413 Request Entity Too Large</h1>')			
		.appendLine('	<div class="error-v5">')
		.appendLine('	<p>Sabes ¿por que? se suicido el Libro de Matematicas<br>R/Es que tenia muchos problemas<br><br>...y nos parace que no sera el unico...</p>')
		.appendLine('				<a class="nav-item nav-link" href="/"><span class="fa fa-home"></span> Volver a Home</a>')
		.appendLine('				<a class="nav-item nav-link" href="/categoria"><span class="fa fa-book"></span> Busca en las Categorias</a>')
		.appendLine('				<a class="nav-item nav-link" href="http://facebook.com/Resolucion.club" target="_blank"><span class="fa fa-facebook-square"></span> Visita nuestro grupo en Facebook</a>')
		.appendLine('	</div>')
		.appendLine('</div><!--/container-->');

	exports.GetHTMLStandar(l_My_body, resp, 413, "Request Entity Too Large");
}

exports.showSiteMap = function(a_req, a_resp, a_data)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs SiteMap");}
	
	var SiteMap = new StringBuilder();
	var initTag, endTag, attr;
 
	initTag = '<{0}>';
	endTag = '</{0}>';
	attr = '{0}="{1}"';
	
	SiteMap
		.appendLine('<?xml {0} {1} ?>', attr.format('version', '1.0'), attr.format('encoding', 'UTF-8'))
		.appendLine('<urlset {0}\n {1}\n {2}\n {3}>', attr.format('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9'), 
											attr.format('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance'),
											attr.format('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 \n                  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'),
											attr.format('xmlns:image', 'http://www.google.com/schemas/sitemap-image/1.1'))
		.appendLine('<!-- Archivo Generado automaticamente por Alzheimer El Salvador -->');
		
	if (a_data)
	{

		var i=0;
		while (i < a_data.length) 
		{
			SiteMap
			.appendLine(initTag.format('url'))
			// Datos de la URL
			.appendLine('  {0}{1}{2}', initTag.format('loc'), a_data[i].url, endTag.format('loc'));
			
			i++;
			
			if (i < a_data.length)
			{
				if (a_data[i].ord === 1)
				{
					do
					{
						SiteMap
						.appendLine('  '+initTag.format('image:image'))
						.appendLine('    {0}{1}{2}', initTag.format('image:loc'), a_data[i].url, endTag.format('image:loc'))
						.appendLine('    {0}{1}{2}', initTag.format('image:title'), a_data[i].descripcion, endTag.format('image:title'))
						.appendLine('    {0}{1}{2}', initTag.format('image:caption'), a_data[i].descripcion, endTag.format('image:caption'))
						.appendLine('  '+endTag.format('image:image'));

						i++;
					}
					while (a_data[i].ord === 1)
				}
			}
			
			SiteMap.appendLine(endTag.format('url'));
		}
	}
	
	SiteMap
		.appendLine(initTag.format('url'))
		.appendLine('  {0}{1}{2}', initTag.format('loc'), 'http://alzheimerelsalvador.org/boletin', endTag.format('loc'))
		.appendLine(endTag.format('url'))
		.appendLine(initTag.format('url'))
		.appendLine('  {0}{1}{2}', initTag.format('loc'), 'http://alzheimerelsalvador.org/evento', endTag.format('loc'))
		.appendLine(endTag.format('url'))
		.appendLine(initTag.format('url'))
		.appendLine('  {0}{1}{2}', initTag.format('loc'), 'http://alzheimerelsalvador.org/politica', endTag.format('loc'))
		.appendLine(endTag.format('url'))
		.appendLine(initTag.format('url'))
		.appendLine('  {0}{1}{2}', initTag.format('loc'), 'http://alzheimerelsalvador.org', endTag.format('loc'))
		.appendLine(endTag.format('url'))

		.appendLine(endTag.format('urlset'));
		
	SiteMap.build(function(err, result)
	{
		if (err) return console.log("ERROR:" + err);
		a_resp.writeHead(200, {"Content-Type":"text/plain"});
		a_resp.write(result)
		a_resp.end();
	});
}

exports.send200 = function(req, resp)
{
    if (settings.servConfig.debug){console.log("Procesando HttpMsgs 200");}
	
    resp.writeHead(200, {"Content-Type": "application/json"});
    resp.end();
}

exports.showMenu = function(req, resp, data)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs Menu");}

	var block = new StringBuilder({ newline: '\r\n\t' });

	block.append('\t')
		.appendLine('')
		.appendLine('<a href="/sys/categoria/">categoria</a><br>')
		.appendLine('<a href="/sys/problema/">problema</a><br>')
		.appendLine('<a href="/sys/libroxproblema/">libro x problema</a><br>')
		.appendLine('<a href="/sys/temario/">temario</a><br>')
		.appendLine('<a href="/sys/respuesta/">respuesta</a><br>')
		.appendLine('<a href="/sys/book/">book</a><br>')
		.appendLine('<a href="/sys/imagen/">imagen</a><br>')
		.appendLine('');

	exports.GetHTML(block, resp);
}


exports.MttoListDetail = function(a_req, a_resp, a_data, a_metadata)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs MttoListDetail");}

	var l_block = new StringBuilder({ newline: '\r\n\t' });
	var l_block_modal = new StringBuilder({ newline: '\r\n\t' });
	var l_string = "";
	var l_ban = false;

	if (a_data)
	{
		if (settings.servConfig.debug){console.log(a_data);}	// log

		l_block
			.append('\t')
			.appendLine('<br><h1>' + a_metadata.title + '</h1><hr>')
			.appendLine('<table id="example"  class="display" style="width:100%"></table>')
			.appendLine('<script>')
			.appendLine('var dataSet = [')	// Begin
			for (var i=0; i< a_data.length; i++)
			{
				l_string = "[";
				for (var j=0; j< a_metadata.columns.length; j++)
				{
					//if (a_metadata.columns[j].visible)
					//{
						if (l_string.length > 1) { l_string += ',';}
						l_string += '"' + a_data[i][a_metadata.columns[j].col] + '"';
					//}
				}
				l_string  += ']';
				if (i+1 < a_data.length) {l_string  += ',';}

				l_block.appendLine(l_string)
				// Ejemplo de estructura base '[ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],'
			}

		l_block
			.appendLine('];')				// End
			.appendLine('')		// *** Configuracion de los dataTables ***
			.appendLine('$(document).ready(function() {')
			.appendLine('   var table = $( \'#example\').DataTable( {')
			.appendLine('	')
			.appendLine('		// Configuracion Inicial')
			.appendLine('        "paging":   true,')
			.appendLine('        "ordering": true,')
			.appendLine('        "info":     true,')
			.appendLine('        "select":   "' + settings.pagConfig.pagingSelect + '",')
			.appendLine('		"pagingType": "' + settings.pagConfig.pagingType + '",')
			.appendLine('		"lengthMenu": ' +  settings.pagConfig.pagingLength + ',')
			.appendLine('		')
			.appendLine('	// Configuracion de los Objetos')
			.appendLine('	 "dom": "' + settings.pagConfig.pagingDOM + '",')
			.appendLine('	 buttons: [' + settings.pagConfig.buttons_default + '],')
			.appendLine('		')
			.appendLine('		// Idioma por defecto')
			.appendLine('		"language": {')
			.appendLine('            "lengthMenu":		"Mostrando _MENU_ registros por pagina",')
			.appendLine('            "zeroRecords":		"No se encontraron registros - revisar",')
			.appendLine('            "info":			"Pagina _PAGE_ de _PAGES_ / _MAX_ total de registros",')
			.appendLine('            "infoEmpty":		"Registros No Disponibles",')
			.appendLine('            "infoFiltered":	"(_TOTAL_ filtrados)",')
			.appendLine('			// Adicionados')
			.appendLine('			"emptyTable":		"No hay datos en la tabla",')
			.appendLine('			"infoPostFix":		"",		// NO disponibles')
			.appendLine('			"infoThousands":	".",	// NO disponibles')
			.appendLine('			"decimal": 			".",	// NO disponibles')
			.appendLine('           "thousands": 		",",	// NO disponibles')
			.appendLine('			"loadingRecords": 	"Cargando Registros...",')
			.appendLine('			"processing":   	"Procesando Registros...",')
			.appendLine('			"search":			"Buscar",')
			.appendLine('			"paginate": {')
			.appendLine('				"first":    	"Primero",')
			.appendLine('				"previous": 	"<",')
			.appendLine('				"next":     	">",')
			.appendLine('				"last":     	"Ultimo"')
			.appendLine('			},')
			.appendLine('			"oAria": {')
			.appendLine('				"sSortAscending":  ": habilitar para ordenar la columna en orden ascendente",')
			.appendLine('				"sSortDescending": ": habilitar para ordenar la columna en orden descendente"')
			.appendLine('			},')
			.appendLine('			select: {')
			.appendLine('			    rows: {')
			.appendLine('			        _: "%d filas seleccionadas",')
			.appendLine('			        0: "(Click en una fila para seleccionar)",')
			.appendLine('			        1: "(Fila seleccionada)"')
			.appendLine('			    }')
			.appendLine('			}')
			.appendLine('        },')
			.appendLine('		')
			.appendLine('		// Ordenado por defecto')
			.appendLine('		"order": [[ 1, "asc" ]],')
			.appendLine('		')
			.appendLine('		// Listado de Columnas Visible y Habilitadas')
			.appendLine('		"columnDefs": [')	// Begin
			for (var l=0; l< a_metadata.columns.length; l++)
			{
				// Ejemplo: {"targets": [ 0 ], "visible": false, "searchable": false}
				var l_string3 = '{"targets": [ ' + l + ' ], "visible": ' + a_metadata.columns[l].visible + ', "searchable": ' + a_metadata.columns[l].searchable +'} ';
				if (l + 1 <  a_metadata.columns.length) {l_string3 += ',';}
				l_block.appendLine(l_string3);
			}

		l_block
			.appendLine('        ],')				// End
			.appendLine('		')
			.appendLine('		// Listado de Columnas')
			.appendLine('        data: dataSet,')
			
			// Listado de Columnas, Visibles en el Grid
			.appendLine('        columns: [')
				for (var k=0; k< a_metadata.columns.length; k++)
				{
					//if (a_metadata.columns[k].visible)
					//{
						var l_string2 = ' { title: "' + a_metadata.columns[k].label + '" }';
						if (k + 1 <  a_metadata.columns.length) {l_string2 += ',';}
						l_block.appendLine(l_string2)
					//}
				}
		l_block
			.appendLine('        ]')
			.appendLine('    } );')

		var l_toolbarPlus = '';
		if (a_metadata.hasOwnProperty('toolbar'))
		{
			l_toolbarPlus = '&nbsp;&nbsp; ';
			for (var xy=0; xy < a_metadata.toolbar.length; xy++)
			{
				l_toolbarPlus += '<button id="' + a_metadata.toolbar[xy].button + '" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="' + a_metadata.toolbar[xy].title + '" ><span class="' + a_metadata.toolbar[xy].icon + '" /></button>';
				//{button: "ButtonReset", title: "Resetear Password", icon: "fa fa-file-powerpoint-o", URL: "api_resetpass"}]
			}
		}

		var l_toolbar = '$("div.toolbar").html(\'' +
				'<button type="button" onclick="location.href=&#39;/sys/panel&#39;" data-toggle="tooltip" data-placement="top" title="Panel de opciones" class="btn btn-secondary"><span class="fa fa-home" /></button> ' +
				'&nbsp;&nbsp; ' +
				'<button id="ButtonAdd" onclick="location.href=&#39;/sys/' + a_metadata.name + '_new&#39;" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Adicionar Registro" ><span class="fa fa-file-text-o" /></button>' + 
				'<button id="ButtonEdit" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Editar Registro" ><span class="fa fa-pencil-square-o" /></button>' +
				'<button id="ButtonDel" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Borrar Registro"><span class="fa fa-times" /></button>' +
				l_toolbarPlus +
				'\');';
				
		l_block
		//.appendLine('$("div.toolbar").html(\'<button type="button" onclick="location.href=&#39;/sys/menu&#39;" data-toggle="tooltip" data-placement="top" title="Menu de opciones" class="btn btn-secondary"><span class="fa fa-home" /></button> &nbsp;&nbsp; <button id="ButtonAdd" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Adicionar Registro" onclick="location.href=&#39;/sys/pais_new&#39;" ><span class="fa fa-file-text-o" /></button><button id="ButtonEdit" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Editar Registro" ><span class="fa fa-pencil-square-o" /></button><button id="ButtonDel" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Borrar Registro"><span class="fa fa-times" /></button>\');')
		.appendLine(l_toolbar)
		.appendLine('                   ')
		
		// Select ROW
		.appendLine('    $(\'#example tbody\').on( \'click\', \'tr\', function () {')
		.appendLine('        if ( $(this).hasClass(\'selected\') ) {')
		.appendLine('            $(this).removeClass(\'selected\');')
		.appendLine('        }')
		.appendLine('        else {')
		.appendLine('            table.$(\'tr.selected\').removeClass(\'selected\');')
		.appendLine('            $(this).addClass(\'selected\');')
		.appendLine('        }')
		.appendLine('    } );')
		.appendLine(' ')
		// Select ROW

		// Edit button
		.appendLine('	$("#ButtonEdit").click( function () {')
		.appendLine('		try {')
		.appendLine('  			var l_Item = ' + GetPrimaryKey(a_metadata).join(" + '-' + ") + ';')   //table.row(".selected").data()[0];
		.appendLine('  			var l_RecursoURL = "/sys/' + a_metadata.name + '_edit/"+l_Item; ')
		.appendLine('			location.href = l_RecursoURL; ')
		.appendLine('		}')
		.appendLine('		catch(err) {')
		.appendLine('			swal({title: "Click en una fila para seleccionar", text: "Operacion Cancelada", icon:"error", buttons: false, timer:3000});')
		.appendLine('		}')
		.appendLine('	} );')
		.appendLine(' ')
		// Edit button

		// Del button
		.appendLine('	$("#ButtonDel").click( function () {')
		//.appendLine(' 		 console.log( table.row(".selected").data()[0] ); console.log(table.row(".selected").data());')
		.appendLine('		try {')
		.appendLine('			var l_RecursoURL = "/api/' + a_metadata.name + '";  ')
		.appendLine('			var l_Item = ' + GetPrimaryKey(a_metadata).join(" + '-' + ") + '; ')
		.appendLine('		}')
		.appendLine('		catch(err) {')
		.appendLine('			swal({title: "Click en una fila para seleccionar", text: "Operacion Cancelada", icon:"error", buttons: false, timer:3000});')
		.appendLine('			return;')
		.appendLine('		}')
		.appendLine('	swal')
		.appendLine('	({')
		.appendLine('	  title: "¿Desea Eliminar el Registro?",')
		.appendLine('	  text: "Una vez Eliminado, No podra ser Recuperado",')
		.appendLine('	  icon: "warning",')
		.appendLine('	  buttons: true,')
		.appendLine('	  dangerMode: true,')
		.appendLine('	})')
		.appendLine('	.then((willDelete) => {')
		.appendLine('	  if (willDelete) ')
		.appendLine('	  {')
		.appendLine(' ')
		.appendLine('		// Call Web API to get a list of Product')
		.appendLine('		$.ajax({')
		.appendLine('			url: l_RecursoURL+"/"+l_Item,')
		.appendLine('			type: "DELETE",')
		.appendLine('		success: function (respuesta)')
		.appendLine('		{')
		.appendLine('        	table.row(".selected").remove().draw( false );')
		.appendLine('		  	swal(')
		.appendLine('		  	{')
		.appendLine('		  	title: "Registro Eliminado", ')
		.appendLine('		  	text: "Id de registro "+l_Item, ')
		.appendLine('		  	icon: "success", ')
		.appendLine('			buttons: false,')
		.appendLine('			timer: 3000 ')
		.appendLine('			});},')
		.appendLine('		error: function (request, message, error)')
		.appendLine('		{ handleException(request, message, error);}')
		.appendLine('		   ')
		.appendLine('		 }); ')
		.appendLine(' ')
		.appendLine('	  } else ')
		.appendLine('	  {')
		.appendLine('		swal({title: "Operacion Cancelada", text: "Id de registro "+l_Item, icon:"error", buttons: false, timer:3000});')
		.appendLine('	  }')
		.appendLine('	});')
		.appendLine('					')
		.appendLine('    } );')
		// Del button
		
		// Custom button
		if (a_metadata.hasOwnProperty('toolbar'))
		{
			for (var yx=0; yx < a_metadata.toolbar.length; yx++)
			{
				//a_metadata.toolbar[xy].button 
				//' + a_metadata.toolbar[xy].title + '
				//' + a_metadata.toolbar[xy].icon + '
		
				l_block
				.appendLine('	$("#' + a_metadata.toolbar[yx].button + '").click( function () {')
				.appendLine('		try {')
				.appendLine('			var l_RecursoURL = "' + a_metadata.toolbar[yx].URL + '";  ')
				.appendLine('			var l_Item = ' + GetPrimaryKey(a_metadata).join(" + '-' + ") + '; ')
				.appendLine('		}')
				.appendLine('		catch(err) {')
				.appendLine('			swal({title: "Click en una fila para seleccionar", text: "Operacion Cancelada", icon:"error", buttons: false, timer:3000});')
				.appendLine('			return;')
				.appendLine('		}')
				.appendLine('	swal')
				.appendLine('	({')
				.appendLine('	  title: "¿Desea ' + a_metadata.toolbar[yx].title + ' al Registro?",')
				.appendLine('	  text: "Una vez ' + a_metadata.toolbar[yx].title + ', No podra ser Recuperado",')
				.appendLine('	  icon: "warning",')
				.appendLine('	  buttons: true,')
				.appendLine('	  dangerMode: true,')
				.appendLine('	})')
				.appendLine('	.then((willDelete) => {')
				.appendLine('	  if (willDelete) ')
				.appendLine('	  {')
				.appendLine(' ')
				.appendLine('		// Call Web API to get a list of Product')
				.appendLine('		$.ajax({')
				.appendLine('			url: l_RecursoURL+"/"+l_Item,')
				.appendLine('			type: "' + a_metadata.toolbar[yx].verbo + '",')
				.appendLine('		success: function (respuesta)')
				.appendLine('		{')
				//.appendLine('        	table.row(".selected").remove().draw( false );')
				.appendLine('		  	swal(')
				.appendLine('		  	{')
				.appendLine('		  	title: "Al Registro se le realizo ' + a_metadata.toolbar[yx].title + '", ')
				.appendLine('		  	text: "Id de registro "+l_Item, ')
				.appendLine('		  	icon: "success", ')
				.appendLine('			buttons: false,')
				.appendLine('			timer: 3000 ')
				.appendLine('			});},')
				.appendLine('		error: function (request, message, error)')
				.appendLine('		{ handleException(request, message, error);}')
				.appendLine('		   ')
				.appendLine('		 }); ')
				.appendLine(' ')
				.appendLine('	  } else ')
				.appendLine('	  {')
				.appendLine('		swal({title: "Operacion Cancelada", text: "Id de registro "+l_Item, icon:"error", buttons: false, timer:3000});')
				.appendLine('	  }')
				.appendLine('	});')
				.appendLine('					')
				.appendLine('    } );')
				.appendLine('// fin Custom Button ')
		
			}
		}
		// Custom button
		
		// Habilitar el Tooltips en los botones
		l_block
		.appendLine('$(function () {')
		.appendLine('  $(\'[data-toggle="tooltip"]\').tooltip()')
		.appendLine('});')
		.appendLine('} );')
		.appendLine('')
		.appendLine('</script>')
		.appendLine('');
	} // if (a_data)
		
	exports.GetHTMLsys(l_block, a_resp);
};


exports.MttoList = function(a_req, a_resp, a_data, a_metadata)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs MttoList");}

	var l_block = new StringBuilder({ newline: '\r\n\t' });
	var l_block_modal = new StringBuilder({ newline: '\r\n\t' });
	var l_string = "";
	var l_ban = false;

	if (a_data)
	{
		//exports.Mtto_X(a_data, a_metadata, l_block_modal);
		console.log(a_data);
		l_block.append('\t')
			.appendLine('<br><h1>' + a_metadata.title + '</h1><hr>')
			//.appendLine('<button id="ButtonDel" type="button" class="btn btn-secondary" ><span class="fa fa-ban" /></button>')
			.appendLine('<table id="example"  class="display" style="width:100%"></table>')
			
			.appendLine('<script>')
			.appendLine('var dataSet = [')
			for (var i=0; i< a_data.length; i++)
			{
				l_string = "[";

				for (var j=0; j< a_metadata.columns.length; j++)
				{
					//if (a_metadata.columns[j].visible)
					//{
						if (l_string.length > 1) { l_string += ',';}
						l_string += '"' + a_data[i][a_metadata.columns[j].col] + '"';
					//}
				}
				
				l_string  += ']';
				if (i+1 < a_data.length) {l_string  += ',';}

				l_block.appendLine(l_string)
				// Ejemplo de estructura base '[ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],'
			}

			l_block
			.appendLine('];')
			.appendLine('')
			.appendLine('$(document).ready(function() {')
			.appendLine('   var table = $( \'#example\').DataTable( {')
			.appendLine('	')
			.appendLine('		// Configuracion Inicial')
			.appendLine('        "paging":   true,')
			.appendLine('        "ordering": true,')
			.appendLine('        "info":     true,')
			.appendLine('        "select":   "' + settings.pagConfig.pagingSelect + '",')
			.appendLine('		"pagingType": "' + settings.pagConfig.pagingType + '",')
			.appendLine('		"lengthMenu": ' +  settings.pagConfig.pagingLength + ',')
			.appendLine('		')
			.appendLine('	// Configuracion de los Objetos')
			.appendLine('	 "dom": "' + settings.pagConfig.pagingDOM + '",')
			.appendLine('	 buttons: [' + settings.pagConfig.buttons_default + '],')
			.appendLine('		')
			.appendLine('		// Idioma por defecto')
			.appendLine('		"language": {')
			.appendLine('            "lengthMenu":		"Mostrando _MENU_ registros por pagina",')
			.appendLine('            "zeroRecords":		"No se encontraron registros - revisar",')
			.appendLine('            "info":			"Pagina _PAGE_ de _PAGES_ / _MAX_ total de registros",')
			.appendLine('            "infoEmpty":		"Registros No Disponibles",')
			.appendLine('            "infoFiltered":	"(_TOTAL_ filtrados)",')
			.appendLine('			// Adicionados')
			.appendLine('			"emptyTable":		"No hay datos en la tabla",')
			.appendLine('			"infoPostFix":		"",		// NO disponibles')
			.appendLine('			"infoThousands":	".",	// NO disponibles')
			.appendLine('			"decimal": 			".",	// NO disponibles')
			.appendLine('           "thousands": 		",",	// NO disponibles')
			.appendLine('			"loadingRecords": 	"Cargando Registros...",')
			.appendLine('			"processing":   	"Procesando Registros...",')
			.appendLine('			"search":			"Buscar",')
			.appendLine('			"paginate": {')
			.appendLine('				"first":    	"Primero",')
			.appendLine('				"previous": 	"<",')
			.appendLine('				"next":     	">",')
			.appendLine('				"last":     	"Ultimo"')
			.appendLine('			},')
			.appendLine('			"oAria": {')
			.appendLine('				"sSortAscending":  ": habilitar para ordenar la columna en orden ascendente",')
			.appendLine('				"sSortDescending": ": habilitar para ordenar la columna en orden descendente"')
			.appendLine('			},')
			.appendLine('			select: {')
			.appendLine('			    rows: {')
			.appendLine('			        _: "%d filas seleccionadas",')
			.appendLine('			        0: "(Click en una fila para seleccionar)",')
			.appendLine('			        1: "(Fila seleccionada)"')
			.appendLine('			    }')
			.appendLine('			}')
			.appendLine('        },')
			.appendLine('		')
			.appendLine('		// Ordenado por defecto')
			.appendLine('		"order": [[ 1, "asc" ]],')
			.appendLine('		')
			.appendLine('		// Listado de Columnas Visible y Habilitadas')
			.appendLine('		"columnDefs": [')
				for (var l=0; l< a_metadata.columns.length; l++)
				{
					// Ejemplo: {"targets": [ 0 ], "visible": false, "searchable": false}
					var l_string3 = '{"targets": [ ' + l + ' ], "visible": ' + a_metadata.columns[l].visible + ', "searchable": ' + a_metadata.columns[l].searchable +'} ';
					if (l + 1 <  a_metadata.columns.length) {l_string3 += ',';}
					l_block.appendLine(l_string3)
				}

			l_block
			.appendLine('        ],')
			
			.appendLine('		')
			.appendLine('		// Listado de Columnas')
			.appendLine('        data: dataSet,')
			
			// Listado de Columnas, Visibles en el Grid
			.appendLine('        columns: [')
				for (var k=0; k< a_metadata.columns.length; k++)
				{
					//if (a_metadata.columns[k].visible)
					//{
						var l_string2 = ' { title: "' + a_metadata.columns[k].label + '" }';
						if (k + 1 <  a_metadata.columns.length) {l_string2 += ',';}
						l_block.appendLine(l_string2)
					//}
				}
			l_block
			.appendLine('        ]')
			.appendLine('    } );')


		var l_toolbarPlus = '';
		if (a_metadata.hasOwnProperty('toolbar'))
		{
			l_toolbarPlus = '&nbsp;&nbsp; ';
			for (var xy=0; xy < a_metadata.toolbar.length; xy++)
			{
				l_toolbarPlus += '<button id="' + a_metadata.toolbar[xy].button + '" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="' + a_metadata.toolbar[xy].title + '" ><span class="' + a_metadata.toolbar[xy].icon + '" /></button>';
				//{button: "ButtonReset", title: "Resetear Password", icon: "fa fa-file-powerpoint-o", URL: "api_resetpass"}]
			}
		}

		var l_toolbar = '$("div.toolbar").html(\'' +
				'<button type="button" onclick="location.href=&#39;/sys/panel&#39;" data-toggle="tooltip" data-placement="top" title="Panel de opciones" class="btn btn-secondary"><span class="fa fa-home" /></button> ' +
				'&nbsp;&nbsp; ' +
				'<button id="ButtonAdd" onclick="location.href=&#39;/sys/' + a_metadata.name + '_new&#39;" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Adicionar Registro" ><span class="fa fa-file-text-o" /></button>' + 
				'<button id="ButtonEdit" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Editar Registro" ><span class="fa fa-pencil-square-o" /></button>' +
				'<button id="ButtonDel" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Borrar Registro"><span class="fa fa-times" /></button>' +
				l_toolbarPlus +
				'\');';
				
		l_block
		//.appendLine('$("div.toolbar").html(\'<button type="button" onclick="location.href=&#39;/sys/menu&#39;" data-toggle="tooltip" data-placement="top" title="Menu de opciones" class="btn btn-secondary"><span class="fa fa-home" /></button> &nbsp;&nbsp; <button id="ButtonAdd" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Adicionar Registro" onclick="location.href=&#39;/sys/pais_new&#39;" ><span class="fa fa-file-text-o" /></button><button id="ButtonEdit" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Editar Registro" ><span class="fa fa-pencil-square-o" /></button><button id="ButtonDel" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Borrar Registro"><span class="fa fa-times" /></button>\');')
		.appendLine(l_toolbar)
		.appendLine('                   ')
		
		// Select ROW
		.appendLine('    $(\'#example tbody\').on( \'click\', \'tr\', function () {')
		.appendLine('        if ( $(this).hasClass(\'selected\') ) {')
		.appendLine('            $(this).removeClass(\'selected\');')
		.appendLine('        }')
		.appendLine('        else {')
		.appendLine('            table.$(\'tr.selected\').removeClass(\'selected\');')
		.appendLine('            $(this).addClass(\'selected\');')
		.appendLine('        }')
		.appendLine('    } );')
		.appendLine(' ')
		// Select ROW

		// Edit button
		.appendLine('	$("#ButtonEdit").click( function () {')
		.appendLine('		try {')
		.appendLine('  			var l_Item = ' + GetPrimaryKey(a_metadata).join(" + '-' + ") + ';')   //table.row(".selected").data()[0];
		.appendLine('  			var l_RecursoURL = "/sys/' + a_metadata.name + '_edit/"+l_Item; ')
		.appendLine('			location.href = l_RecursoURL; ')
		.appendLine('		}')
		.appendLine('		catch(err) {')
		.appendLine('			swal({title: "Click en una fila para seleccionar", text: "Operacion Cancelada", icon:"error", buttons: false, timer:3000});')
		.appendLine('		}')
		.appendLine('	} );')
		.appendLine(' ')
		// Edit button

		// Del button
		.appendLine('	$("#ButtonDel").click( function () {')
		//.appendLine(' 		 console.log( table.row(".selected").data()[0] ); console.log(table.row(".selected").data());')
		.appendLine('		try {')
		.appendLine('			var l_RecursoURL = "/api/' + a_metadata.name + '";  ')
		.appendLine('			var l_Item = ' + GetPrimaryKey(a_metadata).join(" + '-' + ") + '; ')
		.appendLine('		}')
		.appendLine('		catch(err) {')
		.appendLine('			swal({title: "Click en una fila para seleccionar", text: "Operacion Cancelada", icon:"error", buttons: false, timer:3000});')
		.appendLine('			return;')
		.appendLine('		}')
		.appendLine('	swal')
		.appendLine('	({')
		.appendLine('	  title: "¿Desea Eliminar el Registro?",')
		.appendLine('	  text: "Una vez Eliminado, No podra ser Recuperado",')
		.appendLine('	  icon: "warning",')
		.appendLine('	  buttons: true,')
		.appendLine('	  dangerMode: true,')
		.appendLine('	})')
		.appendLine('	.then((willDelete) => {')
		.appendLine('	  if (willDelete) ')
		.appendLine('	  {')
		.appendLine(' ')
		.appendLine('		// Call Web API to get a list of Product')
		.appendLine('		$.ajax({')
		.appendLine('			url: l_RecursoURL+"/"+l_Item,')
		.appendLine('			type: "DELETE",')
		.appendLine('		success: function (respuesta)')
		.appendLine('		{')
		.appendLine('        	table.row(".selected").remove().draw( false );')
		.appendLine('		  	swal(')
		.appendLine('		  	{')
		.appendLine('		  	title: "Registro Eliminado", ')
		.appendLine('		  	text: "Id de registro "+l_Item, ')
		.appendLine('		  	icon: "success", ')
		.appendLine('			buttons: false,')
		.appendLine('			timer: 3000 ')
		.appendLine('			});},')
		.appendLine('		error: function (request, message, error)')
		.appendLine('		{ handleException(request, message, error);}')
		.appendLine('		   ')
		.appendLine('		 }); ')
		.appendLine(' ')
		.appendLine('	  } else ')
		.appendLine('	  {')
		.appendLine('		swal({title: "Operacion Cancelada", text: "Id de registro "+l_Item, icon:"error", buttons: false, timer:3000});')
		.appendLine('	  }')
		.appendLine('	});')
		.appendLine('					')
		.appendLine('    } );')
		// Del button
		
		// Custom button
		if (a_metadata.hasOwnProperty('toolbar'))
		{
			for (var yx=0; yx < a_metadata.toolbar.length; yx++)
			{
				//a_metadata.toolbar[xy].button 
				//' + a_metadata.toolbar[xy].title + '
				//' + a_metadata.toolbar[xy].icon + '
		
				l_block
				.appendLine('	$("#' + a_metadata.toolbar[yx].button + '").click( function () {')
				.appendLine('		try {')
				.appendLine('			var l_RecursoURL = "' + a_metadata.toolbar[yx].URL + '";  ')
				.appendLine('			var l_Item = ' + GetPrimaryKey(a_metadata).join(" + '-' + ") + '; ')
				.appendLine('		}')
				.appendLine('		catch(err) {')
				.appendLine('			swal({title: "Click en una fila para seleccionar", text: "Operacion Cancelada", icon:"error", buttons: false, timer:3000});')
				.appendLine('			return;')
				.appendLine('		}')
				.appendLine('	swal')
				.appendLine('	({')
				.appendLine('	  title: "¿Desea ' + a_metadata.toolbar[yx].title + ' al Registro?",')
				.appendLine('	  text: "Una vez ' + a_metadata.toolbar[yx].title + ', No podra ser Recuperado",')
				.appendLine('	  icon: "warning",')
				.appendLine('	  buttons: true,')
				.appendLine('	  dangerMode: true,')
				.appendLine('	})')
				.appendLine('	.then((willDelete) => {')
				.appendLine('	  if (willDelete) ')
				.appendLine('	  {')
				.appendLine(' ')
				.appendLine('		// Call Web API to get a list of Product')
				.appendLine('		$.ajax({')
				.appendLine('			url: l_RecursoURL+"/"+l_Item,')
				.appendLine('			type: "' + a_metadata.toolbar[yx].verbo + '",')
				.appendLine('		success: function (respuesta)')
				.appendLine('		{')
				//.appendLine('        	table.row(".selected").remove().draw( false );')
				.appendLine('		  	swal(')
				.appendLine('		  	{')
				.appendLine('		  	title: "Al Registro se le realizo ' + a_metadata.toolbar[yx].title + '", ')
				.appendLine('		  	text: "Id de registro "+l_Item, ')
				.appendLine('		  	icon: "success", ')
				.appendLine('			buttons: false,')
				.appendLine('			timer: 3000 ')
				.appendLine('			});},')
				.appendLine('		error: function (request, message, error)')
				.appendLine('		{ handleException(request, message, error);}')
				.appendLine('		   ')
				.appendLine('		 }); ')
				.appendLine(' ')
				.appendLine('	  } else ')
				.appendLine('	  {')
				.appendLine('		swal({title: "Operacion Cancelada", text: "Id de registro "+l_Item, icon:"error", buttons: false, timer:3000});')
				.appendLine('	  }')
				.appendLine('	});')
				.appendLine('					')
				.appendLine('    } );')
				.appendLine('// fin Custom Button ')
		
			}
		}
		// Custom button
		
		// Habilitar el Tooltips en los botones
		l_block
		.appendLine('$(function () {')
		.appendLine('  $(\'[data-toggle="tooltip"]\').tooltip()')
		.appendLine('});')


		.appendLine('} );')
		.appendLine('')
		.appendLine('</script>')


		.appendLine('');
	} // if (a_data)
		
	exports.GetHTMLsys(l_block, a_resp);
}

exports.Mtto_new = function(a_req, a_resp, a_data, a_metadata)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs Mtto_new");}

	var block = new StringBuilder({ newline: '\r\n\t' });
	var l_remote_check = [];

	block.append('\t')
		.appendLine('')
		.appendLine('<div class="container body-content">')
		.appendLine('<br><h1>' + a_metadata.title + '</h1><hr>')
		//.appendLine('<h2>' + a_metadata.name + '</h2>')
		.appendLine('<form id="FormDinamic" autocomplete="off">')
		.appendLine('	<div class="row">')
		.appendLine('		<div class="col-md-3 col-sm-12">')
		
		.appendLine('			<button type="button"  ')
		.appendLine('                  onclick="location.href=&#39;/sys/panel&#39;" ')
		.appendLine('                  data-toggle="tooltip" data-placement="top" title="Panel de opciones" ')
		.appendLine('                  class="btn btn-secondary">')
		.appendLine('                  <span class="fa fa-home" />')
		.appendLine('          </button>')	
		.appendLine('			<button type="button"  ')
		.appendLine('                  onclick="location.href=&#39;/sys/' + a_metadata.name + '&#39;" ')
		.appendLine('                  data-toggle="tooltip" data-placement="top" title="Retornar a opciones ' + a_metadata.title + '" ')
		.appendLine('                  class="btn btn-secondary">')
		.appendLine('                  <span class="fa fa-reply-all" />')
		.appendLine('          </button>')
		
		.appendLine(' &nbsp;&nbsp; ')
				
		.appendLine('			<button type="submit"  ')
		//.appendLine('                  onclick="itemSave();" ')
		.appendLine('                  data-toggle="tooltip" data-placement="top" title="Guardar" ')
		.appendLine('                  class="btn btn-secondary">')
		.appendLine('                  <span class="fa fa-save" />')
		.appendLine('          </button>')
		.appendLine('			<button id="bReset" type="reset"  ')
		//.appendLine('                  onclick="itemSave();" ')
		.appendLine('                  data-toggle="tooltip" data-placement="top" title="Limpiar Formulario" ')
		.appendLine('                  class="btn btn-secondary">')
		.appendLine('                  <span class="fa fa-ban" />')
		.appendLine('          </button>')
		
		.appendLine('		</div>')
		.appendLine('	</div>')
		
		//.appendLine('<div>key :' + a_metadata.primary_key.toString() + '</div>');
		
		for (var j=0; j< a_metadata.columns.length; j++)
		{
			var l_required = (a_metadata.columns[j].required) ? "<img src='/img/greendot.jpg' alt='required dot' >":"<img src='/img/whitedot.jpg' alt='required dot' >";
			var l_data_validetta = [];
			var l_data_validettaF = "";
			var l_placeholder = (a_metadata.columns[j].hasOwnProperty('placeholder')) ? "placeholder='" + a_metadata.columns[j].placeholder +"'":"";
			var l_toUpperLowerCase = "";
			var l_pattern = "";
			
			if (a_metadata.columns[j].required)
			{ l_data_validetta.push("required"); }
			
			if (a_metadata.columns[j].minLength > 0)
			{ l_data_validetta.push("minLength["+a_metadata.columns[j].minLength+"]"); }
			
			l_data_validetta.push("maxLength[" + a_metadata.columns[j].length + "]");

			if (a_metadata.columns[j].hasOwnProperty('email_check'))
			{ l_data_validetta.push("email"); }
		
			if (a_metadata.columns[j].hasOwnProperty('remote_check'))
			{ 
				l_data_validetta.push("remote[check_" + a_metadata.columns[j].col + "]");
				l_remote_check.push('check_' + a_metadata.columns[j].col + ' : { type : "POST", url : "/api_remote/' + a_metadata.name + '", datatype : "json" }');
			}
			
			l_data_validettaF = 'data-validetta="' + l_data_validetta.toString() + '"';
			
			if (a_metadata.columns[j].hasOwnProperty('pattern'))
			{ l_pattern = 'pattern= "' + a_metadata.columns[j].pattern + '"'; }
			
			if (a_metadata.columns[j].hasOwnProperty('toUpperLowerCase'))
			{
				if (a_metadata.columns[j].toUpperLowerCase)
				{l_toUpperLowerCase = 'onkeyup="this.value = this.value.toUpperCase()"';}
				else
				{l_toUpperLowerCase = 'onkeyup="this.value = this.value.toLowerCase()"';}
			}
			
			block
			.appendLine('<div class="form-group row" >')
			.appendLine('	<label class="col-sm-12 col-md-3 col-form-label" for="input_' + a_metadata.columns[j].col + '">' + l_required + '&nbsp;&nbsp;&nbsp;' + a_metadata.columns[j].label +  '</label>')
			//.appendLine('	<label class="col-sm-2 col-form-label" >' + a_metadata.columns[j].type + ' ' + a_metadata.columns[j].length + '</label>')
			.appendLine('	<div class="col-sm-12 col-md-9">');

			
			switch (a_metadata.columns[j].type)
			{
				case "int":
					block.appendLine('		<div class="form-group">')
					block.appendLine('		<input type="number" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" min="' + a_metadata.columns[j].minLength + '" max="' + a_metadata.columns[j].max + '" step="'+ a_metadata.columns[j].step + '" ' + l_data_validettaF + '>')
					block.appendLine('		</div>')
				break;
				
				case "float":
					block.appendLine('		<input type="number" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '"  min="0" value="0" step="0.01" ' + l_pattern + ' >') // min="' + a_metadata.columns[j].minLength + '" max="' + a_metadata.columns[j].length + '"
				break;

				case "textarea":
					block.appendLine('		<textarea class="form-control" style="margin-top: 0px; margin-bottom: 0px; height: 220px;" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" row="3" ' + l_toUpperLowerCase + ' maxlength="' + a_metadata.columns[j].length + '" ></textarea>')
				break;
				
				case "varchar":
					if (a_metadata.columns[j].hasOwnProperty('dropdownlist'))
					{
						console.log( a_metadata.columns[j].col);
						
						if (a_metadata.columns[j].required)
						{ l_data_validettaF = 'required'; } // NO FUNCIONA 'data-validetta="required"'
						else
						{ l_data_validettaF = ""; }
						
						block.appendLine('		<div class="form-group">')
						block.appendLine('			<select class="custom-select" name="' + a_metadata.columns[j].col + '" id="input_' + a_metadata.columns[j].col + '" ' + l_data_validettaF + ' >')
						block.appendLine('			<option value="" selected disabled hidden>Elija su Opcion</option></select>') // value="" selected disabled hidden
						block.appendLine('			</select>')
						block.appendLine('		</div>')
						
						block.appendLine('<script type="text/javascript">')
						block.appendLine('$(document).ready(function ()')
						block.appendLine('{')
						block.appendLine('	GetValues("/api_ddl/' + a_metadata.name + '", "input_' + a_metadata.columns[j].col + '", "<option value=\'[[cod]]\' >[[nombre]]</option>", "' + a_metadata.columns[j].col + '");')
						block.appendLine('});')
						block.appendLine('</script>')
						
					}
					else if (a_metadata.columns[j].hasOwnProperty('dropdownsearch'))
					{
						block.appendLine('		<div class="form-group">')
						block.appendLine('		<input type="text" ')
						block.appendLine('		'+ l_placeholder + ' ')
						block.appendLine('		class="form-control flexdatalist" ') // flexdatalist
						block.appendLine('		data-min-length="3" ')
						block.appendLine('		data-selection-required="' + a_metadata.columns[j].required + '" ')
						block.appendLine('		list="input_' + a_metadata.columns[j].col + '" ')
						block.appendLine('		value="SLV" ')
						block.appendLine('		name="' + a_metadata.columns[j].col + '" > ')
						block.appendLine('')
						block.appendLine('		<datalist id="input_' + a_metadata.columns[j].col + '"></datalist>')
						block.appendLine('		</div>')
						
						block.appendLine('<script type="text/javascript">')
						block.appendLine('$(document).ready(function ()')
						block.appendLine('{')
						block.appendLine('	GetValues("/api_ddl/' + a_metadata.name + '", "input_' + a_metadata.columns[j].col + '", "<option value=\'[[cod]]\' >[[nombre]]</option>", "' + a_metadata.columns[j].col + '");')
						block.appendLine('});')
						block.appendLine('</script>')
					}
					else if (a_metadata.columns[j].hasOwnProperty('radio'))
					{
						for (var r=0; r < a_metadata.columns[j].radio.length; r++)
						{
							block.appendLine('		<div class="form-check">')
							block.appendLine('			<label class="form-check-label">')
							block.appendLine('				<input type="radio" onclick="RadioClick_' + a_metadata.columns[j].col + '(this.value);" class="form-check-input" name="' + a_metadata.columns[j].col + '" id="input_' + a_metadata.columns[j].col + r.toString() + '" value="' + a_metadata.columns[j].radio[r].val + '" >')
							block.appendLine('				' + a_metadata.columns[j].radio[r].label + '')
							block.appendLine('		    </label>')
							block.appendLine('		</div>')
						}
						
						block.appendLine('		<script>')
						block.appendLine('		function RadioClick_' + a_metadata.columns[j].col + '(a_selected) ')
						block.appendLine('		{')
						block.appendLine('			document.getElementById("input_' + a_metadata.columns[j].col + '").value=a_selected;')
						block.appendLine('		}')
						block.appendLine('		</script>')

						block.appendLine('		<input type="hidden" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" size="' + a_metadata.columns[j].length + '" ' + l_placeholder + ' maxlength="' + a_metadata.columns[j].length + '" ' + l_data_validettaF + ' ' + l_toUpperLowerCase + ' >')
						
					}
					else if (a_metadata.columns[j].hasOwnProperty('list'))
					{					
						block.appendLine('		<div class="form-group">')
						block.appendLine('			<select class="custom-select" name="' + a_metadata.columns[j].col + '" id="input_' + a_metadata.columns[j].col + '" ' + l_data_validettaF + ' >')
						for (var r=0; r < a_metadata.columns[j].list.length; r++)
						{
							block.appendLine('				<option value="' + a_metadata.columns[j].list[r].val + '">' + a_metadata.columns[j].list[r].label + '</option>')
						}
						block.appendLine('			</select>')
						block.appendLine('		</div>')
					}
					else
					{ 	block.appendLine('		<div class="form-group">')
						block.appendLine('		<input type="text" class="form-control" id="input_' + 
										a_metadata.columns[j].col +
										'" name="' + a_metadata.columns[j].col +
										'" size="' + a_metadata.columns[j].length + '" ' + l_placeholder +
										' maxlength="' + a_metadata.columns[j].length + '" ' +
										l_data_validettaF + ' ' + l_toUpperLowerCase + ' ' + l_pattern + ' >') 
						block.appendLine('		</div>')
					}
				break;
				
				case "char":
					block.appendLine('		<input type="text" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" size="' + a_metadata.columns[j].length + '" ' + l_placeholder + ' maxlength="' + a_metadata.columns[j].length + '" ' + l_data_validettaF + ' ' + l_toUpperLowerCase + ' >')
				break;
				
				case "time":
					block.appendLine('		<input type="time" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" value="13:30" >')
				break;
				
				case "date":
					var fecha = new Date();
					//var hora = fecha.getFullYear() + "/" + fecha.getMonth() + "/" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + ":" + fecha.getMilliseconds();
					block.appendLine('		<input type="date" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" value="' + fecha.getFullYear() + "-0" + fecha.getMonth() + "-0" + fecha.getDate() + '" >') // min="' + a_metadata.columns[j].min + '" max="' + a_metadata.columns[j].max + '" step="1"     onload="setDefaultDate(\'input_' + a_metadata.columns[j].col + '\')" 
				break;

				default:
					block.appendLine('		<input type="text" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" size="' + a_metadata.columns[j].length + '" ' + l_placeholder + ' maxlength="' + a_metadata.columns[j].length + '" ' + l_data_validettaF + ' ' + l_toUpperLowerCase + ' >')
				break;
			}
			block
			.appendLine('	</div>')
			.appendLine('</div>');
		}
		
		block
		.appendLine('</form>')

		.appendLine('<hr>')

		.appendLine('<script type="text/javascript">')
		.appendLine('var ITEM = {');
		for (var k=0; k< a_metadata.columns.length; k++)
		{
			switch (a_metadata.columns[k].type)
			{
				case "int":
					block.appendLine(a_metadata.columns[k].col + ': ' + '0, ');
				break;
				
				case "float":
					block.appendLine(a_metadata.columns[k].col + ': ' + '0.0, ');
				break;
				
				case "char":
				case "varchar":
				case "varcharlbox":
				case "textarea":
					block.appendLine(a_metadata.columns[k].col + ': ' + '"", ');
				break;
				
				case "time":
					block.appendLine(a_metadata.columns[k].col + ': ' + '"00:00", ');
				break;
				
				case "date":
					block.appendLine(a_metadata.columns[k].col + ': ' + '"01/01/1999", ');
				break;

				default:
					block.appendLine(a_metadata.columns[k].col + ': ' + '"", ');
				break;
			}
		}
		block
		.appendLine('}')
		.appendLine('function itemSave() ')
		.appendLine('{')
		
		.appendLine('	ITEM = new Object();');

		for (var l=0; l< a_metadata.columns.length; l++)
		{ block.appendLine('ITEM.' + a_metadata.columns[l].col + ' = $("#input_' + a_metadata.columns[l].col + '").val();'); }

		block
		.appendLine('	itemInsert("/api/' + a_metadata.table + '", ITEM);')
		.appendLine('	$("#bReset").click();')
		.appendLine('}')

		.appendLine('</script>')
		.appendLine("<script src='/js/js_ctrlvalues.js' ></script>")
		
		.appendLine('<script>')
		.appendLine('$(document).ready(function() {')
		.appendLine('	$("#FormDinamic").validetta(')
		.appendLine('		{realTime: true,')
		.appendLine('		display : "inline", // bubble or inline')
		.appendLine('		validators: {')
		.appendLine('			remote : {')
		// Ejemplo: check_iso3 : { type : "POST", url : "/api_remote/pais", datatype : "json" }
		.appendLine(l_remote_check.toString())
		.appendLine('			}')
		.appendLine('		},')
		
		.appendLine('onValid : function( event ) ')
		.appendLine('{ ')
		.appendLine(' event.preventDefault(); // Evitará la presentación/envio del formulario')
		.appendLine(' itemSave();')
		.appendLine('},')
		.appendLine('onError : function( event )')
		.appendLine('{  ')
		.appendLine('	swal(')
		.appendLine('		  	{')
		.appendLine('		  	title: "Registro NO Valido", ')
		.appendLine('		  	text: "Los Valores NO pasaron las validaciones, favor revisar", ')
		.appendLine('		  	icon: "warning", ')
		.appendLine('			buttons: false,')
		.appendLine('			timer: 4000 ')
		.appendLine('			});')
		.appendLine('}  ')
		
		.appendLine('	});')
		
		// Habilitar el Tooltips en los botones
		.appendLine('$(function () {')
		.appendLine('  $(\'[data-toggle="tooltip"]\').tooltip()')
		.appendLine('});')
		
		.appendLine('});')
		.appendLine('</script>')
		
		.appendLine('<script type="text/javascript">')
		.appendLine('	function setDefaultDate(a_ElementById)')
		.appendLine('	{')
		.appendLine('		alert("X");')
		.appendLine('		var today = new Date();')
		//.appendLine('		$("#" + a_ElementById).val() = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);')
		.appendLine('		document.getElementById(a_ElementById).value = "1979-02-02"; ')
		.appendLine('	};')
		.appendLine('</script>')
	//  document.getElementById(a_ElementById).value =
		.appendLine('</div>')
		.appendLine('');
	
	exports.GetHTMLsys(block, a_resp);
}


exports.Mtto_edit = function(a_req, a_resp, a_data, a_metadata)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs Mtto_edit");}

	var block = new StringBuilder({ newline: '\r\n\t' });
	var l_remote_check = [];

	block.append('\t')
		.appendLine('')
		.appendLine('<div class="container body-content">')
		.appendLine('<br><h1>' + a_metadata.title + '</h1><hr>')
		.appendLine('<form id="FormDinamicEdit" autocomplete="off">')
		.appendLine('	<div class="row">')
		.appendLine('		<div class="col-md-3 col-sm-12">')
		//.appendLine('			<button type="button"  ')
		//.appendLine('                  onclick="itemSave();" ')
		//.appendLine('                  class="btn btn-secondary">')
		//.appendLine('                  <span class="fa fa-save" />')
		//.appendLine('          </button>')
		
		.appendLine('			<button type="button"  ')
		.appendLine('                  onclick="location.href=&#39;/sys/panel&#39;" ')
		.appendLine('                  data-toggle="tooltip" data-placement="top" title="Panel de opciones" ')
		.appendLine('                  class="btn btn-secondary">')
		.appendLine('                  <span class="fa fa-home" />')
		.appendLine('          </button>')	
		.appendLine('			<button type="button"  ')
		.appendLine('                  onclick="location.href=&#39;/sys/' + a_metadata.name + '&#39;" ')
		.appendLine('                  data-toggle="tooltip" data-placement="top" title="Retornar a opciones ' + a_metadata.title + '" ')
		.appendLine('                  class="btn btn-secondary">')
		.appendLine('                  <span class="fa fa-reply-all" />')
		.appendLine('          </button>')
		
		.appendLine(' &nbsp;&nbsp; ')
				
		.appendLine('			<button type="submit"  ')
		//.appendLine('                  onclick="itemSave();" ')
		.appendLine('                  data-toggle="tooltip" data-placement="top" title="Guardar" ')
		.appendLine('                  class="btn btn-secondary">')
		.appendLine('                  <span class="fa fa-save" />')
		.appendLine('          </button>')
		
		.appendLine('		</div>')
		.appendLine('	</div>')
		
		//.appendLine('<div>key :' + a_metadata.primary_key.toString() + '</div>');
		
		for (var j=0; j< a_metadata.columns.length; j++)
		{
			var l_required = (a_metadata.columns[j].required) ? "<img src='/img/greendot.jpg' alt='' >":"<img src='/img/whitedot.jpg' alt='' >";
			var l_data_validetta = [];
			var l_data_validettaF = "";
			var l_placeholder = (a_metadata.columns[j].hasOwnProperty('placeholder')) ? "placeholder='" + a_metadata.columns[j].placeholder +"'":"";
			var l_toUpperLowerCase = "";
			var l_disabled = "";
			var l_pattern = "";
			
			if (a_metadata.columns[j].required)
			{ l_data_validetta.push("required"); }
			
			if (a_metadata.columns[j].minLength > 0)
			{ l_data_validetta.push("minLength["+a_metadata.columns[j].minLength+"]"); }
			
			l_data_validetta.push("maxLength[" + a_metadata.columns[j].length + "]");
			
			if (a_metadata.columns[j].hasOwnProperty('email_check'))
			{ l_data_validetta.push("email"); }
		
			if (a_metadata.columns[j].hasOwnProperty('pattern'))
			{ l_pattern = 'pattern= "' + a_metadata.columns[j].pattern + '"'; }
			
			if (a_metadata.columns[j].hasOwnProperty('remote_check'))
			{ 
				l_data_validetta.push("remote[check_" + a_metadata.columns[j].col + "]");
				l_remote_check.push('check_' + a_metadata.columns[j].col + ' : { type : "POST", url : "/api_remote/' + a_metadata.name + '", datatype : "json" }');
			}
			
			l_data_validettaF = 'data-validetta="' + l_data_validetta.toString() + '"';
			
			if (a_metadata.columns[j].hasOwnProperty('toUpperLowerCase'))
			{
				if (a_metadata.columns[j].toUpperLowerCase)
				{l_toUpperLowerCase = 'onkeyup="this.value = this.value.toUpperCase()"';}
				else
				{l_toUpperLowerCase = 'onkeyup="this.value = this.value.toLowerCase()"';}
			}

			// Verificando que la columna ¿es o no? Editable
			if (a_metadata.columns[j].hasOwnProperty('allowNoEdit'))
			{
				if (a_metadata.columns[j].allowNoEdit)
				{ 
					l_disabled = "disabled";
					l_toUpperLowerCase = "";
					l_data_validettaF = "";
				}
			}


			block
			.appendLine('<div class="form-group row" >')
			.appendLine('	<label class="col-sm-12 col-md-3 col-form-label" for="input_' + a_metadata.columns[j].col + '">' + l_required + '&nbsp;&nbsp;&nbsp;' + a_metadata.columns[j].label +  '</label>')
			//.appendLine('	<label class="col-sm-2 col-form-label" >' + a_metadata.columns[j].type + ' ' + a_metadata.columns[j].length + '</label>')
			.appendLine('	<div class="col-sm-12 col-md-9">');

			switch (a_metadata.columns[j].type)
			{
				case "int":
					//block.appendLine('		<input type="number" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" value="' + a_data[0][a_metadata.columns[j].col] + '">');
					block.appendLine('		<input type="number" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" value="' + a_data[0][a_metadata.columns[j].col] + '" min="' + a_metadata.columns[j].minLength + '" max="' + a_metadata.columns[j].length + '" step="1" ' + l_disabled + '>')
				break;
				
				case "float":
					block.appendLine('		<input type="number" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" value="' + a_data[0][a_metadata.columns[j].col] + '" min="0" step="0.01" ' + l_disabled + ' >') //+ l_pattern + '
				break;

				case "textarea":
					//block.appendLine('		<textarea class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" row="3" placeholder="' + a_data[0][a_metadata.columns[j].col] +'">' + a_data[0][a_metadata.columns[j].col] + '</textarea>');
					block.appendLine('		<textarea class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" row="3" placeholder="' + a_data[0][a_metadata.columns[j].col] +'" ' + l_toUpperLowerCase + ' maxlength="' + a_metadata.columns[j].length + '" ' + l_disabled + ' >' + a_data[0][a_metadata.columns[j].col] + '</textarea>')
				break;
				
				case "varchar":
					if (a_metadata.columns[j].hasOwnProperty('dropdownlist'))
					{
						console.log( a_metadata.columns[j].col);
						
						if (a_metadata.columns[j].required)
						{ l_data_validettaF = 'required'; } // NO FUNCIONA 'data-validetta="required"'
						else
						{ l_data_validettaF = ""; }
						
						block.appendLine('		<div class="form-group">')
						block.appendLine('			<select class="custom-select" name="' + a_metadata.columns[j].col + '" id="input_' + a_metadata.columns[j].col + '" ' + l_data_validettaF + ' >')
						block.appendLine('			<option value="" selected disabled hidden>Elija su Opcion</option></select>') // value="" selected disabled hidden
						block.appendLine('			</select>')
						block.appendLine('		</div>')
						
						block.appendLine('<script type="text/javascript">')
						block.appendLine('$(document).ready(function ()')
						block.appendLine('{')
						block.appendLine('	GetValues("/api_ddl/' + a_metadata.name + '", "input_' + a_metadata.columns[j].col + '", "<option value=\'[[cod]]\' >[[nombre]]</option>", "' + a_metadata.columns[j].col + '");')
						block.appendLine('});')
						block.appendLine('</script>')
						
					}
					else if (a_metadata.columns[j].hasOwnProperty('radio'))
					{
						for (var r=0; r < a_metadata.columns[j].radio.length; r++)
						{
							block.appendLine('		<div class="form-check">')
							block.appendLine('			<label class="form-check-label">')
							block.appendLine('				<input type="radio" onclick="RadioClick_' + a_metadata.columns[j].col + '(this.value);" class="form-check-input" name="' + a_metadata.columns[j].col + '" id="input_' + a_metadata.columns[j].col + r.toString() + '" value="' + a_metadata.columns[j].radio[r].val + '" >')
							block.appendLine('				' + a_metadata.columns[j].radio[r].label + '')
							block.appendLine('		    </label>')
							block.appendLine('		</div>')
						}
						
						block.appendLine('		<script>')
						block.appendLine('		function RadioClick_' + a_metadata.columns[j].col + '(a_selected) ')
						block.appendLine('		{')
						block.appendLine('			document.getElementById("input_' + a_metadata.columns[j].col + '").value=a_selected;')
						block.appendLine('		}')
						block.appendLine('		</script>')

						block.appendLine('		<input type="hidden" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" size="' + a_metadata.columns[j].length + '" ' + l_placeholder + ' maxlength="' + a_metadata.columns[j].length + '" ' + l_data_validettaF + ' ' + l_toUpperLowerCase + ' >')
						
					}
					else if (a_metadata.columns[j].hasOwnProperty('list'))
					{					
						block.appendLine('		<div class="form-group">')
						block.appendLine('			<select class="custom-select" name="' + a_metadata.columns[j].col + '" id="input_' + a_metadata.columns[j].col + '" ' + l_data_validettaF + ' >')
						for (var r=0; r < a_metadata.columns[j].list.length; r++)
						{
							var l_selectedItem = "";
							if (a_data[0][a_metadata.columns[j].col] ==  a_metadata.columns[j].list[r].val)
							{ l_selectedItem = " selected "}
							block.appendLine('				<option value="' + a_metadata.columns[j].list[r].val + '" ' + l_selectedItem + ' >' + a_metadata.columns[j].list[r].label + '</option>')
						}
						block.appendLine('			</select>')
						block.appendLine('		</div>')
					}
					else
					{ 	block.appendLine('		<div class="form-group">')
						block.appendLine('		<input type="text" class="form-control" id="input_' + 
										a_metadata.columns[j].col +
										'" name="' + a_metadata.columns[j].col +
										'" value="' + a_data[0][a_metadata.columns[j].col] +
										'" size="' + a_metadata.columns[j].length + '" ' + l_placeholder +
										' maxlength="' + a_metadata.columns[j].length + '" ' +
										l_data_validettaF + ' ' + l_toUpperLowerCase + ' ' + l_pattern + ' ' + l_disabled + ' >') 
						block.appendLine('		</div>')
					}
					
					//block.appendLine('		<input type="text" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" value="' + a_data[0][a_metadata.columns[j].col] + '" size="' + a_metadata.columns[j].length + '" ' + l_placeholder + ' 
					//                           maxlength="' + a_metadata.columns[j].length + '" ' +
					//							l_data_validettaF + ' ' + l_toUpperLowerCase + ' ' + l_disabled + ' >')
				break;
				
				case "char":
					//block.appendLine('		<input type="text" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" value="' + a_data[0][a_metadata.columns[j].col] + '" ' + l_disabled + ' >');
					block.appendLine('		<input type="text" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" value="' + a_data[0][a_metadata.columns[j].col] + '" size="' + a_metadata.columns[j].length + '" ' + l_placeholder + ' maxlength="' + a_metadata.columns[j].length + '" ' + l_data_validettaF + ' ' + l_toUpperLowerCase + ' ' + l_disabled + ' >')
				break;
				
				case "time":
					//block.appendLine('		<input type="time" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" value="' + a_data[0][a_metadata.columns[j].col] + '" ' + l_disabled + ' >');
					block.appendLine('		<input type="time" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" value="' + a_data[0][a_metadata.columns[j].col] + '" min="1" max="5" step="1" ' + l_disabled + ' >')
				break;
				
				case "date":
					block.appendLine('		<input type="date" class="form-control" id="input_' + a_metadata.columns[j].col + '" name="' + a_metadata.columns[j].col + '" value="' + a_data[0][a_metadata.columns[j].col] + '" ' + l_disabled + ' >')
				break;
				
				default:
				break;
			}
			block
			.appendLine('	</div>')
			.appendLine('</div>');
		}
		
		block
		.appendLine('</form>')
		.appendLine('<hr>')

		.appendLine('<script type="text/javascript">')
		.appendLine('var ITEM = {');
		for (var k=0; k< a_metadata.columns.length; k++)
		{
			switch (a_metadata.columns[k].type)
			{
				case "int":
					block.appendLine(a_metadata.columns[k].col + ': ' + '0, ');
				break;
				
				case "float":
					block.appendLine(a_metadata.columns[k].col + ': ' + '0.0, ');
				break;
				
				case "char":
				case "varchar":
				case "textarea":
					block.appendLine(a_metadata.columns[k].col + ': ' + '"", ');
				break;
				
				case "time":
					block.appendLine(a_metadata.columns[k].col + ': ' + '"00:00", ');
				break;
				
				case "date":
					block.appendLine(a_metadata.columns[k].col + ': ' + '"01/01/1999", ');
				break;

				default:
					block.appendLine(a_metadata.columns[k].col + ': ' + '"", ');
				break;
			}
		}
		block
		.appendLine('}')
		.appendLine('function itemSave() ')
		.appendLine('{')
		
		.appendLine('ITEM = new Object();');

		for (var l=0; l< a_metadata.columns.length; l++)
		{ block.appendLine('ITEM.' + a_metadata.columns[l].col + ' = $("#input_' + a_metadata.columns[l].col + '").val();'); }

		block
		.appendLine('itemUpdate("/api/' + a_metadata.table + '/' + a_data[0].id + '", ITEM);')
		.appendLine('')
		.appendLine('}')

		.appendLine('</script>')
		.appendLine("<script src='/js/js_ctrlvalues.js' ></script>")
		
		.appendLine('<script>')
		.appendLine('$(document).ready(function() {')
		.appendLine('	$("#FormDinamicEdit").validetta(')
		.appendLine('		{realTime: true,')
		.appendLine('		display : "inline", // bubble or inline')
		.appendLine('		validators: {')
		.appendLine('			remote : {')
		// Ejemplo: check_iso3 : { type : "POST", url : "/api_remote/pais", datatype : "json" }
		.appendLine(l_remote_check.toString())
		.appendLine('			}')
		.appendLine('		},')
		
		.appendLine('onValid : function( event ) ')
		.appendLine('{ ')
		.appendLine(' event.preventDefault(); // Evitará la presentación/envio del formulario')
		.appendLine(' itemSave();')
		.appendLine('},')
		.appendLine('onError : function( event )')
		.appendLine('{  ')
		.appendLine('	swal(')
		.appendLine('		  	{')
		.appendLine('		  	title: "Registro NO Valido", ')
		.appendLine('		  	text: "Los Valores NO pasaron las validaciones, favor revisar", ')
		.appendLine('		  	icon: "warning", ')
		.appendLine('			buttons: false,')
		.appendLine('			timer: 4000 ')
		.appendLine('			});')
		.appendLine('}  ')
		
		.appendLine('	});')
		
		// Habilitar el Tooltips en los botones
		.appendLine('$(function () {')
		.appendLine('  $(\'[data-toggle="tooltip"]\').tooltip()')
		.appendLine('});')
		
		.appendLine('});')
		.appendLine('</script>')
		
		.appendLine('</div>')
		.appendLine('');
	
	exports.GetHTMLsys(block, a_resp);
}

exports.Mtto_panel = function(a_req, a_resp, a_metadata)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs Mtto_panel");}
	
	var l_grupos = "";
	var l_opciones = "";

	var block = new StringBuilder({ newline: '\r\n\t' });
	var l_remote_check = [];

	for (var l=0; l< a_metadata.grupos.length; l++)
	{ 
		l_grupos += '	  <a class="nav-link" id="v-pills-' + a_metadata.grupos[l].id + '-tab" data-toggle="pill" href="#v-pills-' + a_metadata.grupos[l].id + '" role="tab" aria-controls="v-pills-' + a_metadata.grupos[l].id + '" aria-selected="false">' + a_metadata.grupos[l].nombre + '</a> \r\n\t';
		l_opciones += '      <div class="tab-pane fade" id="v-pills-' + a_metadata.grupos[l].id + '" role="tabpanel" aria-labelledby="v-pills-' + a_metadata.grupos[l].id + '-tab"> \r\n\t';
		for (var h=0; h< a_metadata.grupos[l].opciones.length; h++)
		{
			l_opciones += 	'<button type="button" ' +
							' onclick="location.href=&#39;' + a_metadata.grupos[l].opciones[h].url + '&#39;" ' +
							' data-toggle="tooltip" data-placement="bottom" title="' + a_metadata.grupos[l].opciones[h].opcion + '" ' +
							' class="btn btn-secondary" style="width: 10rem; margin: 15px;" >' +
							' <span class="' + a_metadata.grupos[l].opciones[h].icono + ' fa-5x text-black-50"  aria-hidden="true" /><hr>' +
							' <h6 class="text-muted" style="font-family:&#39;Century Gothic&#39;, Arial">' + a_metadata.grupos[l].opciones[h].opcion + '</h6>' +
							'</button> \r\n\t';
		}
		l_opciones += '</div> \r\n\t';
	}
	
	block.append('\t')
		.appendLine('')
		.appendLine('<div class="container body-content">')
		.appendLine('<br><h1>Panel de Opciones</h1><hr>')
		//.appendLine('<form id="FormDinamicEdit" autocomplete="off">')
		.appendLine('	<div class="row">')
		.appendLine('		<div class="col-md-3 col-sm-12">')
	
		//.appendLine('			<button type="button"  ')
		//.appendLine('                  onclick="location.href=&#39;/sys/menu&#39;" ')
		//.appendLine('                  data-toggle="tooltip" data-placement="top" title="Menu de opciones" ')
		//.appendLine('                  class="btn btn-secondary">')
		//.appendLine('                  <span class="fa fa-home" />')
		//.appendLine('          </button>')	
		//.appendLine('			<button type="button"  ')
		//.appendLine('                  onclick="location.href=&#39;/sys/' + a_metadata.name + '&#39;" ')
		//.appendLine('                  data-toggle="tooltip" data-placement="top" title="Retornar a opciones ' + a_metadata.title + '" ')
		//.appendLine('                  class="btn btn-secondary">')
		//.appendLine('                  <span class="fa fa-reply-all" />')
		//.appendLine('          </button>')
		//
		//.appendLine(' &nbsp;&nbsp; ')
		//		
		//.appendLine('			<button type="submit"  ')
		////.appendLine('                  onclick="itemSave();" ')
		//.appendLine('                  data-toggle="tooltip" data-placement="top" title="Guardar" ')
		//.appendLine('                  class="btn btn-secondary">')
		//.appendLine('                  <span class="fa fa-save" />')
		//.appendLine('          </button>')
		
		.appendLine('		</div>')
		.appendLine('	</div>')
		
		.appendLine('<div class="row">')
		.appendLine('  <div class="col-3 col-sm-12 col-md-3 col-lg-3 col-xl-3">')
		.appendLine('    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">')
		.appendLine('      <a class="nav-link active" id="v-pills-aplicacion-tab" data-toggle="pill" href="#v-pills-aplicacion" role="tab" aria-controls="v-pills-aplicacion" aria-selected="true">Aplicacion</a>')
		//.appendLine('      <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>')
		//.appendLine('      <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>')
		//.appendLine('      <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>')
		//.appendLine('      <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>')
		.append(l_grupos)
		.appendLine('    </div>')
		.appendLine('  </div>')
		.appendLine('  <div class="col-9 col-sm-12 col-md-9 col-lg-9 col-xl-9">')
		.appendLine('    <div class="tab-content" id="v-pills-tabContent">')
		.appendLine('      <div class="tab-pane fade show active" id="v-pills-aplicacion" role="tabpanel" aria-labelledby="v-pills-aplicacion-tab">')
		.appendLine('			<button type="button" ')
		.appendLine('			onclick="location.href=&#39;/sys/resetpass&#39;" ')
		.appendLine('			data-toggle="tooltip" data-placement="bottom" title="Password" ')
		.appendLine('			class="btn btn-secondary" style="width: 10rem; margin: 15px;" >')
		.appendLine('			<span class="fa fa-key fa-5x text-black-50"  aria-hidden="true" /><hr>')
		.appendLine('			<h6 class="text-muted" style="font-family:&#39;Century Gothic&#39;, Arial">Cambiar Clave</h6>')
		.appendLine('			</button>')
		//.appendLine('			<button type="button" ')
		//.appendLine('			onclick="location.href=&#39;/sys/logout&#39;" ')
		//.appendLine('			data-toggle="tooltip" data-placement="bottom" title="Password" ')
		//.appendLine('			class="btn btn-secondary" style="width: 10rem; margin: 15px;" >')
		//.appendLine('			<span class="fa fa-key fa-5x text-black-50"  aria-hidden="true" /><hr>')
		//.appendLine('			<h6 class="text-muted" style="font-family:&#39;Century Gothic&#39;, Arial">Nueva Clave</h6>')
		//.appendLine('			</button>')
		.appendLine('			<button type="button" ')
		.appendLine('			onclick="location.href=&#39;/sys/logout&#39;" ')
		.appendLine('			data-toggle="tooltip" data-placement="bottom" title="Sign Out" ')
		.appendLine('			class="btn btn-secondary" style="width: 10rem; margin: 15px;" >')
		.appendLine('			<span class="fa fa-sign-out fa-5x text-black-50"  aria-hidden="true" /><hr>')
		.appendLine('			<h6 class="text-muted" style="font-family:&#39;Century Gothic&#39;, Arial">Salir</h6>')
		.appendLine('			</button>')
		.appendLine('      </div>')
		
		
		
		//.appendLine('      <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">a...</div>')
		//.appendLine('      <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">b...</div>')
		//.appendLine('      <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">c...</div>')
		//.appendLine('      <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">d...</div>')
		.append(l_opciones)
		.appendLine('    </div>')
		.appendLine('  </div>')
		.appendLine('</div>')

		.appendLine('</div>')
		
		// Habilitar el Tooltips en los botones
		
		.appendLine('<script>')
		.appendLine('$(function () {')
		.appendLine('  $(\'[data-toggle="tooltip"]\').tooltip()')
		.appendLine('});')
		.appendLine('</script>')
		
		.appendLine('');
		
	exports.GetHTMLsys(block, a_resp);
}

exports.showLogin = function(req, resp, err)
{
    if (settings.servConfig.debug){console.log("Procesando HttpMsgs showLogin");}

	var l_block = new StringBuilder({ newline: '\r\n\t' });

	switch(req.method.toUpperCase())
	{
		case "GET":
			l_block.append('\t')
			
			.appendLine('<div class="container body-content">')
			.appendLine('<br><h1>Login</h1><hr>')
		
			.appendLine('<form class="form-signin animated zoomIn" action="/sys/login" method="post" enctype="application/x-www-form-urlencoded" autocomplete="off">')
			.appendLine('<fieldset>')
			.appendLine('  <div class="text-center mb-4">')
			//.appendLine('    <img class="mb-4" src="/img/logo_asociacion.png" alt="Asociacion Alzheimer El Salvador" width="32" height="32">')
			//.appendLine('    <img class="mb-4" src="/img/logo_asociacion.png" alt="Asociacion Alzheimer El Salvador" height="100" >')
			.appendLine('    <span class="navbar-brand mb-0 h1"><img src="/img/avatar.png" width="25" height="25" class="d-inline-block align-top" alt="">Alzheimer<span class="badge badge-pill badge-secondary">El Salvador</span></span>')
			.appendLine('    <p>Ingreso de Usuario</p>')
			.appendLine('  </div>')
			.appendLine('')
			.appendLine('  <div class="form-label-group">')
			.appendLine('    <input type="email" id="inputEmail" name="inputEmail" class="form-control" placeholder="Email es Requerido" required autofocus>')
			.appendLine('    <label for="inputEmail">Email address</label>')
			.appendLine('  </div>')
			.appendLine('')
			.appendLine('  <div class="form-label-group">')
			.appendLine('    <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="Password" required>')
			.appendLine('    <label for="inputPassword">Password</label>')
			.appendLine('  </div>')
			.appendLine('')
			//.appendLine('		<label class="custom-control-label" ><a href="/register">¿No posee una Cuenta?, Registrate</a></label>')
			//.appendLine('		<label class="custom-control-label" ><a href="/recover_account">¿Olvidaste tu Usuario o Password?, Recuperar Cuenta</a></label>')
			.appendLine('<br>')
			.appendLine('  <button class="btn btn-lg btn-primary btn-block" type="submit">Ingresa</button>')
			.appendLine('  <p class="mt-5 mb-3 text-muted text-center">&copy; 2018</p>')
			.appendLine('</fieldset>')
			.appendLine('</form>')
			
			.appendLine('</div>')
			
			.appendLine('');
		break;
		
		case "POST":
			l_block.append('\t')
			.appendLine('<div class="container body-content">')
			.appendLine('<br><h1>Login</h1><hr>')

			.appendLine('<form class="form-signin animated zoomIn" action="/sys/login" method="post" enctype="application/x-www-form-urlencoded" autocomplete="off">')
			.appendLine('<fieldset>')
			.appendLine('  <div class="text-center mb-4">')
			//.appendLine('    <img class="mb-4" src="/img/logo_asociacion.png" alt="Asociacion Alzheimer El Salvador" width="32" height="32">')
			//.appendLine('    <img class="mb-4" src="/img/logo_asociacion.png" alt="Asociacion Alzheimer El Salvador" height="100" >')
			.appendLine('    <span class="navbar-brand mb-0 h1"><img src="/img/avatar.png" width="25" height="25" class="d-inline-block align-top" alt="">Alzheimer<span class="badge badge-pill badge-secondary">El Salvador</span></span>')
			.appendLine('    <p>Ingreso de Usuario</p>')
			.appendLine('  </div>')
			.appendLine('')
			.appendLine('  <div class="form-label-group">')
			.appendLine('    <input type="email" id="inputEmail" name="inputEmail" class="form-control" placeholder="Email es Requerido" required autofocus>')
			.appendLine('    <label for="inputEmail">Email address</label>')
			.appendLine('  </div>')
			.appendLine('')
			.appendLine('  <div class="form-label-group">')
			.appendLine('    <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="Password" required>')
			.appendLine('    <label for="inputPassword">Password</label>')
			.appendLine('  </div>')
			.appendLine('')
			//.appendLine('		<label class="custom-control-label" ><a href="/register">¿No posee una Cuenta?, Registrate</a></label>')
			//.appendLine('		<label class="custom-control-label" ><a href="/recover_account">¿Olvidaste tu Usuario o Password?, Recuperar Cuenta</a></label>')
			.appendLine('<br>')
			.appendLine('  <button class="btn btn-lg btn-primary btn-block" type="submit">Ingresa</button>')
			.appendLine('  <p class="mt-5 mb-3 text-muted text-center">&copy; 2018</p>')
			.appendLine('</fieldset>')
			.appendLine('</form>')
			
			.appendLine('</div>')	

			.appendLine('<script>')	
			.appendLine('$(document).ready(function() {')
			.appendLine('	swal(')
			.appendLine('		  	{')
			.appendLine('		  	title: "Crecenciales Rechazadas", ')
			.appendLine('		  	text: "Sus credenciales no son validas, favor revisar", ')
			.appendLine('		  	icon: "warning", ')
			.appendLine('			buttons: false,')
			.appendLine('			timer: 4000 ')
			.appendLine('			});')
			.appendLine('});')
			.appendLine('</script>')
			
			.appendLine('');
		break;
	}
		
	exports.GetHTMLsys(l_block, resp);

}	// showLogin


exports.Mtto_resetpass = function(a_req, a_resp, a_data, a_metadata)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs Mtto_resetpass");}

	var block = new StringBuilder({ newline: '\r\n\t' });
	var l_remote_check = [];

	block.append('\t')
		.appendLine('')
		.appendLine('<div class="container body-content">')
		.appendLine('<br><h1>Cambiar mi Password</h1><hr>')
		.appendLine('<form id="FormDinamic" autocomplete="off">')
		.appendLine('	<div class="row">')
		.appendLine('		<div class="col-md-3 col-sm-12">')
		
		.appendLine('			<button type="button"  ')
		.appendLine('                  onclick="location.href=&#39;/sys/panel&#39;" ')
		.appendLine('                  data-toggle="tooltip" data-placement="top" title="Panel de opciones" ')
		.appendLine('                  class="btn btn-secondary">')
		.appendLine('                  <span class="fa fa-home" />')
		.appendLine('          </button>')	
		
		.appendLine(' &nbsp;&nbsp; ')
				
		.appendLine('			<button type="submit"  ')
		//.appendLine('                  onclick="itemSave();" ')
		.appendLine('                  data-toggle="tooltip" data-placement="top" title="Guardar" ')
		.appendLine('                  class="btn btn-secondary">')
		.appendLine('                  <span class="fa fa-save" />')
		.appendLine('          </button>')
		.appendLine('			<button id="bReset" type="reset"  ')
		//.appendLine('                  onclick="itemSave();" ')
		.appendLine('                  data-toggle="tooltip" data-placement="top" title="Limpiar Formulario" ')
		.appendLine('                  class="btn btn-secondary">')
		.appendLine('                  <span class="fa fa-ban" />')
		.appendLine('          </button>')
		
		.appendLine('		</div>')
		.appendLine('	</div>')
		
		//.appendLine('<div>key :' + a_metadata.primary_key.toString() + '</div>');
		
		//for (var j=0; j< a_metadata.columns.length; j++)
		//{
		var l_required = "<img src='/img/greendot.jpg' alt='' >";
		var l_data_validetta = [];
		var l_data_validettaF = "";
		//	var l_placeholder = (a_metadata.columns[j].hasOwnProperty('placeholder')) ? "placeholder='" + a_metadata.columns[j].placeholder +"'":"";
		//	var l_toUpperLowerCase = "";
		//	
		//	if (a_metadata.columns[j].required)

        //
		//	if (a_metadata.columns[j].hasOwnProperty('email_check'))
		//	{ l_data_validetta.push("email"); }
		//	
		//	if (a_metadata.columns[j].hasOwnProperty('remote_check'))
		//	{ 
		//		l_data_validetta.push("remote[check_" + a_metadata.columns[j].col + "]");
		//		l_remote_check.push('check_' + a_metadata.columns[j].col + ' : { type : "POST", url : "/api_remote/' + a_metadata.name + '", datatype : "json" }');
		//	}
		//	
		
		//	
		//	if (a_metadata.columns[j].hasOwnProperty('toUpperLowerCase'))
		//	{
		//		if (a_metadata.columns[j].toUpperLowerCase)
		//		{l_toUpperLowerCase = 'onkeyup="this.value = this.value.toUpperCase()"';}
		//		else
		//		{l_toUpperLowerCase = 'onkeyup="this.value = this.value.toLowerCase()"';}
		//	}

			block
			.appendLine('<div class="form-group row" >')
			.appendLine('	<label class="col-sm-12 col-md-3 col-form-label" for="correo">' + l_required + '&nbsp;&nbsp;&nbsp;Correo</label>')
			.appendLine('	<div class="col-sm-12 col-md-9">');
			
			block.appendLine('		<input type="text" class="form-control" id="correo" name="input_correo" readonly="" value="' +a_metadata.correo +'">') 
	
			block
			.appendLine('	</div>')
			.appendLine('</div>');
	
		
			l_data_validettaF = 'data-validetta="required,minLength[6],maxLength[50]"';
			block
			.appendLine('<div class="form-group row" >')
			.appendLine('	<label class="col-sm-12 col-md-3 col-form-label" for="password">' + l_required + '&nbsp;&nbsp;&nbsp;Password</label>')
			.appendLine('	<div class="col-sm-12 col-md-9">');
			
			block.appendLine('		<input type="password" class="form-control" id="password" name="password" size="50" placeholder="Password" maxlength="50" ' + l_data_validettaF + ' >') 
	
			block
			.appendLine('	</div>')
			.appendLine('</div>');
			
			
			
			l_data_validettaF = 'data-validetta="required,minLength[6],maxLength[50],different[password]"';
			block
			.appendLine('<div class="form-group row" >')
			.appendLine('	<label class="col-sm-12 col-md-3 col-form-label" for="new_password">' + l_required + '&nbsp;&nbsp;&nbsp;Nuevo Password</label>')
			.appendLine('	<div class="col-sm-12 col-md-9">');
			
			block.appendLine('		<input type="password" class="form-control" id="new_password" name="new_password" size="50" placeholder="Nuevo Password" maxlength="50" ' + l_data_validettaF + ' >') 
	
			block
			.appendLine('	</div>')
			.appendLine('</div>');
			
			
			
			l_data_validettaF = 'data-validetta="required,minLength[6],maxLength[50],equalTo[new_password]"';
			block
			.appendLine('<div class="form-group row" >')
			.appendLine('	<label class="col-sm-12 col-md-3 col-form-label" for="repeat_password">' + l_required + '&nbsp;&nbsp;&nbsp;Confirme el Nuevo Password</label>')
			.appendLine('	<div class="col-sm-12 col-md-9">');
			
			block.appendLine('		<input type="password" class="form-control" id="repeat_password" name="repeat_password" size="50" placeholder="Confirme Password" maxlength="50" ' + l_data_validettaF + ' >') 
	
			block
			.appendLine('	</div>')
			.appendLine('</div>');
			
		//}
		
		block
		.appendLine('</form>')
        //
		.appendLine('<hr>')
        //
		.appendLine('<script type="text/javascript">')
		
		

		block
		.appendLine('function itemSave() ')
		.appendLine('{')
		.appendLine('var ITEM = {')
		.appendLine('correo: "", ')
		//.appendLine('nombres: "", ')
		//.appendLine('apellidos: "", ')
		.appendLine('password: "", ')
		.appendLine('newpassword: "", ')
		.appendLine('}')
		.appendLine('	ITEM = new Object();')
        //
		.appendLine('		ITEM.correo = $("#correo").val();')
		//.appendLine('		ITEM.nombres = $("#input_nombres").val();')
		//.appendLine('		ITEM.apellidos = $("#input_apellidos").val();')
		.appendLine('		ITEM.password = $("#password").val();')
		.appendLine('		ITEM.newpassword = $("#new_password").val();')
	
		//block
		.appendLine('	itemInsert("/api/resetpass", ITEM);')
		.appendLine('	$("#bReset").click();')
		.appendLine('}')
        //
		.appendLine('</script>')
		.appendLine("<script src='/js/js_ctrlvalues.js' ></script>")
		//
		.appendLine('<script>')
		.appendLine('$(document).ready(function() {')
		.appendLine('	$("#FormDinamic").validetta(')
		.appendLine('		{realTime: true,')
		.appendLine('		display : "inline", // bubble or inline')
		//.appendLine('		validators: {')
		//.appendLine('			remote : {')
		//// Ejemplo: check_iso3 : { type : "POST", url : "/api_remote/pais", datatype : "json" }
		//.appendLine(l_remote_check.toString())
		//.appendLine('			}')
		//.appendLine('		},')

		.appendLine('onValid : function( event ) ')
		.appendLine('{ ')
		.appendLine(' event.preventDefault(); // Evitará la presentación/envio del formulario')
		.appendLine(' itemSave();')
		.appendLine('},')
		.appendLine('onError : function( event )')
		.appendLine('{  ')
		.appendLine('	swal(')
		.appendLine('		  	{')
		.appendLine('		  	title: "Registro NO Valido", ')
		.appendLine('		  	text: "Los Valores NO pasaron las validaciones, favor revisar", ')
		.appendLine('		  	icon: "warning", ')
		.appendLine('			buttons: false,')
		.appendLine('			timer: 4000 ')
		.appendLine('			});')
		.appendLine('}  ')
		.appendLine('	});')
		.appendLine(' ')
		// Habilitar el Tooltips en los botones
		.appendLine('$(function () {')
		.appendLine('  $(\'[data-toggle="tooltip"]\').tooltip()')
		.appendLine('});')
		
		.appendLine('});')
		.appendLine('</script>')
	
		.appendLine('</div>')
		.appendLine('');
	
	exports.GetHTMLsys(block, a_resp);
} // Mtto_resetpass

GetPrimaryKey = function (a_entity)
{
	// Recibe la entidad a la cual se le desea calcula la Primary Key
	// Devuelve una cadena conteniendo la estructura de la PK

	if (settings.servConfig.debug){console.log("Procesando HttpMsgs GetPrimaryKey");}
	
	var l_pk = [];
	for (var i = 0; i< a_entity.primary_key.length; i++)
	{ for (var j = 0; j< a_entity.columns.length; j++)
		{ 
			if ( a_entity.columns[j].col === a_entity.primary_key[i])
			{ l_pk.push('table.row(".selected").data()[' + j + ']' );}
		}
	}
	
	return (l_pk);
}

