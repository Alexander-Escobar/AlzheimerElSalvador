/*
	Configuracion y Parametrizacion general de la Aplicacion & Sitio Web
	
	Listado:
		dbConfig	Configuracion de la Base de Datos
		servConfig	Configuracion del Servidor
		httpConfig	Configuracion de las Peticiones URL del Protocolo HTTP
		Google		Configuracion para Google Ads
		Image		Configuracion General para las imagenes
		pagConfig	Configuracion de la Paginacion de los Mantenimientos
*/

exports.dbConfig = 
{
    host: "localhost",
    user: "root", // "Owlet"
    password: "P@ssw0rd01", // "Password01"
    database: "DBAlzheimer"
};

exports.servConfig = 
{
	hostname: "",	// "www.AlzheimerElSalvador.org" http://localhost:9000
	webPort: 80,	//  9000
	debug: false
};

exports.httpConfig = 
{
	cache_control: 'max-age=18000',
	headers: [
		//	{type: "meta|link|script",	
		//					** Para Type: "meta"
		//					name: "",				content: "",
		//					http-equiv: "",			charset: "",
		
		//					** Para Type: "link"
		//					rel: "", 				type="text/css",	href: "",
		
		//					** Para Type: "script"
		//					src: "",				type="text/javascript",
		//					
		//					dataPair: "",
		//	},
		
			// <!-- meta standard -->
			//	[0]	charset="UTF-8"		[standard]	configuracion global de caracteres
			//	[1]	name="viewport"		[standard]	configuracion de bootstrap
			//	[2]	name="description"	[standard]	informacion
			//	[3]	name="keywords"		[standard]	informacion
			//	[4]	name="author"		[standard]	informacion
			//	[5]	name="generator"	[standard]	informacion
			//	[6]	http-equiv="refresh	[config]	Permite Recarga la pagina cada N segundos
			
			{type: "meta",		dataPair: [["charset", "UTF-8"]]},
			{type: "meta",		dataPair: [["name", "viewport"],["content", "width=device-width, initial-scale=1, shrink-to-fit=no"]]},
			{type: "meta",		dataPair: [["name", "description"],["content","Asociación Alzheimer El Salvador"]]},
			{type: "meta",		dataPair: [["name", "keywords"],["content","Alzheimer, salud, cuidados"]]},
			{type: "meta",		dataPair: [["name", "author"],["content","A&C Consultoría Informática | Vuxmi.com"]]},
			{type: "meta",		dataPair: [["name", "generator"],["content","Minerva JS V1.0.0"]]},
			{type: "meta",		dataPair: [["http-equiv", "refresh"],["content","30"]]},

			// <!-- CSS -->
			// [7]	font-awesome.css			[local] V 4.7 editado
			// [8]	animate.css					[nube]	V 3.6.2 https://raw.githubusercontent.com/daneden/animate.css/master/animate.css
			// [9]	bootstrap.min.css			[nube] V 4.1.2
			// [10]	style.css					[local] Hoja de Estilos, Blog
			// [11]	singlearticle.css			[local] Hoja de Estilos, Blog-Articulo
			// [12]	flexdatalist				[local] v 2.2.4 , sys
			// [13] dataTables					[nube] V 1.10.19 , sys
			// [14] dataTables, buttons			[nube] V 1.5.4, sys
			// [15] dataTables, select			[nube] V 1.2.7, sys
			// [16] Validetta / Validaciones	[local] V 1.0.1

			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/font-awesome.css"]]},
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/animate.css"]]},
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","https://stackpath.bootstrapcdn.com/bootswatch/4.1.2/materia/bootstrap.min.css"]]},
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/style.css"]]},
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/singlearticle.css"]]},
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/jquery.flexdatalist.min.css"]]},
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"]]},
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","https://cdn.datatables.net/buttons/1.5.4/css/buttons.dataTables.min.css"]]},
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","https://cdn.datatables.net/select/1.2.7/css/select.dataTables.min.css"]]},
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/validetta.min.css"]]},
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/reservado.css"]]}, // RESERVADO
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/reservado.css"]]}, // RESERVADO
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/reservado.css"]]}, // RESERVADO
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/reservado.css"]]}, // RESERVADO
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/reservado.css"]]}, // RESERVADO
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/reservado.css"]]}, // RESERVADO
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/reservado.css"]]}, // RESERVADO
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/reservado.css"]]}, // RESERVADO
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/reservado.css"]]}, // RESERVADO
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/reservado.css"]]}, // RESERVADO
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/reservado.css"]]}, // RESERVADO
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/reservado.css"]]}, // RESERVADO
			{type: "link",		dataPair: [["type", "text/css"],["rel","stylesheet"],["href","/css/reservado.css"]]}, // RESERVADO
			
			// <!-- JavaScript -->
			// [30]	jquery-3.3.1.min.js					[nube] V 3.3.1
			// [31]	popper.js							[nube] V 1.14.3
			// [32]	bootstrap.min.js					[nube] V 4.1.2
			// [33]	sweetalert.min.js Alertas			[nube] V https://unpkg.com/sweetalert/dist/sweetalert.min.js
			// [34]	sidebar								[local] Barra de Menu Lateral "SideBar Menu"
			// [35]	holder.js							[local] v 2.9.0+f2dkw Manejo de Imagenes 
			// [36]	flexdatalist						[local] v 2.2.4
			// [37] dataTables							[nube] V 1.10.19
			// [38] dataTables / Button					[nube] V 1.5.4
			// [39] dataTables / Select					[nube] V 1.2.7
			// [40] dataTables / Export Flash			[nube] V 1.5.4
			// [41] dataTables / Export jszip			[nube] V 3.1.3
			// [42] dataTables / Export pdfmake			[nube] V 0.1.36
			// [43] dataTables / Export vfs_fonts		[nube] V 0.1.36
			// [44] dataTables / Export buttons html5	[nube] V 1.5.2
			// [45] dataTables / Export buttons print	[nube] V 1.5.2
			// [46] js Ctrl Values						[local] personaliza
			// [47] js Get Values						[local] personaliza
			// [48] Validetta / Validaciones			[local] V 1.0.1
			// [49] Validetta / validettaLang-es-ES		[local] V 1.0.1 custom
			// [50] 									[local] V

			{type: "script",		dataPair: [["type", "text/javascript"],["src","https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","/js/sweetalert.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src",""]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","/js/holder.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","/js/jquery.flexdatalist.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"],["language", "JavaScript"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","https://cdn.datatables.net/buttons/1.5.4/js/dataTables.buttons.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","https://cdn.datatables.net/select/1.2.7/js/dataTables.select.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","https://cdn.datatables.net/buttons/1.5.2/js/buttons.flash.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","https://cdn.datatables.net/buttons/1.5.2/js/buttons.html5.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","https://cdn.datatables.net/buttons/1.5.2/js/buttons.print.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","/js/js_ctrlvalues.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","/js/js_getvalues.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","/js/validetta.min.js"]]},
			{type: "script",		dataPair: [["type", "text/javascript"],["src","/js/validettaLang-es-ES.js"]]}
			]
};

