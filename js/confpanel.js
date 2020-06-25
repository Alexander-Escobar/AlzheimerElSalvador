exports.menu = 
{
	perfil:
	[
      {
         nombre: "admin",
		 nombre_largo: "Administrador",
		 icono: "",
         grupos: [
			{
				id: "seg",
				nombre: "Seguridad",
				icono: "", 
				opciones: 
				[
					{opcion: "Usuarios",			icono: "fa fa-user-circle-o",	tooltip: "Usuarios del Sistema",	url: "/sys/usuario"},
					//{opcion: "Paginas Estaticas",	icono: "fa fa-user-circle-o",	tooltip: "Usuarios del Sistema",	url: "/sys/pagestatica"},
				]
			},
			{
				id: "cat",
				nombre: "Catalogos",
				icono: "", 
				opciones: 
				[
					{opcion: "Pais",				icono: "fa fa-globe",			tooltip: "Pais",			url: "/sys/pais"},
					{opcion: "Departamento",		icono: "fa fa-map-signs",		tooltip: "Departamento",	url: "/sys/departamento"},
					//{opcion: "Municipio*",		icono: "fa fa-road",			tooltip: "Municipio",		url: "/sys/municipio"},
					{opcion: "Parentesco",			icono: "fa fa-users",			tooltip: "Parentesco",		url: "/sys/parentesco"},
					{opcion: "Profesiones",			icono: "fa fa-user-md",			tooltip: "Profesiones",		url: "/sys/profesion"},
					{opcion: "Tipo Documento",		icono: "fa fa-file-archive-o",	tooltip: "Tipo de Documentos",	url: "/sys/tipodoc"},
					{opcion: "Medicamentos",		icono: "fa fa-medkit",			tooltip: "Medicamentos",	url: "/sys/medicamento"},
					{opcion: "Instituciones",		icono: "fa fa-university",		tooltip: "Instituciones",	url: "/sys/institucion"},
					{opcion: "Imagenes",			icono: "fa fa-medkit",			tooltip: "Imagenes",		url: "/sys/imagen"}
				]
			},
			{
				id: "cyp",
				nombre: "Cuidador y Paciente",				
				icono: "", 
				opciones: 
				[
					{opcion: "Cuidadores",				icono: "fa fa-address-card-o",	tooltip: "Cuidadores",	url: "/sys/cuidador"},
					{opcion: "Pacientes",				icono: "fa fa-user-o",			tooltip: "Pacientes",	url: "/sys/paciente"},
					{opcion: "Med. Paciente",			icono: "fa fa-medkit",			tooltip: "Medicamentos por Paciente",	url: "/sys/med_paciente"}
				]
			},
			{
				id: "eyc",
				nombre: "Eventos y Charlas",				
				icono: "", 
				opciones: 
				[
					{opcion: "Eventos",					icono: "fa fa-calendar",		tooltip: "Eventos",				url: "/sys/evento"},
					{opcion: "Agenda",					icono: "fa fa-book",			tooltip: "Agenda",				url: "/sys/agenda"},
					{opcion: "Reg. Asistentes",			icono: "fa fa-calendar-check-o",tooltip: "Registro de Asistentes",	url: "/sys/reg_asistencia"},
					{opcion: "Publicaciones",			icono: "fa fa-newspaper-o",		tooltip: "Publicaciones",		url: "/sys/publicacion"}
				]
			},
			{
				id: "cyd",
				nombre: "Capacitaciones y Diplomados",				
				icono: "", 
				opciones: 
				[
					{opcion: "Capacitacion",			icono: "fa fa-graduation-cap",	tooltip: "Capacitacion",		url: "/sys/capacitacion"},
					{opcion: "Alumno por Capc.",		icono: "fa fa-calendar-check-o",tooltip: "Alumnos por Capacitacion", url: "/sys/alumno"}
				]
			},
			{
				id: "chs",
				nombre: "Colaboradores y Horas Sociales",				
				icono: "", 
				opciones: 
				[
					{opcion: "Proyectos",				icono: "fa fa-line-chart",		tooltip: "Proyectos",		url: "/sys/proyecto"},
					{opcion: "Colaboradores",			icono: "fa fa-user-plus",		tooltip: "Colaboradores",	url: "/sys/colaborador"},
					{opcion: "Ctrl Asistencia",			icono: "fa fa-clock-o",			tooltip: "Control Asistencia",	url: "/sys/ctrlasistencia"},
					
				]
			}
         ]
      },
	  {
         nombre: "editor",
		 nombre_largo: "Editor",
		 icono: "",
         grupos: [
			{
				id: "cat",
				nombre: "Catalogos",
				icono: "", 
				opciones: 
				[
					{opcion: "Imagenes",			icono: "fa fa-medkit",			tooltip: "Imagenes",		url: "/sys/imagen"}
				]
			},
			{
				id: "eyc",
				nombre: "Eventos y Charlas",				
				icono: "", 
				opciones: 
				[
					{opcion: "Publicaciones",			icono: "fa fa-newspaper-o",		tooltip: "Publicaciones",		url: "/sys/publicacion"}
				]
			}
         ]
      },
      {
         nombre: "operador",
		 nombre_largo: "Operador",
		 icono: "",
         grupos: [
			{
				id: "cat",
				nombre: "Catalogos",
				icono: "", 
				opciones: 
				[
					{opcion: "Pais",				icono: "fa fa-globe",			tooltip: "Pais",			url: "/sys/pais"},
					{opcion: "Departamento",		icono: "fa fa-map-signs",		tooltip: "Departamento",	url: "/sys/departamento"},
					//{opcion: "Municipio*",		icono: "fa fa-road",			tooltip: "Municipio",		url: "/sys/municipio"},
					{opcion: "Parentesco",			icono: "fa fa-users",			tooltip: "Parentesco",		url: "/sys/parentesco"},
					{opcion: "Profesiones",			icono: "fa fa-user-md",			tooltip: "Profesiones",		url: "/sys/profesion"},
					{opcion: "Tipo Documento",		icono: "fa fa-file-archive-o",	tooltip: "Tipo de Documentos",	url: "/sys/tipodoc"},
					{opcion: "Medicamentos",		icono: "fa fa-medkit",			tooltip: "Medicamentos",	url: "/sys/medicamento"},
					{opcion: "Instituciones",		icono: "fa fa-university",		tooltip: "Instituciones",	url: "/sys/institucion"},
					{opcion: "Imagenes",			icono: "fa fa-medkit",			tooltip: "Imagenes",		url: "/sys/imagen"}
				]
			},
			{
				id: "cyp",
				nombre: "Cuidador y Paciente",				
				icono: "", 
				opciones: 
				[
					{opcion: "Cuidadores",				icono: "fa fa-address-card-o",	tooltip: "Cuidadores",	url: "/sys/cuidador"},
					{opcion: "Pacientes",				icono: "fa fa-user-o",			tooltip: "Pacientes",	url: "/sys/paciente"},
					{opcion: "Med. Paciente",			icono: "fa fa-medkit",			tooltip: "Medicamentos por Paciente",	url: "/sys/med_paciente"}
				]
			},
			{
				id: "eyc",
				nombre: "Eventos y Charlas",				
				icono: "", 
				opciones: 
				[
					{opcion: "Eventos",					icono: "fa fa-calendar",		tooltip: "Eventos",				url: "/sys/evento"},
					{opcion: "Agenda",					icono: "fa fa-book",			tooltip: "Agenda",				url: "/sys/agenda"},
					{opcion: "Reg. Asistentes",			icono: "fa fa-calendar-check-o",tooltip: "Registro de Asistentes",	url: "/sys/reg_asistencia"},
					{opcion: "Publicaciones",			icono: "fa fa-newspaper-o",		tooltip: "Publicaciones",		url: "/sys/publicacion"}
				]
			},
			{
				id: "cyd",
				nombre: "Capacitaciones y Diplomados",				
				icono: "", 
				opciones: 
				[
					{opcion: "Capacitacion",			icono: "fa fa-graduation-cap",	tooltip: "Capacitacion",		url: "/sys/capacitacion"},
					{opcion: "Alumno por Capc.",		icono: "fa fa-calendar-check-o",tooltip: "Alumnos por Capacitacion", url: "/sys/alumno"}
				]
			},
			{
				id: "chs",
				nombre: "Colaboradores y Horas Sociales",				
				icono: "", 
				opciones: 
				[
					{opcion: "Proyectos",				icono: "fa fa-line-chart",		tooltip: "Proyectos",		url: "/sys/proyecto"},
					{opcion: "Colaboradores",			icono: "fa fa-user-plus",		tooltip: "Colaboradores",	url: "/sys/colaborador"},
					{opcion: "Ctrl Asistencia",			icono: "fa fa-envelope-o",		tooltip: "Control Asistencia",	url: "/sys/ctrlasistencia"},
					
				]
			}
         ]
      }
	]
}

