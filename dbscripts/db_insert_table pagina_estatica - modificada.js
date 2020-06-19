var mysql      = require('mysql');
var settings = require('../js/settings');

var con = mysql.createConnection({
  host     : settings.dbConfig.host,
  user     : settings.dbConfig.user,
  password : settings.dbConfig.password,
  database : settings.dbConfig.database
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //Make SQL statement:
  var sql = "INSERT INTO pagina_estatica (id, titulo, contenido) VALUES ?";

  //Make an array of values:
  var values = [
    [01, 'Información', '<p>Somos un grupo de tecnicos informaticos, apasionados por colaborar<br>'+
						'<ul>'+
						'<li>La información contenida en nuestro sitio fue desarrollada o resuelta por Resolución.Club y/o Colaboradores</li>'+
						'<li>Los visitantes pueden colaborar con su contenido y Resolución.Club se desvincula de este material y hace responsable al Usuario que la ingreso</li>'+
						'<li>Nuestros Servidores no alojan material descargable</li>'+
						'</ul></p>'],
    [02, 'Politica de Privacidad', 
						'<style>body {background-image: url(&quot;/img/stock-photo-78152441.jpg&quot;);color:white;}</style>'+
						'<div class=&quot;container&quot;>' +
						'<h2>Servicio de Subscriptores</h2>'+
						'Toda información considerada sencible o personal, entiendase Nombre, correo electronico, cuenta de redes sociales es considerada de confidencialidad y NO es compartida con terceros.<br>'+
						'La ética informática exige que un Profesional IT, debe procurar garantizar la Confidencialidad, Integridad de dato y Autenticidad de la información de un visitante a nuestro sito web. Se realizara lo que en nuestras alcanze de capacidades tecnicas se encuentre para garantizarlo'+
						'<h2>Publicidad y Marketing dentro de nuestro Sitio Web</h2>'+
						'Nuestro sitio también puede albergar publicidad propia, de afiliados, o de redes publicitarias. Esta publicidad se muestra mediante servidores publicitarios que también utilizan cookies para mostrar contenidos publicitarios afines a los usuarios. Cada uno de estos servidores publicitarios dispone de su propia política de privacidad, que puede ser consultada en sus propias páginas web.'+
						'<h2>Información Recolectada en Nuestro Sitio Web</h2>'+
						'La información proporcionada por nuestros visitantes, es recolectada con fines estadisticos, analisis de información, gestion de habitos de navegación, incluyendo sus comentarios a nuestras publicaciones y sera considerada bajo dominio de nuestro sitio web y usos que estimemos<br>'+
						'<hr><span class=&quot;badge badge-info&quot;>Nos reservamos el derecho de modificación de la Presente Politica de Privacidad y Terminos del Servicio en cualquier momento, con o sin Previo aviso</span>'+
						'</div>'],
    [03, 'Terminos del Servicio', '<h2>Servicio de Subscriptores</h2>'+
						'Nuestro sitio permite a los visitantes Suscribirse para recibir información relacionada con las publicaciones, de igual forma permite darse de baja de manera que no recibirá nuevos mensajes en el futuro. Después de darse de baja vamos a suspender el envío de mensajes tan pronto como sea técnicamente factible.'+
						'<h2>Acciones De Terceros</h2>'+
						'No nos hacemos responsables de las prácticas empleadas por sitios web vinculados hacia o desde nuestro sitio Web, al igual que la información o contenido que se encuentre en ellos. Resolución.Club sólo le está proporcionando información. Los administradores no se hacen responsables por el contenido de cualquier sitio vinculado a este, como cambios o actualizaciones de tales sitios. Por favor recuerde que cuando usted utiliza un enlace para ir desde nuestro sitio Web a otro sitio Web, nuestra Política de Privacidad ya no está en efecto.'+
						'<h2>Publicidad y Marketing dentro de nuestro Sitio Web</h2>'+
						'Una forma de mantener a flote nuestros servicios es la publicidad, agradecemos su comprencion y apoyo'+
						'Es posible que estas empresas usen la información que obtienen de sus visitas a este y otros sitios web (sin incluir informacion considerada sencible como su nombre, direccion, correo electronico, cuentas de redes sociales) para ofrecerle anuncios sobre productos y servicios que le resulten de interés.'+
						'<h2>Utilizacion de Cookies</h2>'+
						'El acceso a este sitio web puede implicar la utilización de cookies. Las cookies son pequeñas cantidades de información que se almacenan en el navegador utilizado por cada usuario para que el servidor recuerde cierta información que posteriormente pueda utilizar. Esta información permite identificarle a usted como un usuario concreto y permite guardar sus preferencias personales, así como información técnica como puedan ser visitas o páginas concretas que visite.'+
						'<h2>Conducta de los Visitantes</h2>'+
						'Se fomenta el respeto y cortesia entre los visitantes, opinar con propiedad, los administradores pueden expulsar a cualquier usuario que consideren con actividad maliciosa o irresponsable'+
						'<h2>Calidad del Contenido</h2>'+
						'Resolución.Club y/o sus respectivos colaboradores no se hacen responsables de que la información contenida en este website sean útiles para un propósito concreto. Todo el contenido en este sitio web es sólo con fines educativos.'+
						'Ninguno de los títulos que figuran en esta página web hace referencia alguna a archivos alojados en nuestro servidor, sencillamente recopilamos información que está disponible en internet. La mencionada información se publica tal y como sobreviene, sin garantías de ninguna clase.'+
						'Muchos de los problemas son solucionados por Resolución.Club y/o sus respectivos colaboradores NO se hacen responsables de que la información contenida sea valida o correcta'+
						'En ningún caso Resolución.Club se hará responsable por ningún daño especial indirecto o consecuencial que se derive de la imposibilidad de su uso.<br>'+
						'<hr><span class=&quot;badge badge-info&quot;>Nos reservamos el derecho de modificación de la Presente Politica de Privacidad y Terminos del Servicio en cualquier momento, con o sin Previo aviso</span>'],
	[04, 'Donaciones',
						'<style>body {background-image: url(&quot;/img/stock-photo-78152441.jpg&quot;);color:white;}</style>' +
						'<style> .cse .gsc-control-cse,.gsc-control-cse, .gcse { background-color:transparent !important; border-style:none; }</style>' +
						'<div class=&quot;text-center&quot;>' +
						'	<div class=&quot;cover-container d-flex w-100 h-100 p-3 mx-auto flex-column&quot;>' +
						'' +
						'	<main role=&quot;main&quot; class=&quot;inner cover&quot;>' +
						'	<h1 class=&quot;cover-heading&quot;>Tu puedes ayudarnos</h1>' +
						'	<p class=&quot;lead&quot; >Puedes realizar una donación a las siguientes cuentas bancarias</p>'+
						'<div class=&quot;card-deck&quot;>' +
						'<div class=&quot;card text-white bg-transparent &quot;>' +  //mb-4" style="max-width: 20rem;
						'  <div class=&quot;card-header&quot;><h1 class=&quot;cover-heading&quot;>Banco de America Central, S.A.</h1></div>' +
						'  <div class=&quot;card-body&quot;>' +
						'    <p class=&quot;card-text&quot;>A nombre:</p>' +
						'    <h4 class=&quot;card-title&quot;>Asociación de Familiares Alzheimer de El Salvador</h4>' +
						'	<p class=&quot;lead&quot;> Cuenta Corriente: 201122686 </p>' +
						'  </div>' +
						'</div>' +
						'<div class=&quot;card text-white bg-transparent &quot;>' +  //mb-4" style="max-width: 20rem;
						'  <div class=&quot;card-header&quot;><h1 class=&quot;cover-heading&quot;>Banco de America Central, S.A.</h1></div>' +
						'  <div class=&quot;card-body&quot;>' +
						'    <p class=&quot;card-text&quot;>A nombre:</p>' +
						'    <h4 class=&quot;card-title&quot;>Asociación de Familiares Alzheimer de El Salvador</h4>' +
						'	<p class=&quot;lead&quot;> Cuenta de Ahorros: 114091648 </p>' +
						'  </div>' +
						'</div>' +
						'<div class=&quot;card text-white bg-transparent &quot;>' + //mb-4" style="max-width: 20rem;
						'  <div class=&quot;card-header bg-dark&quot;><h1 class=&quot;cover-heading&quot;>Colaboradores</h1></div>' +
						'  <div class=&quot;card-body&quot;>' +
						'    <h4 class=&quot;card-title&quot;>Tu puedes hacer la diferencia</h4>' +
						'    <p class=&quot;card-text&quot;>Si deseas colaborar con nuestros proyectos y eventos, nunca esta de mas una mano amiga</p>' +
						'	 <a href=&quot;/contacto&quot; class=&quot;btn btn-lg btn-secondary&quot;>Contáctanos</a>' +
						'  </div>' +
						'</div>' +
						'</div>' +
						'  </main>' +
						'  <br><br>' +
						'  <footer class=&quot;mastfoot mt-auto&quot;>' +
						'	<div class=&quot;inner&quot;>' +
						'	  <p>Puedes también contactarnos por nuestro correo electronico <b>Asociacion@AlzheimerElSalvador.Org</b></p>' +
						'	</div>' +
						'  </footer>' +
						'</div>' +
						'</div>' 
						
						],
	[05, 'Contáctanos',
						'<style>body {background-image: url(&quot;/img/stock-photo-133415415.jpg&quot;);color:white;}</style>' +
						'<style> .cse .gsc-control-cse,.gsc-control-cse, .gcse { background-color:transparent !important; border-style:none; }</style>' +
						'<br><br>' +
						'<div class=&quot;container&quot;>' +
						'<ul class=&quot;nav nav-tabs&quot;>' +
						'  <li class=&quot;nav-item&quot;>' +
						'    <a class=&quot;nav-link bg-light active show&quot; data-toggle=&quot;tab&quot; href=&quot;#GrupoApoyo&quot;>Grupo de Apoyo Alzheimer</a>' +
						'  </li>' +
						'  <li class=&quot;nav-item&quot;>' +
						'    <a class=&quot;nav-link bg-light&quot; data-toggle=&quot;tab&quot; href=&quot;#OficinaCentral&quot;>Oficina Central</a>' +
						'  </li>' +
						'  <li class=&quot;nav-item&quot;>' +
						'    <a class=&quot;nav-link bg-light&quot; data-toggle=&quot;tab&quot; href=&quot;#OficinaSanMiguel&quot;>Oficina San Miguel</a>' +
						'  </li>' +
						'</ul>' +

						'<div id=&quot;myTabContent&quot; class=&quot;tab-content&quot;>' +
						'  <div class=&quot;tab-pane fade active show&quot; id=&quot;GrupoApoyo&quot;>' +

												'<div class=&quot;container animated zoomIn&quot;>' +
												'	<div class=&quot;row&quot;>' +
												'			<div class=&quot;col-sm-6 col-md-6&quot;>' +
												'				<h3>Grupo de Apoyo Alzheimer</h3>' +
												'				<address>' +
												'					<p>' +
												'						<b>Reuniones mensuales:</b> último sábado de cada mes<br />' +
												'						<b>Lugar:</b> Auditorio del Hospital Policlínico Arce del ISSS, Calle Arce, Entre 23 y 21 Avenida Norte, SS, El Salvador<br />' +
												'						<b>Hora:</b> 8:00 am a 12:00 md.<br />' +
												'						<abbr title=&quot;Phone&quot;><b>Tel.:</b></abbr> (503) 2237-0787 Oficina<br />' +
												'						<abbr title=&quot;Phone&quot;><b>Cel.:</b></abbr> (503) 7947-4979 WhatsApp<br />' +
												'						<b>Asociación:</b> <a href=&quot;mailto:AlzheimerElSalvador21@gmail.com&quot;>AlzheimerElSalvador21@gmail.com</a><br />' +
												'					</p>' +
												'				</address>' +
												'			</div>' +
												'			<div class=&quot;col-sm-6 col-md-6&quot;>' +
												'				<div class=&quot;well container-fluid text-center&quot; id=&quot;map1&quot; style=&quot;width:auto;height:350px;&quot;></div>' +
												'			</div>' +
												'	</div>' +
												'</div>' +
												
						'  </div>' +
						'  <div class=&quot;tab-pane fade&quot; id=&quot;OficinaCentral&quot;>' +

												'<div class=&quot;container animated zoomIn&quot;>' +
												'	<div class=&quot;row&quot;>' +
												'			<div class=&quot;col-sm-6 col-md-6&quot;>' +
												'				<h3>Oficina Central</h3>' +
												'				<address>' +
												'					<p>' +
												'						<b>Lugar:</b> Asilo Sara Zaldivar, Instituto Salvadoreno de Rehabilitacion de Invalidos, Avenida Irazu, SS, El Salvador<br />' +
												'						<br />' +
												'						<abbr title=&quot;Phone&quot;><b>Tel.:</b></abbr> (503) 2237-0787 Oficina<br />' +
												'						<abbr title=&quot;Phone&quot;><b>Cel.:</b></abbr> (503) 7947-4979 WhatsApp<br />' +
												'						<b>Asociación:</b> <a href=&quot;mailto:AlzheimerElSalvador21@gmail.com&quot;>AlzheimerElSalvador21@gmail.com</a><br />' +
												'					</p>' +
												'				</address>' +
												'' +
												'			</div>' +
												'' +
												'			<div class=&quot;col-sm-6 col-md-6&quot;>' +
												'				<div class=&quot;well container-fluid text-center&quot; id=&quot;map2&quot; style=&quot;width:auto;height:350px;&quot;></div>' +
												'			</div>' +
												'	</div>' +
												'</div>' +
												
						'  </div>' +
						'  <div class=&quot;tab-pane fade&quot; id=&quot;OficinaSanMiguel&quot;>' +

												'<div class=&quot;container animated zoomIn&quot;>' +
												'	<div class=&quot;row&quot;>' +
												'			<div class=&quot;col-sm-6 col-md-6&quot;>' +
												'				<h3>Oficina San Miguel</h3>' +
												'				<address>' +
												'					<p>' +
												'						<b>Lugar:</b> Asilo San Antonio, 3a Calle Poniente, 4a Avenida Sur, Hospital en San Miguel, El Salvador<br />' +
												'						<b>Referencia:</b> Esquina Opuesta a la Escuela Santa Sofia<br />' +
												'						<br />' +
												'						<abbr title=&quot;Phone&quot;><b>Tel.:</b></abbr> (503) 2661-5961 Oficina<br />' +
												'						<abbr title=&quot;Phone&quot;><b>Cel.:</b></abbr> (503) 7495-4616 Mobil<br />' +
												'						<b>Asociación:</b> <a href=&quot;mailto:AlzheimerElSalvador21@gmail.com&quot;>AlzheimerElSalvador21@gmail.com</a><br />' +
												'					</p>' +
												'				</address>' +
												'' +
												'			</div>' +
												'' +
												'			<div class=&quot;col-sm-6 col-md-6&quot;>' +
												'				<div class=&quot;well container-fluid text-center&quot; id=&quot;map3&quot; style=&quot;width:auto;height:350px;&quot;></div>' +
												'			</div>' +
												'	</div>' +
												'</div>' +

						'  </div>' +
						'</div>' +
						
						'</div><br><br>' +
						'' +
						'<script src=&quot;https://maps.googleapis.com/maps/api/js?key=AIzaSyCCL_UtPnWKOxSn2e5r3r3VMpV-o9sknJw&callback=myMap&quot;></script>' +
						'' +
						'<script>' +
						'(function(i,s,o,g,r,a,m){i[&quot;GoogleAnalyticsObject&quot;]=r;i[r]=i[r]||function(){' +
						'(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),' +
						'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)' +
						'})(window,document,&quot;script&quot;,&quot;https://www.google-analytics.com/analytics.js&quot;,&quot;ga&quot;);' +
						'' +
						'ga(&quot;create&quot;, &quot;UA-99359896-1&quot;, &quot;auto&quot;);' +
						'ga(&quot;send&quot;, &quot;pageview&quot;);' +
						'' +
						'</script>' +
						'' +						
						'<script>' +
						'	$(document).ready(function () {' +
						'		myMap();' +
						'	});' +
						'' +
						'	function myMap()' +
						'	{' +
						'		var mapCanvas1 = document.getElementById(&quot;map1&quot;);' +
						'		var myCenter1 = new google.maps.LatLng(13.700526, -89.203270);' +
						'		var mapOptions1 = {' +
						'			center: myCenter1,' +
						'			zoom: 16,' +
						'			draggable: true,' +
						'			mapTypeId: google.maps.MapTypeId.ROADMAP' +
						'		};' +
						'		var map1 = new google.maps.Map(mapCanvas1, mapOptions1);' +
						'		var marker1 = new google.maps.Marker({' +
						'			position: myCenter1,' +
						'			animation: google.maps.Animation.BOUNCE' +
						'		});' +
						'' +
						'		var mapCanvas2 = document.getElementById(&quot;map2&quot;);' +
						'		var myCenter2 = new google.maps.LatLng(13.679667, -89.1978229);' +
						'		var mapOptions2 = {' +
						'			center: myCenter2,' +
						'			zoom: 15,' +
						'			draggable: true,' +
						'			mapTypeId: google.maps.MapTypeId.ROADMAP' +
						'		};' +
						'		var map2 = new google.maps.Map(mapCanvas2, mapOptions2);' +
						'		var marker2 = new google.maps.Marker({' +
						'			position: myCenter2,' +
						'			animation: google.maps.Animation.BOUNCE' +
						'		});' +
						'' +
						'		var mapCanvas3 = document.getElementById(&quot;map3&quot;);' +
						'		var myCenter3 = new google.maps.LatLng(13.4798528, -88.1745664);' +
						'		var mapOptions3 = {' +
						'			center: myCenter3,' +
						'			zoom: 16,' +
						'			draggable: true,' +
						'			mapTypeId: google.maps.MapTypeId.ROADMAP' +
						'		};' +
						'		var map3 = new google.maps.Map(mapCanvas3, mapOptions3);' +
						'		var marker3 = new google.maps.Marker({' +
						'			position: myCenter3,' +
						'			animation: google.maps.Animation.BOUNCE' +
						'		});' +
						'' +
						'		marker3.setMap(map3);' +
						'		marker2.setMap(map2);' +
						'		marker1.setMap(map1);' +
						'' +
						'	}' +
						'</script>']
];
  //Execute the SQL statement, with the value array:
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});