exports.httpMsgFormat = 'HTML';
exports.Title = "Alzheimer El Salvador";
exports.Rights_Reserved = "2019 &copy; A&C Consultoría Informática";

exports.Google = 
{
	key_GoogleMaps: "AIzaSyCCL_UtPnWKOxSn2e5r3r3VMpV-o9sknJw"
};

exports.Image = 
{
	pathbase: "",//"https://storage.googleapis.com/alzelsalvador/",
	//width: 100,
	//height: 100,
	thumbnail: "logo-disponible.png"
};

exports.pagConfig = 
{
	pagingSelect: "single",
		// Modos de seleccion de filas
		// single, seleccion simple de una fila
		// true, simple o multiples filas (NO configurado)
		// Existen otros modos pero no estan configurados (Celda, columna, summary)
	
	pagingType: "full_numbers",
		//numbers - Page number buttons only
		//simple - 'Previous' and 'Next' buttons only
		//simple_numbers - 'Previous' and 'Next' buttons, plus page numbers
		//full - 'First', 'Previous', 'Next' and 'Last' buttons
		//full_numbers - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
		//first_last_numbers - 'First' and 'Last' buttons, plus page numbers

	pagingLength: "[[10, 25, 50, 100, -1], [10, 25, 50, 100, 'Todos  *']]",
		// matrices en la que la primera matriz se usa para definir las opciones de valor y la segunda matriz las opciones mostradas 
		// (útil para cadenas de idioma como 'Todos, si se omite la segunda matriz, la primera sera utilizada para ambos casos.
		
	buttons_default: "'csv', 'excel', 'pdf', 'print'",
		// Botones por defecto
		// 'copy', 'csv', 'excel', 'pdf', 'print'
	
	pagingDOM:	"<'row'<'col-sm-12 col-md-4 toolbar'><'col-sm-12 col-md-8'f>>" +
				"<'row'<'col-sm-12'tr>>" +
				"<'row'<'col-sm-12 col-md-9'l><'col-sm-12 col-md-3'B>>" +
				"<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>"
		// Para definir la distribucion en el DOM 
		// Valores validos "Blfrtip"
		//l - Length changing
		//f - Filtering input
		//t - The Table!
		//i - Information
		//p - Pagination
		//r - pRocessing
		//B - Button
};

exports.servMail =
{
	fromEmail: '"Sitio Web AlzheimerElSalvador.org" <xan.kendrix@gmail.com>',
	transport: {
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: 
		{
			user: 'xan.kendrix@gmail.com',
			pass: 'B@tman01'
		}
	},
	
	emailFormat: 
	[
		['<T2>Password de Usuario Nuevo</T2><p>Nombre: {0} </p><p>Correo: {1} </p><p>Password: {2} </p>'],
		['<T2>Password Reseteado</T2><p>El administrador ha realizado la operacion de Reset al password<p>Correo: {1} </p><p>Password: {2} </p>']
	]

};