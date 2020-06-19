exports.models = 
{
   tables: [
      {
         name: "pais",
		 title: "Pais",
		 table: "pais",
         primary_key: ["iso3"],
		 sql_select: " SELECT * FROM pais ",
		 sql_edit: " SELECT * FROM pais WHERE iso3 = ? ",
		 sql_new: " SELECT * FROM pais ",
		 sql_delete : " DELETE FROM pais WHERE iso3 = ? ",
		 
         columns: [
            {col: "iso3",				type: "varchar",	length: 3,		minLength: 3, required: true,	visible: true,	searchable: true, label: "Nombre Corto (ISO 3)", toUpperLowerCase: true, allowNoEdit: true, remote_check: "SELECT count(1) as existe FROM pais WHERE iso3 = ? "},
            {col: "nombre",				type: "varchar",	length: 80,		minLength: 2, required: true,	visible: true,	searchable: true, label: "Nombre",		placeholder: "Ingrese un Nombre"},
            {col: "leyenda",			type: "varchar",	length: 80,		minLength: 0, required: false,	visible: true,	searchable: false, label: "Leyenda",	placeholder: "Ingrese una Leyenda"},
            {col: "iso2",				type: "char",		length: 2,		minLength: 2, required: false,	visible: true,	searchable: true, label: "Nombre Corto (ISO 2)", toUpperLowerCase: true, allowNoEdit: true, remote_check: "SELECT count(1) as existe FROM pais WHERE iso2 = ? "}
         ]
      },
      {
         name: "departamento",
		 title: "Departamento / Ciudad",
		 table: "ciudad_depto",
         primary_key: ["id_pais", "id"],
		 sql_select: " SELECT * FROM ciudad_depto ",
		 sql_edit: " SELECT * FROM ciudad_depto WHERE CONCAT(id_pais, '-', id) = ? ",
		 sql_new: " SELECT (max(id) + 1) as id FROM ciudad_depto ",
		 sql_delete : " DELETE FROM ciudad_depto WHERE CONCAT(id_pais, '-', id) = ? ",
         columns: [
            {col: "id_pais",			type: "varchar",	length: 3,		minLength: 3, required: true,		visible: true, searchable: true, label: "Nombre Corto (ISO 3)",	allowNoEdit: true,	dropdownlist: " SELECT iso3 as cod, nombre FROM pais "},
            {col: "id",					type: "int",		length: 3,		minLength: 1, required: true,		visible: true, searchable: true, label: "Id", allowNoEdit: true, step: 1, min:1, max: 999},
            {col: "descripcion_ciudad",	type: "varchar",	length: 20,		minLength: 2, required: true,		visible: true, searchable: true, label: "Ciudad / Departamento",	placeholder:"Ciudad / Departamento"}
         ]
      },
      {
         name: "municipio",
		 title: "Provincia / Municipio",
		 table: "provincia_munic",
         primary_key: ["id_pais", "id_ciudad", "id"],
		 sql_select: " SELECT * FROM provincia_munic ",
		 //sql_edit: " SELECT * FROM provincia_munic WHERE CONCAT('pk', '-', id_pais, '-', id_ciudad, '-', id) = ? ",
		 //sql_new: " SELECT (max(id) + 1) as id FROM provincia_munic ",
		 //sql_delete : " DELETE FROM provincia_munic WHERE CONCAT('pk', '-', id_pais, '-', id_ciudad, '-', id) = ? ",
         columns: [
            {col: "id_pais",				type: "char",		length: 3,		minLength: 3, required: true,	visible: true,	searchable: true, label: "Nombre Corto (ISO 3)"},
            {col: "id_ciudad",				type: "int",		length: 3,		minLength: 0, required: true,	visible: true,	searchable: true, label: "Id Ciudad"},
            {col: "id",						type: "int",		length: 3,		minLength: 0, required: true,	visible: true,	searchable: true, label: "Id"},
            {col: "descripcion_provincia",	type: "varchar",	length: 40,		minLength: 2, required: true,	visible: true,	searchable: true, label: "Provincia / Municipio",	placeholder:"Provincia / Municipio"}
         ]
      },
      {
         name: "parentesco",
		 title: "Parentesco",
		 table: "parentesco",
         primary_key: ["id"],
		 sql_select: " SELECT * FROM parentesco ",
		 sql_edit: " SELECT * FROM parentesco WHERE id = ? ",
		 sql_new: " SELECT * FROM parentesco ",
		 sql_delete : " DELETE FROM parentesco WHERE id = ? ",
         columns: [
            {col: "id",						type: "int",		length: 99,		minLength: 1, required: true,	visible: true,	searchable: true, label: "ID Parentesco", allowNoEdit: true, remote_check: "SELECT count(1) as existe FROM parentesco WHERE id = ? "},
            {col: "descripcion",			type: "varchar",	length: 20,		minLength: 2, required: true,	visible: true,	searchable: true, label: "Descripcion Parentesco",	placeholder: "Ingrese Parentesco"},
         ]
      },
      {
         name: "profesion",
		 title: "Profesión",
		 table: "profesion",
         primary_key: ["id"],
		 sql_select: " SELECT * FROM profesion ",
		 sql_edit: " SELECT * FROM profesion WHERE id = ? ",
		 sql_new: " SELECT * FROM profesion ",
		 sql_delete : " DELETE FROM profesion WHERE id = ? ",
         columns: [
            {col: "id",						type: "int",		length: 99,		minLength: 1, required: true,	visible: true,	searchable: true, label: "ID Profesión", allowNoEdit: true, remote_check: "SELECT count(1) as existe FROM profesion WHERE id = ? "},
            {col: "descripcion",			type: "varchar",	length: 80,		minLength: 2, required: true,	visible: true,	searchable: true, label: "Descripcion Profesión",	placeholder: "Ingrese Profesión"},
         ]
      },
	  {
         name: "tipocuidador",
		 title: "Tipo de Cuidador",
		 table: "tipo_cuidador",
         primary_key: ["id"],
		 sql_select: " SELECT * FROM tipo_cuidador ",
		 sql_edit: " SELECT * FROM tipo_cuidador WHERE id = ? ",
		 sql_new: " SELECT * FROM tipo_cuidador ",
		 sql_delete : " DELETE FROM tipo_cuidador WHERE id = ? ",
         columns: [
            {col: "id",						type: "int",		length: 99,		minLength: 1, required: true,	visible: true,	searchable: true, label: "ID Tipo Cuidador", allowNoEdit: true, remote_check: "SELECT count(1) as existe FROM tipo_cuidador WHERE id = ? "},
            {col: "descripcion",			type: "varchar",	length: 40,		minLength: 2, required: true,	visible: true,	searchable: true, label: "Descripcion Cuidador",	placeholder: "Ingrese Cuidador"},
         ]
      },
	  {
         name: "medicamento",
		 title: "Medicamentos",
		 table: "medicamento",
         primary_key: ["codigo"],
		 sql_select: " SELECT * FROM medicamento ",
		 sql_edit: " SELECT * FROM medicamento WHERE codigo = ? ",
		 sql_new: " SELECT * FROM medicamento ",
		 sql_delete : " DELETE FROM medicamento WHERE codigo = ? ",
         columns: [
            {col: "codigo",					type: "varchar",	length: 10,		minLength: 3, required: true,	visible: true,	searchable: true, label: "Codigo Medicamento", allowNoEdit: true, toUpperLowerCase: true, remote_check: "SELECT count(1) as existe FROM medicamento WHERE codigo = ? "},
            {col: "descripcion",			type: "varchar",	length: 100,	minLength: 2, required: true,	visible: true,	searchable: true, label: "Nombre del Medicamento",	placeholder: "Ingrese un Medicamento"}
         ]
      },
	  {
         name: "institucion",
		 title: "Instituciones",
		 table: "institucion",
         primary_key: ["codigo"],
		 sql_select: " SELECT * FROM institucion ",
		 sql_edit: " SELECT * FROM institucion WHERE codigo = ? ",
		 sql_new: " SELECT * FROM institucion ",
		 sql_delete : " DELETE FROM institucion WHERE codigo = ? ",
         columns: [
            {col: "codigo",					type: "varchar",	length: 10,		minLength: 2, required: true,	visible: true,	searchable: true, label: "Codigo Institucion", allowNoEdit: true, toUpperLowerCase: true, remote_check: "SELECT count(1) as existe FROM institucion WHERE codigo = ? "},
            {col: "descripcion",			type: "varchar",	length: 80,		minLength: 2, required: true,	visible: true,	searchable: true, label: "Nombre de la Institucion",	placeholder: "Ingrese una Institucion"}
         ]
      },
	  {
         name: "pagestatica",
		 title: "Paginas Estaticas del Sitio Web",
		 table: "pagina_estatica",
         primary_key: ["id"],
		 sql_select: " SELECT * FROM pagina_estatica ",
		 sql_edit: " SELECT * FROM pagina_estatica WHERE id = ? ",
		 sql_new: " SELECT * FROM pagina_estatica ",
		 sql_delete : " DELETE FROM pagina_estatica WHERE id = ? ",
         columns: [
            {col: "id",						type: "int",		length: 999,	minLength: 1, required: true,	visible: true,	searchable: true, label: "ID Pagina", allowNoEdit: true, remote_check: "SELECT count(1) as existe FROM pagina_estatica WHERE id = ? "},
            {col: "titulo",					type: "varchar",	length: 50,		minLength: 2, required: true,	visible: true,	searchable: true, label: "Titulo",	placeholder: "Ingrese un Titulo"},
			{col: "contenido",				type: "textarea",	length: 6000,	minLength: 100, required: false,	visible: false,	searchable: true, label: "contenido",	placeholder: "Ingrese un Contenido"}
         ]
      },
	  {
         name: "evento",
		 title: "Eventos",
		 table: "evento",
         primary_key: ["id"],
		 sql_select: " SELECT id, titulo, DATE_FORMAT(fec_evento, '%Y-%m-%d') fec_evento, hora_ini, hora_fin, direccion, dir_longitud, dir_latitud, costo, informacion, descripcion, imagen FROM evento ",
		 sql_edit: " SELECT id, titulo, DATE_FORMAT(fec_evento, '%Y-%m-%d') fec_evento, hora_ini, hora_fin, direccion, dir_longitud, dir_latitud, costo, informacion, descripcion, imagen FROM evento WHERE id = ? ",
		 sql_new: " SELECT * FROM evento ",
		 sql_delete : " DELETE FROM evento WHERE id = ? ",
         columns: [
            {col: "id",					type: "int",		length: 9999,	minLength: 1, required: true,	visible: true,	searchable: true, 	label: "ID Evento", 	allowNoEdit: true, remote_check: "SELECT count(1) as existe FROM evento WHERE id = ? "},
            {col: "titulo",				type: "varchar",	length: 100,	minLength: 4, required: true,	visible: true,	searchable: true, 	label: "Titulo",		placeholder: "Ingrese un Titulo"},
			{col: "fec_evento",			type: "date",		length: 0,		minLength: 4, required: true,	visible: true,	searchable: true, 	label: "Fecha"},
			{col: "hora_ini",			type: "time",		length: 100,	minLength: 4, required: false,	visible: false,	searchable: false,	label: "Hora Inicio"},
			{col: "hora_fin",			type: "time",		length: 100,	minLength: 4, required: false,	visible: false,	searchable: false,	label: "Hora Fin"},
			{col: "direccion",			type: "varchar",	length: 200,	minLength: 4, required: true,	visible: false,	searchable: false,	label: "Dirección",		placeholder: "Ingrese una Dirección"},
			{col: "dir_longitud",		type: "varchar",	length: 30,		minLength: 4, required: false,	visible: false,	searchable: false,	label: "Longitud",		placeholder: "Longitud Ej: -12.456789"},
			{col: "dir_latitud",		type: "varchar",	length: 30,		minLength: 4, required: false,	visible: false,	searchable: false,	label: "Latitud",		placeholder: "Latitud Ej: -12.456789"},
			{col: "costo",				type: "float",		length: 7.2,	minLength: 0.01, required: true,	visible: false,	searchable: false,	label: "Costo",		placeholder: "0.00", pattern: "^\d+(?:\.\d{1,2})?$" },
			{col: "informacion",		type: "textarea",	length: 3000,	minLength: 0, required: false,	visible: false,	searchable: false,	label: "Información",	placeholder: "Ingrese Información del Evento"},
			{col: "descripcion",		type: "varchar",	length: 200,	minLength: 4, required: false,	visible: false,	searchable: false,	label: "Descripción",	placeholder: "Ingrese una Descripción del Evento"},
			{col: "imagen",				type: "varchar",	length: 50,		minLength: 0, required: false,	visible: false,	searchable: false,	label: "Imagen",		placeholder: "URL Imagen"}
         ]
      },
	  {
         name: "usuario",
		 title: "Usuarios",
		 table: "usuario",
         primary_key: ["correo"],
		 sql_select: " SELECT * FROM usuario ",
		 sql_edit: " SELECT * FROM usuario WHERE correo = ? ",
		 sql_new: " SELECT * FROM usuario ",
		 sql_delete : " DELETE FROM usuario WHERE correo = ? ",
		 after_insert: ["email"],
		 toolbar: [{button: "ButtonReset", title: "Resetear Password", icon: "fa fa-file-powerpoint-o", URL: "/api_resetpass", verbo: "POST", }],
         columns: [
            {col: "correo",				type: "varchar",	length: 50,		minLength: 5, required: true,	visible: true,	searchable: true, 	label: "Correo", 	allowNoEdit: true, 	email_check: true, remote_check: "SELECT count(1) as existe FROM usuario WHERE correo = ? "}, 
            {col: "nombre",				type: "varchar",	length: 30,		minLength: 3, required: true,	visible: true,	searchable: true,	label: "Nombre",	placeholder: "Ingrese un Nombre"},
			{col: "apellido",			type: "varchar",	length: 30,		minLength: 3, required: true,	visible: true,	searchable: true,	label: "Apellido",	placeholder: "Ingrese un Apellido"},
//			{col: "password",			type: "varchar",	length: 20,		minLength: 6, required: true,	visible: false,	searchable: false,	label: "Password",	allowNoEdit: true, placeholder: "Defina el Password", treatIns: "MD5('?')"},
			{col: "perfil",				type: "varchar",	length: 30,		minLength: 0, required: true,	visible: true,	searchable: true,	label: "Perfil", 	list: [{val:"admin", label:"Administrador"},{val:"operador", label:"Operador"}]}
         ]
      },
	  {
         name: "cuidador",
		 title: "Cuidadores",
		 table: "cuidador",
         primary_key: ["carnet"],
		 sql_select: " SELECT * FROM cuidador ",
		 sql_edit: " SELECT * FROM cuidador WHERE carnet = ? ",
		 sql_new: " SELECT * FROM cuidador ",
		 sql_delete : " DELETE FROM cuidador WHERE carnet = ? ",
         columns: [
            {col: "carnet",				type: "varchar",	length: 9,		minLength: 9, required: true,	visible: true,	searchable: true, 	label: "Carnet", 	placeholder: "AAYYYY### Iniciales, Año y Correlativo", pattern:"[A-Z]{{2}}[0-9]{{7}}", toUpperLowerCase: true, allowNoEdit: true, 	remote_check: "SELECT count(1) as existe FROM cuidador WHERE carnet = ? "}, 
            {col: "nombre",				type: "varchar",	length: 30,		minLength: 3, required: true,	visible: true,	searchable: true,	label: "Nombre",	placeholder: "Ingrese un Nombre"},
			{col: "apellido",			type: "varchar",	length: 30,		minLength: 3, required: true,	visible: true,	searchable: true,	label: "Apellido",	placeholder: "Ingrese un Apellido"},
			{col: "id_pais",			type: "varchar",	length: 3,		minLength: 3, required: true,	visible: false, searchable: false,	label: "Pais",		placeholder: "Ingrese un Pais", dropdownlist: " SELECT iso3 as cod, nombre FROM pais "},
			{col: "id_departamento",	type: "varchar",	length: 3,		minLength: 3, required: true,	visible: false, searchable: false, 	label: "Departamento", placeholder: "Ingrese un Departamento",	dropdownlist: " SELECT id as cod, descripcion_ciudad as nombre FROM ciudad_depto "},
			{col: "direccion",			type: "varchar",	length: 80,		minLength: 10, required: false,	visible: false, searchable: false, 	label: "Direccion", placeholder: "Ingrese una Direccion"},
			{col: "correo",				type: "varchar",	length: 40,		minLength: 5, required: true,	visible: false,	searchable: false, 	label: "Correo", 	email_check: true},
			{col: "telefono",			type: "varchar",	length: 8,		minLength: 8, required: true,	visible: true,	searchable: true, 	label: "Telefono",	placeholder: "########", pattern:"[0-9]{{8}}"},
			{col: "id_profesion",		type: "varchar",	length: 2,		minLength: 1, required: true,	visible: false,	searchable: true, 	label: "Profesión", dropdownlist: "SELECT id as cod, descripcion as nombre FROM profesion"}
         ]
      },
	  {
         name: "paciente",
		 title: "Pacientes",
		 table: "paciente",
         primary_key: ["carnet"],
		 sql_select: " SELECT * FROM paciente ",
		 sql_edit: " SELECT carnet, nombre, apellido, id_cuidador, id_pais, id_departamento, id_profesion, id_parentesco, edad_medicacion, DATE_FORMAT(fec_nacimiento, '%Y-%m-%d') fec_nacimiento, medicacion FROM paciente WHERE carnet = ? ",
		 sql_new: " SELECT * FROM paciente ",
		 sql_delete : " DELETE FROM paciente WHERE carnet = ? ",
		 parent: "cuidador",
         columns: [
            {col: "carnet",				type: "varchar",	length: 9,		minLength: 9, required: true,	visible: true,	searchable: true, 	label: "Carnet", 	placeholder: "AAYYYY### Iniciales, Año y Correlativo", pattern:"[A-Z]{{2}}[0-9]{{7}}", toUpperLowerCase: true, allowNoEdit: true, remote_check: "SELECT count(1) as existe FROM paciente WHERE carnet = ? "}, 
            {col: "nombre",				type: "varchar",	length: 30,		minLength: 3, required: true,	visible: true,	searchable: true,	label: "Nombre",	placeholder: "Ingrese un Nombre"},
			{col: "apellido",			type: "varchar",	length: 30,		minLength: 3, required: true,	visible: true,	searchable: true,	label: "Apellido",	placeholder: "Ingrese un Apellido"},
			{col: "id_cuidador",		type: "varchar",	length: 9,		minLength: 9, required: true,	visible: true,	searchable: true, 	label: "Cuidador", 	allowNoEdit: true, 	dropdownlist: "SELECT carnet as cod, CONCAT(carnet, '-', apellido, ', ', nombre)  as nombre FROM cuidador "}, 
			{col: "id_pais",			type: "varchar",	length: 3,		minLength: 3, required: true,	visible: false,  searchable: false, label: "Pais",		dropdownlist: " SELECT iso3 as cod, nombre FROM pais "},
			{col: "id_departamento",	type: "varchar",	length: 3,		minLength: 3, required: true,	visible: false, searchable: false, label: "Departamento",	dropdownlist: " SELECT id as cod, descripcion_ciudad as nombre FROM ciudad_depto "},
			{col: "id_profesion",		type: "varchar",	length: 2,		minLength: 1, required: false,	visible: false,	searchable: false, label: "Profesión Diagnosticado", dropdownlist: "SELECT id as cod, descripcion as nombre FROM profesion"},
			{col: "id_parentesco",		type: "varchar",	length: 2,		minLength: 1, required: false,	visible: false,	searchable: false, label: "Parentesco con Cuidador", dropdownlist: "SELECT id as cod, descripcion as nombre FROM parentesco"},
			{col: "edad_medicacion",	type: "int",		length: 99,		minLength: 1, required: false,	visible: false,	searchable: false, label: "Edad Diagnosticado"},
			{col: "fec_nacimiento",		type: "date",		length: 0,		minLength: 4, required: false,	visible: false,	searchable: false, 	label: "Fecha Nacimiento", min: "1940-01-01", max: "2040-12-31"},
			{col: "medicacion",			type: "textarea",	length: 300,	minLength: 4, required: false,	visible: false,	searchable: false, 	label: "Otras Demencias"}
         ]
      },
	  {
         name: "med_paciente",
		 title: "Medicamentos por Paciente",
		 table: "medicacion_paciente",
         primary_key: ["carnet", "id_medicamento"],
		 sql_select: " SELECT * FROM med_paciente ",
		 sql_edit: " SELECT * FROM med_paciente WHERE id = ? ",
		 sql_new: " SELECT * FROM med_paciente ",
		 sql_delete : " DELETE FROM med_paciente WHERE id = ? ",
         columns: [
			{col: "carnet",				type: "varchar",	length: 9,		minLength: 9, required: true,	visible: true,	searchable: true, 	label: "Carnet", dropdownlist: " SELECT carnet as cod, CONCAT(carnet, '-', apellido, ', ', nombre) as nombre FROM paciente "}, 
			{col: "id_medicamento",		type: "varchar",	length: 10,		minLength: 2, required: true,	visible: true,  searchable: true,	label: "Medicamento", dropdownlist: " SELECT codigo as cod, descripcion as nombre FROM medicamento "},
			{col: "observacion",		type: "varchar",	length: 80,		minLength: 4, required: false,	visible: true,	searchable: true, 	label: "Comentario"}
         ]
      },
      {
         name: "publicacion",
		 title: "publicacion",
		 table: "publicacion",
         primary_key: ["id"],
		 sql_select: " SELECT * FROM publicacion ",
		 sql_edit: " SELECT id, titulo, subtitulo, DATE_FORMAT(publicado, '%Y-%m-%d') publicado, url_imagen, autor, introduccion, tags, contenido FROM publicacion WHERE id = ? ",
		 sql_new: " SELECT * FROM publicacion ",
		 sql_delete : " DELETE FROM publicacion WHERE id = ? ",
         columns: [
			{col: "id",					type: "int",		length: 9999,	minLength: 1, required: true,	visible: true,	searchable: true, 	label: "ID publicacion", 	allowNoEdit: true, remote_check: "SELECT count(1) as existe FROM publicacion WHERE id = ? "},
            {col: "titulo",				type: "varchar",	length: 30,		minLength: 3, required: true,	visible: true,	searchable: true, 	label: "Titulo",		placeholder: "Ingrese un Titulo"},
			{col: "subtitulo",			type: "varchar",	length: 60,		minLength: 0, required: false,	visible: true,	searchable: true, 	label: "Sub Titulo",	placeholder: "Ingrese un Sub Titulo"},
            {col: "publicado",			type: "date",		length: 0,		minLength: 4, required: true,	visible: false,	searchable: false,	label: "Fecha Publicacion"},
			{col: "url_imagen",			type: "varchar",	length: 30,		minLength: 1, required: true,	visible: false, searchable: false,	label: "Imagen Portada",	dropdownlist: " SELECT nombre as cod, nombre FROM imagen "},
			{col: "autor",				type: "varchar",	length: 30,		minLength: 3, required: false,	visible: true,	searchable: true,	label: "Nombre Autor",	placeholder: "Ingrese un Nombre"},
			{col: "introduccion",		type: "textarea",	length: 500,	minLength: 4, required: true,	visible: false,	searchable: false, 	label: "Introduccion"},
			{col: "tags",				type: "varchar",	length: 50,		minLength: 3, required: false,	visible: false,	searchable: false,	label: "Tags",	placeholder: "Ej: Alzheimer, Salud, paciente, evento"},
			{col: "contenido",			type: "textarea",	length: 6000,	minLength: 40,required: false,	visible: false,	searchable: false,	label: "Contenido del Articulo",	placeholder: "Ingrese su Contenido"}
         ]
      },
      {
         name: "imagen",
		 title: "imagen",
		 table: "imagen",
         primary_key: ["nombre"],
		 sql_select: " SELECT * FROM imagen ",
		 sql_edit: " SELECT * FROM imagen WHERE nombre = ? ",
		 sql_new: " SELECT * FROM imagen ",
		 sql_delete : " DELETE FROM imagen WHERE nombre = ? ",
         columns: [
            {col: "nombre",				type: "varchar",	length: 30,		minLength: 5, required: true,	visible: true,	searchable: true, 	label: "Nombre",		placeholder: "Ingrese un Titulo", allowNoEdit: true, remote_check: "SELECT count(1) as existe FROM imagen WHERE nombre = ? "},
			{col: "texto_alternativo",	type: "varchar",	length: 40,		minLength: 0, required: true,	visible: true,	searchable: true, 	label: "Texto Altenativo",	placeholder: "Ingrese un Sub Titulo"},
			{col: "descripcion",		type: "textarea",	length: 80,		minLength: 0, required: false,	visible: false,	searchable: true,	label: "Descripcion",	placeholder: "Ingrese una Descripcion"}
         ]
      },
      {
         name: "colaborador",
		 title: "Colaboradores",
		 table: "colaborador",
         primary_key: ["codigo"],
		 sql_select: " SELECT * FROM colaborador ",
		 sql_edit: " SELECT * FROM colaborador WHERE codigo = ? ",
		 sql_new: " SELECT * FROM colaborador ",
		 sql_delete : " DELETE FROM colaborador WHERE codigo = ? ",
         columns: [
            {col: "codigo",				type: "varchar",	length: 8,		minLength: 4, required: true,	visible: true,	searchable: true, 	label: "Codigo",	placeholder: "AA-##### Codigo - Correlativo", pattern:"[A-Z]{{2}}-[0-9]{{5}}", toUpperLowerCase: true, allowNoEdit: true, remote_check: "SELECT count(1) as existe FROM colaborador WHERE codigo = ? "},
			{col: "id_institucion",		type: "varchar",	length: 10,		minLength: 1, required: true,	visible: true,  searchable: true,	label: "Institucion", dropdownlist: " SELECT codigo as cod, CONCAT(codigo, '-', descripcion) as nombre FROM institucion "},
			{col: "nombre",				type: "varchar",	length: 30,		minLength: 0, required: true,	visible: true,	searchable: true, 	label: "Nombres",	placeholder: "Ingrese un Nombre"},
			{col: "apellido",			type: "varchar",	length: 30,		minLength: 0, required: true,	visible: true,	searchable: true, 	label: "Apellidos",	placeholder: "Ingrese un Apellido"},
			{col: "telefono",			type: "varchar",	length: 8,		minLength: 8, required: true,	visible: true,	searchable: true, 	label: "Telefono",	placeholder: "########", pattern:"[0-9]{{8}}"},
			{col: "correo",				type: "varchar",	length: 40,		minLength: 5, required: true,	visible: false,	searchable: false, 	label: "Correo", 	email_check: true}
         ]
      },
      {
         name: "capacitacion",
		 title: "Capacitaciones",
		 table: "capacitacion",
         primary_key: ["codigo"],
		 sql_select: " SELECT * FROM capacitacion ",
		 sql_edit: " SELECT * FROM capacitacion WHERE codigo = ? ",
		 sql_new: " SELECT * FROM capacitacion ",
		 sql_delete : " DELETE FROM capacitacion WHERE codigo = ? ",
         columns: [
            {col: "codigo",				type: "varchar",	length: 8,		minLength: 8, required: true,	visible: true,	searchable: true, 	label: "Codigo",		placeholder: "AA-##### Codigo - Correlativo", pattern:"[A-Z]{{2}}-[0-9]{{5}}", toUpperLowerCase: true, allowNoEdit: true, remote_check: "SELECT count(1) as existe FROM capacitacion WHERE codigo = ? "},
			{col: "nombre",				type: "varchar",	length: 80,		minLength: 0, required: true,	visible: true,	searchable: true, 	label: "Nombres",		placeholder: "Ingrese un Nombre"},
			{col: "duracion",			type: "int",		length: 3,		minLength: 1, required: true,	visible: true,	searchable: true,	label: "Duracion (horas)",		placeholder: "0", pattern: "[0-9]{{3}}" },
			{col: "descripcion",		type: "varchar",	length: 80,		minLength: 0, required: false,	visible: false,	searchable: false,	label: "Descripcion",	placeholder: "Ingrese una Descripcion"}
         ]
      },
      {
         name: "proyecto",
		 title: "Proyectos",
		 table: "proyecto",
         primary_key: ["id"],
		 sql_select: " SELECT * FROM proyecto ",
		 sql_edit: " SELECT * FROM proyecto WHERE id = ? ",
		 sql_new: " SELECT * FROM proyecto ",
		 sql_delete : " DELETE FROM proyecto WHERE id = ? ",
         columns: [
            {col: "id",					type: "int",		length: 99,		minLength: 1, required: true,	visible: true,	searchable: true, 	label: "ID Proyecto", 	allowNoEdit: true, remote_check: "SELECT count(1) as existe FROM proyecto WHERE id = ? "},
			{col: "nombre",				type: "varchar",	length: 20,		minLength: 0, required: true,	visible: true,	searchable: true, 	label: "Nombres",		placeholder: "Ingrese un Nombre"},
			{col: "descripcion",		type: "varchar",	length: 80,		minLength: 0, required: false,	visible: false,	searchable: false,	label: "Descripcion",	placeholder: "Ingrese una Descripcion"}
         ]
      },
   ]
}
