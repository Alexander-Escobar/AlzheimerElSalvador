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

exports.showHead = function(a_sb_head)
{
	if (settings.servConfig.debug){console.log("Procesando HttpMsgs Head");}
	
	var initTag, endTag, tag, attr, lorem;
 
	initTag = '<{0}>';
	endTag = '</{0}>';
	tag = '{0}{{1}}{1}'.format(initTag, endTag);
	attr = '{0}="{1}"';
	
 	// Creando el Encabezado 
	a_sb_head
		// <!-- Meta -->
		.appendLine(tag.format('title', settings.Title))
		.appendLine('<meta {0}>', attr.format('charset', 'UTF-8'))
		.appendLine('<meta {0} {1}>', attr.format('name', 'viewport'), attr.format('content', 'width=device-width, initial-scale=1, shrink-to-fit=no'))
		.appendLine('<meta {0} {1} >', attr.format('name', 'description'),attr.format('content', settings.Description))
		.appendLine('<meta {0} {1} >', attr.format('name', 'keywords'),attr.format('content', settings.keywords))
		.appendLine('<meta {0} {1} >', attr.format('name', 'author'),attr.format('content', settings.author))
		//.appendLine('<meta {0} {1} >', attr.format('http-equiv', 'Cache-Control'),attr.format('content', settings.httpConfig.cache_control))

		// <!-- CSS -->
		// font-awesome.css		[local] V 4.7 editado
		// animate.css			[nube]	V 3.6.2 https://raw.githubusercontent.com/daneden/animate.css/master/animate.css
		// bootstrap.min.css	[nube] V 4.1.2
		// style.css			[local]
		
		//<link href="./css/font-awesome.css" rel="stylesheet">
		.appendLine('<link {0} {1}>', attr.format('rel', 'stylesheet'), attr.format('href', '/css/font-awesome.css'))
		.appendLine('<link {0} {1}>', attr.format('rel', 'stylesheet'), attr.format('href', '/css/animate.css'))
		
		// Bootstrap Version Standar
		//.appendLine('<link {0} {1}>', attr.format('rel', 'stylesheet'), attr.format('href', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css'))
		.appendLine('<link {0} {1}>', attr.format('rel', 'stylesheet'), attr.format('href', 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.2/materia/bootstrap.min.css'))
		.appendLine('<link {0} {1}>', attr.format('rel', 'stylesheet'), attr.format('href', '/css/style.css'))
		
		// <!-- JavaScript -->
		// jquery-3.3.1.min.js	[nube] V 3.3.1
		// popper.js			[nube] V 1.14.3
		// bootstrap.min.js		[nube] V 4.1.2
		// sweetalert.min.js	[nube]
		// sidebar				[local] Barra de Menu Lateral "SideBar Menu"
		// holder.js			[local] v 2.9.0+f2dkw Manejo de Imagenes
		
		//.appendLine('<script {0} {1}></script>', attr.format('src', '/js/jquery-3.2.1.min.js'), attr.format('type', 'text/javascript'))
		.appendLine('<script {0} {1}></script>', attr.format('src', 'https://code.jquery.com/jquery-3.3.1.slim.min.js'), attr.format('type', 'text/javascript'))
		.appendLine('<script {0} {1}></script>', attr.format('src', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js'), attr.format('type', 'text/javascript'))
		.appendLine('<script {0} {1}></script>', attr.format('src', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js'), attr.format('type', 'text/javascript'))
		//.appendLine('<script {0} {1}></script>', attr.format('src', 'https://unpkg.com/sweetalert/dist/sweetalert.min.js'), attr.format('type', 'text/javascript'))
		.appendLine('<script {0} {1}></script>', attr.format('src', '/js/holder.min.js'), attr.format('type', 'text/javascript'))
		
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
//.appendLine('      <li class="nav-item">')
//.appendLine('        <a class="nav-link" href="/boletin"><i class="fa fa-bullhorn" aria-hidden="true"></i> Boletin</a>')
//.appendLine('      </li>')
//.appendLine('      <li class="nav-item">')
//.appendLine('        <a class="nav-link" href="/evento"><i class="fa fa-calendar" aria-hidden="true"></i> Eventos</a>')
//.appendLine('      </li>')
.appendLine('      <li class="nav-item">')
.appendLine('        <a class="nav-link" href="/donacion"><i class="fa fa-heart" aria-hidden="true"></i> Donaciones</a>')
.appendLine('      </li>')
.appendLine('      <li class="nav-item">')
.appendLine('        <a class="nav-link" href="/contacto"><i class="fa fa-map-marker" aria-hidden="true"></i> Contactanos</a>')
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
		.appendLine('							<div class="headline"><h2>Contactanos</h2></div>')
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
			//.appendLine('      <li class="sidebar-nav-item moe">')
			//.appendLine('        <i class="sidebar-nav-item-icon fa fa-bullhorn"></i><a class="sidebar-nav-item-zelda moe" href="/boletin">Boletin</a>')
			//.appendLine('      </li>')
			//.appendLine('      <li class="sidebar-nav-item moe">')
			//.appendLine('        <i class="sidebar-nav-item-icon fa fa-calendar"></i><a class="sidebar-nav-item-zelda moe" href="/evento">Eventos</a>')
			//.appendLine('      </li>')
			.appendLine('      <li class="sidebar-nav-item moe">')
			.appendLine('        <i class="sidebar-nav-item-icon fa fa-heart"></i><a class="sidebar-nav-item-zelda moe" href="/donacion">Donaciones</a>')
			.appendLine('      </li>')
			.appendLine('      <li class="sidebar-nav-item moe">')
			.appendLine('        <i class="sidebar-nav-item-icon fa fa-map-marker"></i><a class="sidebar-nav-item-zelda moe" href="/contacto">Contactanos</a>')
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
        .appendLine('<div class="collapse miniblock" id="demo">')
        .appendLine('    <!--<h3 class="text-left">Conoce Mas de Nosotros</h3>-->')
        .appendLine('    <ul class="nav nav-tabs">')
        .appendLine('        <li class="active"><a data-toggle="tab" href="#Grupo">Nuestros Datos</a></li>')
        .appendLine('        <li><a data-toggle="tab" href="#Mision">Mision</a></li>')
        .appendLine('        <li><a data-toggle="tab" href="#Vision">Vision</a></li>')
        .appendLine('    </ul>')
        .appendLine('')
        .appendLine('    <div class="tab-content">')
        .appendLine('        <div id="Grupo" class="tab-pane fade in active">')
        .appendLine('            <h2 class="text_intro">Grupo de Apoyo Alzheimer</h2>')
        .appendLine('            <p class="text_intro">')
        .appendLine('                Reuniones mensuales: último sábado de cada mes<br />')
        .appendLine('                Lugar: Auditorio del Hospital Policlínico Arce del ISSS<br />')
        .appendLine('                Hora: 8:00 am a 12:00 md.<br />')
        .appendLine('                San Salvador<br />')
        .appendLine('                Tel.: (503) 2237-0787 Oficina<br />')
        .appendLine('                Cel.: (503) 7947-4979 WhatsApp<br />')
        .appendLine('            </p>')
        .appendLine('        </div>')
        .appendLine('        <div id="Mision" class="tab-pane fade">')
        .appendLine('            <h2 class="text_intro">Nuestra Misión</h2>')
        .appendLine('            <p class="text_intro text-justify">Somos una Asociación <b>NO</b> Gubernamental sin Fines de Lucro con la finalidad de impulsar la atención integral y especializada en Alzheimer y otras demencias mediante investigaciones sobre Alzheimer, la planificación, organización y coordinación de programas y servicios de apoyo a pacientes, familias, cuidadores y sociedad en general.</p>')
        .appendLine('        </div>')
        .appendLine('        <div id="Vision" class="tab-pane fade">')
        .appendLine('            <h2 class="text_intro">Nuestra Visión</h2>')
        .appendLine('            <p class="text_intro text-justify">')
        .appendLine('                La Asociación de Familiares de pacientes Alzheimer de El Salvador tiene la visión de contribuir al reto de tratar e informar sobre la enfermedad de Alzheimer y las demencias en general y a mejorar la calidad de vida tanto de pacientes como de las familias y cuidadores afectados.')
        .appendLine('                Así mismo La Asociación de Familiares de pacientes Alzheimer de El Salvador trata de ser una Entidad en el tratamiento, investigación, manejo y la prevención de esta enfermedad organizando grupos de apoyo en la sociedad salvadoreña y así fortalecer nuestra organización con pilares sólidos representativos y transparentes en la prestación y creación de servicios de calidad para los afectados.')
        .appendLine('            </p>')
        .appendLine('        </div>')
        .appendLine('    </div>')
        .appendLine('</div>')


		for (var i=0; i < a_data.length; i++)
		{
			
		}
	}

	exports.GetHTMLStandar(l_block, a_resp, 200, "");
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
	var l_i = 0;

	if (a_data)
	{
		for (var i=0; i < a_data.length; i++)
		{
			if (l_i == 0) 
			{
				l_block.append('\t')
					.appendLine('<div class="card-deck">');
			}
		
			l_block
				.appendLine('	<div class="card">')
				//.appendLine('		<img class="card-img-top rounded" src="' + a_data[i].imagen + '" alt="Card image cap" >')
				.appendLine('		<div class="card-body">')
				.appendLine('			<h5 class="card-title">' + a_data[i].titulo + '</h5>')
				//.appendLine('			<span class="badge badge-secondary">'+ a_data[i].volumen +'</span>')
				//.appendLine('			<small class="text-muted">' + a_data[i].autor + '</small>')
				//.appendLine('			<p class="card-text">' + a_data[i].introduccion.substring(0, 200) + '...</p>')
				.appendLine('		</div>')
				.appendLine('		<div class="card-footer">')
				.appendLine('			<a href="/categoria/' + a_data[i].id + '" class="btn btn-primary"><span class="fa fa-book"></span> ' + a_data[i].titulo + '</a>')
				.appendLine('		</div>')
				.appendLine('	</div>');
			
			l_i++;
			
			if (l_i == 3)
			{
				l_block.appendLine('</div><hr>'); //"card-deck"
				l_i = 0;
			}
			
		}
	}

	if (l_i != 0)
	{
		for (var l_x=0; l_x < 3 - l_i; l_x++)
		{
			l_block
				.appendLine('  <div class="card">')
				.appendLine('  </div>');
		}
		l_block.appendLine('</div>');	//"card-deck"
	}
	
l_block
.appendLine('    <div class="container">')
.appendLine('      <header class="blog-header py-3">')
.appendLine('        <div class="row flex-nowrap justify-content-between align-items-center">')
.appendLine('          <div class="col-4 pt-1">')
.appendLine('            <a class="text-muted" href="/boletin"><i class="fa fa-home fa-2x" aria-hidden="true"></i></a>')
.appendLine('          </div>')
.appendLine('          <div class="col-4 text-center">')
.appendLine('            <a class="blog-header-logo text-dark" href="/">Alzheimer<span class="badge badge-pill badge-secondary">El Salvador</span></a>')
.appendLine('          </div>')
.appendLine('          <div class="col-4 d-flex justify-content-end align-items-center">')
//.appendLine('            <a class="btn btn-sm btn-outline-secondary" href="#">Subscribe</a>')
//.appendLine('            <a class="btn btn-sm btn-outline-secondary" href="#">Sign up</a>')
.appendLine('          </div>')
.appendLine('        </div>')
.appendLine('      </header>')
.appendLine('')
.appendLine('  <br>')
.appendLine('')
.appendLine('      <div class="jumbotron p-3 p-md-5 text-white rounded bg-dark">')
.appendLine('        <div class="col-md-6 px-0">')
.appendLine('          <h1 class="display-4 font-italic">Title of a longer featured blog post</h1>')
.appendLine('          <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about whats most interesting in this posts contents.</p>')
.appendLine('          <p class="lead mb-0"><a href="#" class="text-white font-weight-bold">Continue reading...</a></p>')
.appendLine('        </div>')
.appendLine('      </div>')
.appendLine('')
.appendLine('      <div class="row mb-2">')
.appendLine('        <div class="col-md-6">')
.appendLine('          <div class="card flex-md-row mb-4 box-shadow h-md-250">')
.appendLine('            <div class="card-body d-flex flex-column align-items-start">')
.appendLine('              <strong class="d-inline-block mb-2 text-primary">World</strong>')
.appendLine('              <h3 class="mb-0">')
.appendLine('                <a class="text-dark" href="#">Featured post</a>')
.appendLine('              </h3>')
.appendLine('              <div class="mb-1 text-muted">Nov 12</div>')
.appendLine('              <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>')
.appendLine('              <a href="#">Continue reading</a>')
.appendLine('            </div>')
.appendLine('            <img class="card-img-right flex-auto d-none d-lg-block" data-src="holder.js/200x250?theme=thumb" alt="Card image cap">')
.appendLine('          </div>')
.appendLine('        </div>')
.appendLine('        <div class="col-md-6">')
.appendLine('          <div class="card flex-md-row mb-4 box-shadow h-md-250">')
.appendLine('            <div class="card-body d-flex flex-column align-items-start">')
.appendLine('              <strong class="d-inline-block mb-2 text-success">Design</strong>')
.appendLine('              <h3 class="mb-0">')
.appendLine('                <a class="text-dark" href="#">Post title</a>')
.appendLine('              </h3>')
.appendLine('              <div class="mb-1 text-muted">Nov 11</div>')
.appendLine('              <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>')
.appendLine('              <a href="#">Continue reading</a>')
.appendLine('            </div>')
.appendLine('            <img class="card-img-right flex-auto d-none d-lg-block" data-src="holder.js/200x250?theme=thumb" alt="Card image cap">')
.appendLine('          </div>')
.appendLine('        </div>')
.appendLine('      </div>')
.appendLine('    </div>')
.appendLine('')
.appendLine('    <main role="main" class="container">')
.appendLine('      <div class="row">')
.appendLine('        <div class="col-md-8 blog-main">')
.appendLine('          <h3 class="pb-3 mb-4 font-italic border-bottom">')
.appendLine('            From the Firehose')
.appendLine('          </h3>')
.appendLine('')
.appendLine('          <div class="blog-post">')
.appendLine('            <h2 class="blog-post-title">Sample blog post</h2>')
.appendLine('            <p class="blog-post-meta">January 1, 2014 by <a href="#">Mark</a></p>')
.appendLine('')
.appendLine('            <p>This blog post shows a few different types of content thats supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>')
.appendLine('            <hr>')
.appendLine('            <p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>')
.appendLine('            <blockquote>')
.appendLine('              <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>')
.appendLine('            </blockquote>')
.appendLine('            <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>')
.appendLine('            <h2>Heading</h2>')
.appendLine('            <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>')
.appendLine('            <h3>Sub-heading</h3>')
.appendLine('            <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>')
.appendLine('            <pre><code>Example code block</code></pre>')
.appendLine('            <p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>')
.appendLine('            <h3>Sub-heading</h3>')
.appendLine('            <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>')
.appendLine('            <ul>')
.appendLine('              <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>')
.appendLine('              <li>Donec id elit non mi porta gravida at eget metus.</li>')
.appendLine('              <li>Nulla vitae elit libero, a pharetra augue.</li>')
.appendLine('            </ul>')
.appendLine('            <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>')
.appendLine('            <ol>')
.appendLine('              <li>Vestibulum id ligula porta felis euismod semper.</li>')
.appendLine('              <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>')
.appendLine('              <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>')
.appendLine('            </ol>')
.appendLine('            <p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>')
.appendLine('          </div><!-- /.blog-post -->')
.appendLine('')
.appendLine('          <div class="blog-post">')
.appendLine('            <h2 class="blog-post-title">Another blog post</h2>')
.appendLine('            <p class="blog-post-meta">December 23, 2013 by <a href="#">Jacob</a></p>')
.appendLine('')
.appendLine('            <p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>')
.appendLine('            <blockquote>')
.appendLine('              <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>')
.appendLine('            </blockquote>')
.appendLine('            <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>')
.appendLine('            <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>')
.appendLine('          </div><!-- /.blog-post -->')
.appendLine('')
.appendLine('          <div class="blog-post">')
.appendLine('            <h2 class="blog-post-title">New feature</h2>')
.appendLine('            <p class="blog-post-meta">December 14, 2013 by <a href="#">Chris</a></p>')
.appendLine('')
.appendLine('            <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>')
.appendLine('            <ul>')
.appendLine('              <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>')
.appendLine('              <li>Donec id elit non mi porta gravida at eget metus.</li>')
.appendLine('              <li>Nulla vitae elit libero, a pharetra augue.</li>')
.appendLine('            </ul>')
.appendLine('            <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>')
.appendLine('            <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>')
.appendLine('          </div><!-- /.blog-post -->')
.appendLine('')
.appendLine('          <nav class="blog-pagination">')
.appendLine('            <a class="btn btn-outline-primary" href="#">Older</a>')
.appendLine('            <a class="btn btn-outline-secondary disabled" href="#">Newer</a>')
.appendLine('          </nav>')
.appendLine('')
.appendLine('        </div><!-- /.blog-main -->')
.appendLine('')
.appendLine('        <aside class="col-md-4 blog-sidebar">')
.appendLine('          <div class="p-3 mb-3 bg-light rounded">')
.appendLine('            <h4 class="font-italic">About</h4>')
.appendLine('            <p class="mb-0">Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>')
.appendLine('          </div>')
.appendLine('')
.appendLine('          <div class="p-3">')
.appendLine('            <h4 class="font-italic">Archives</h4>')
.appendLine('            <ol class="list-unstyled mb-0">')
.appendLine('              <li><a href="#">March 2014</a></li>')
.appendLine('              <li><a href="#">February 2014</a></li>')
.appendLine('              <li><a href="#">January 2014</a></li>')
.appendLine('              <li><a href="#">December 2013</a></li>')
.appendLine('              <li><a href="#">November 2013</a></li>')
.appendLine('              <li><a href="#">October 2013</a></li>')
.appendLine('              <li><a href="#">September 2013</a></li>')
.appendLine('              <li><a href="#">August 2013</a></li>')
.appendLine('              <li><a href="#">July 2013</a></li>')
.appendLine('              <li><a href="#">June 2013</a></li>')
.appendLine('              <li><a href="#">May 2013</a></li>')
.appendLine('              <li><a href="#">April 2013</a></li>')
.appendLine('            </ol>')
.appendLine('          </div>')
.appendLine('')
.appendLine('          <div class="p-3">')
.appendLine('            <h4 class="font-italic">Elsewhere</h4>')
.appendLine('            <ol class="list-unstyled">')
.appendLine('              <li><a href="#">GitHub</a></li>')
.appendLine('              <li><a href="#">Twitter</a></li>')
.appendLine('              <li><a href="#">Facebook</a></li>')
.appendLine('            </ol>')
.appendLine('          </div>')
.appendLine('        </aside><!-- /.blog-sidebar -->')
.appendLine('')
.appendLine('      </div><!-- /.row -->')
.appendLine('')
.appendLine('    </main><!-- /.container -->')
.appendLine('')
.appendLine('    <footer class="blog-footer">')
.appendLine('      <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>')
.appendLine('      <p>')
.appendLine('        <a href="#">Back to top</a>')
.appendLine('      </p>')
.appendLine('    </footer>')
.appendLine('')
.appendLine('    <!-- Bootstrap core JavaScript')
.appendLine('    ================================================== -->')
.appendLine('    <!-- Placed at the end of the document so the pages load faster -->')
//.appendLine('    <script>window.jQuery || document.write(\'<script src="/js/jquery-3.3.1.slim.min.js"></script>\')</script>')
.appendLine('    <script>')
.appendLine('      Holder.addTheme(\'thumb\', {')
.appendLine('        bg: \'#55595c\',')
.appendLine('        fg: \'#eceeef\',')
.appendLine('        text: "Thumbnail"')
.appendLine('      });')
.appendLine('    </script>')

.appendLine('<link href="https://fonts.googleapis.com/css?family=Playfair+Display:700,900" rel="stylesheet">');
	
	exports.GetHTMLStandar(l_block, a_resp, 200, "");
}	//showBoletinList

exports.showPublicacion = function(a_req, a_resp, a_data)
{
    if (settings.servConfig.debug){console.log("Procesando HttpMsgs showPublicacion");}

	//var sb = new StringBuilder({newline: "\r\n"});
	var l_block = new StringBuilder({ newline: '\r\n\t' }); // add a tab at the end
	var l_isbn10 = '';
	var l_isbn13 = '';
	var l_tema = 0;
	var l_tema_ult = 0;
	var l_problema = '', l_problema_div = '';
	var l_problema_nivel = '';
	
	var l_sb_Adds = new StringBuilder({ newline: '\r\n\t' }) // add a tab at the end
	exports.showAdds(l_sb_Adds, "D");
	if (settings.servConfig.debug){console.log(a_data);}
	if (a_data)
	{
		for (var i=0; i < a_data.length; i++)
		{
			if (a_data[i].isbn10) {l_isbn10 = a_data[i].isbn10;} else{l_isbn10 = '';}
			if (a_data[i].isbn13) {l_isbn13 = a_data[i].isbn13;} else{l_isbn13 = '';}
			l_tema = a_data[i].tema;
			
			if (i == 0)
			{
				l_problema_nivel = thermometer(a_data[i].cant_respuesta, a_data[i].cant_problema);

				l_block.append('\t')
					.appendLine('<div class="jumbotron">')
					.appendLine('	<h1 class="display-4">' + a_data[i].titulo + '</h1>')
					.appendLine('	<hr class="my-4">')
					.appendLine('	<div class="inner-results">')
					.appendLine('		<div class="contact-box center-version">')
					.appendLine('			<img alt="image" height="50" width="50" class="img-circle" src="'+ a_data[i].imagen +'">')
					//.appendLine('			<h3 class="m-b-xs"><a href="/libro/'+ a_data[i].id +'">'+ a_data[i].titulo + '</a></h3>')
					//.appendLine('			<span class="badge badge-pill badge-info">' + a_data[i].autor + '</span>')
					.appendLine('			<p class="lead">' + a_data[i].autor + '</p>')
					.appendLine('			<div>' + a_data[i].volumen + ' / <a href="/categoria/' + a_data[i].id_categoria + '">' + a_data[i].catnombre + '</a> / '+ a_data[i].edicion +' / '+ a_data[i].tipnombre +'</div>')
					.appendLine('			<div> ISBN 10:' + l_isbn10 + '</div>')
					.appendLine('			<div> ISBN 13:' + l_isbn13 + '</div>')
					.appendLine('			<br>')
					.appendLine('			<div>'+ a_data[i].descripcion +'</div>')
					.appendLine('			<hr class="my-4">')
					.appendLine('			<div class="contact-box-footer">')
					.appendLine('				<div class="m-t-xs btn-group">')
					.appendLine('					<p class="lead"> ' + a_data[i].cant_respuesta + ' Respuestas / ' + a_data[i].cant_problema + ' Problemas en ' + a_data[i].cant_tema + ' Temas ' + l_problema_nivel + '</p>')
					.appendLine('				</div>')
					.appendLine('			</div>')
					.appendLine('		</div>')
					.appendLine('	</div>')
					.append(l_sb_Adds)
					.appendLine('</div>')
					.appendLine('<div id="TemasAccordion" data-children=".item">')
					.appendLine('');
			}
			
			if (l_tema_ult != l_tema)
			{
				if (l_tema_ult != 0)
				{
					l_block
						// Cerramos el ultimo tema
						.appendLine('			</tbody>')
						.appendLine('			</table>')
						.appendLine('		</div>')	//class="container"
						
						.appendLine('		</div>')
						.appendLine('	</div>');
						// Cerramos el ultimo tema
				}
				
				l_block
					// Abrimos un nuevo tema
					.appendLine('	<div class="item">')
					.appendLine('		<a data-toggle="collapse" data-parent="#TemasAccordion" href="#TemaAccordion' + a_data[i].id + '" role="button" aria-expanded="true" aria-controls="TemaAccordion' + a_data[i].id + '">')
					.appendLine('			' + a_data[i].numeracion + ' | ' + a_data[i].tema )
					.appendLine('		</a>')
					.appendLine('		<div id="TemaAccordion' + a_data[i].id + '" class="collapse" role="tabpanel">')
					
					.appendLine('		<div class="container">')
					.appendLine('			<table class="table table-hover table-sm">') //table-striped
					.appendLine('			<thead>') //class="thead-light"
					.appendLine('				<tr>')
					.appendLine('					<th scope="col"><p class="text-center font-weight-ligh">Numeración</p></th>')
					.appendLine('					<th scope="col"><p class="text-center font-weight-ligh">Viñeta</p></th>')
					//.appendLine('					<th scope="col"><p class="text-center font-weight-ligh">Resolución</p></th>')
					.appendLine('				</tr>')
					.appendLine('			</thead>')
					.appendLine('			<tbody>');
				
				l_tema_ult = l_tema;
			}
			
			l_problema = '';
			if (a_data[i].id_problema) 
			{
				l_problema = pad(a_data[i].numeracion_prob, 8, ' ');
				l_problema = l_problema.replace(/ /g, '&nbsp;');
				if (a_data[i].prob_respuesta > 0)
				{
					l_problema = '<a href="/problema/' + a_data[i].id_problema +'"> ' + l_problema + ' </a>&nbsp;&nbsp;<i class="fa fa-check-square-o color-green" aria-hidden="true"></i>';
				}
				else
				{
					l_problema = '<a href="/problema/' + a_data[i].id_problema +'"> ' + l_problema+ ' </a>&nbsp;&nbsp;<i class="fa fa-window-close-o color-grey" aria-hidden="true"></i>';
				}
			}
			else
			{l_problema = '<i class="fa fa-window-close-o color-grey" aria-hidden="true"></i> NO Definido';}
			
			l_problema_div = '';
			(a_data[i].num_partes > 1)? l_problema_div = ' &nbsp;&nbsp;<span class="fa fa-list-ul color-grey"></span>': l_problema_div = '';
			
			l_block
				.appendLine('				<tr>')
				.appendLine('					<td>' + l_problema + l_problema_div + '</td>')
				.appendLine('					<td>' + a_data[i].vineta + '</td>')
				.appendLine('				</tr>');
		}
	}
	
	l_block
		.appendLine('			</tbody>')
		.appendLine('			</table>')
		.appendLine('		</div>')	//class="container"
		// Cerramos el ultimo tema
		.appendLine('		</div>')	// id="TemaAccordion' + a_data[i].id + '"
		.appendLine('	</div>')		// class="item"
		// Cerramos el ultimo tema
		.appendLine('</div>');	// id="TemasAccordion"
		
	exports.GetHTML(l_block, a_resp);
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

exports.GetHTMLStandar = function(a_sb_body, a_resp, a_code, a_msg)
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

	exports.showHead(head);
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
		//.append(l_sb_NavBar)
		
			// <ADS A>
		//.append(l_sb_Adds)
			// </ADS A>
		
			// <Body Area>
		.append(a_sb_body)

			// </Body Area>
		
		// Categorias
		//.append(l_sb_Footer)
		
		// Analytics
		//.append(l_sb_Analytics)
		
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
    console.log("Procesando HttpMsgs 500: " + err);
	console.log("Peticion a Procesar>> " + req.method.toUpperCase() + " : " + req.url + "<<");
	console.log(BlackList.ipTest(req));
	console.log(req.headers);
	
	var l_My_body = new StringBuilder({ newline: '\r\n\t' });
	
	l_My_body.append('\t')
		
		//	<!--=== Error V5 ===-->
		.appendLine('<div class="container valign__middle">')
		.appendLine('	<a class="logo-a" href="/"><img alt="Resolución.Club" src="/img/name512x120.png"></a>')
		.appendLine('	<h1>500: Internal Error</h1>')			
		.appendLine('	<div class="error-v5">')
		.appendLine('	<p>Sabes ¿por que? se suicido el Libro de Matematicas<br>R/Es que tenia muchos problemas<br><br>...y nos parace que no sera el unico...</p>')
		.appendLine('				<a class="nav-item nav-link" href="/"><span class="fa fa-home"></span> Volver a Home</a>')
		.appendLine('				<a class="nav-item nav-link" href="/categoria"><span class="fa fa-book"></span> Busca en las Categorias</a>')
		.appendLine('				<a class="nav-item nav-link" href="http://facebook.com/Resolucion.club" target="_blank"><span class="fa fa-facebook-square"></span> Visita nuestro grupo en Facebook</a>')
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



