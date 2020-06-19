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
					{opcion: "Usuarios",				icono: "fa fa-user-circle-o",			url: "/sys/usuario"},
					//{opcion: "Paginas Estaticas",		icono: "fa fa-user-circle-o",	url: "/sys/pagestatica"},
				]
			},
			{
				id: "cat",
				nombre: "Catalogos",
				icono: "", 
				opciones: 
				[
					{opcion: "Pais",					icono: "fa fa-globe",			url: "/sys/pais"},
					{opcion: "Departamento",			icono: "fa fa-map-signs",		url: "/sys/departamento"},
					//{opcion: "Municipio*",			icono: "fa fa-road",			url: "/sys/municipio"},
					{opcion: "Parentesco",				icono: "fa fa-users",			url: "/sys/parentesco"},
					{opcion: "Profesiones",				icono: "fa fa-user-md",			url: "/sys/profesion"},
					//{opcion: "Tipo Cuidador",			icono: "fa fa-file-archive-o",	url: "/sys/tipocuidador"},
					{opcion: "Medicamentos",			icono: "fa fa-medkit",			url: "/sys/medicamento"},
					{opcion: "Instituciones",			icono: "fa fa-university",		url: "/sys/institucion"},
					{opcion: "Imagenes",				icono: "fa fa-medkit",			url: "/sys/imagen"}
				]
			},
			{
				id: "cyp",
				nombre: "Cuidador y Paciente",				
				icono: "", 
				opciones: 
				[
					{opcion: "Cuidadores",				icono: "fa fa-address-card-o",	url: "/sys/cuidador"},
					{opcion: "Pacientes",				icono: "fa fa-user-o",			url: "/sys/paciente"}
				]
			},
			{
				id: "eyc",
				nombre: "Eventos y Charlas",				
				icono: "", 
				opciones: 
				[
					{opcion: "Agenda *",				icono: "fa fa-book",			url: "/sys/x"},
					{opcion: "Eventos",					icono: "fa fa-calendar",		url: "/sys/evento"},
					{opcion: "Reg. Asistentes *",		icono: "fa fa-calendar-check-o",		url: "/sys/x"},
					{opcion: "Publicaciones",			icono: "fa fa-newspaper-o",		url: "/sys/publicacion"}
				]
			},
			{
				id: "cyd",
				nombre: "Capacitaciones y Diplomados",				
				icono: "", 
				opciones: 
				[
					{opcion: "Capacitacion",			icono: "fa fa-graduation-cap",		url: "/sys/capacitacion"},
					{opcion: "Reg. Asistentes *",		icono: "fa fa-calendar-check-o",	url: "/sys/x"},
					{opcion: "Certificado *",			icono: "fa fa-bookmark-o",			url: "/sys/x"},
				]
			},
			{
				id: "chs",
				nombre: "Colaboradores y Horas Sociales",				
				icono: "", 
				opciones: 
				[
					{opcion: "Proyectos",				icono: "fa fa-line-chart",		url: "/sys/proyecto"},
					{opcion: "Colaboradores",			icono: "fa fa-user-plus",		url: "/sys/colaborador"},
					{opcion: "Constancia *",			icono: "fa fa-envelope-o",		url: "/sys/x"},
					
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
					{opcion: "Pais",					icono: "fa fa-globe",			url: "/sys/pais"},
					{opcion: "Departamento",			icono: "fa fa-map-signs",		url: "/sys/departamento"},
					//{opcion: "Municipio",				icono: "fa fa-road",			url: "/sys/municipio"},
					{opcion: "Parentesco",				icono: "fa fa-users",			url: "/sys/parentesco"},
					{opcion: "Profeciones",				icono: "fa fa-user-md",			url: "/sys/profesion"},
					{opcion: "Tipo Cuidador",			icono: "fa fa-file-archive-o",	url: "/sys/tipocuidador"},
					{opcion: "Medicamentos",			icono: "fa fa-medkit",			url: "/sys/medicamento"},
					{opcion: "Instituciones",			icono: "fa fa-medkit",			url: "/sys/institucion"},
					{opcion: "Imagenes",				icono: "fa fa-medkit",			url: "/sys/imagen"}
				]
			},
			{
				id: "cyp",
				nombre: "Cuidador y Paciente",				
				icono: "", 
				opciones: 
				[
					{opcion: "Cuidadores",				icono: "fa fa-address-card-o",	url: "/sys/cuidador"},
					{opcion: "Pacientes",				icono: "fa fa-user-o",			url: "/sys/paciente"}
				]
			}
         ]
      }
	]
}

