exports.models = 
{
   report: [
		{
			name: "certificado",
			title: "Certificado de Diplomado",
			template: "./template/diploma.html",
			format: "Letter",
			orientation: "landscape",
			border: "10mm",
			sql_select: " SELECT " +
						" AL.nombre, " +
						" AL.apellido, " +
						" CA.nombre as nom_capacitacion, " +
						" CA.descripcion, " +
						" CONCAT(DATE_FORMAT(CA.fec_emision, '%d'),' de ', " +
						" CASE " +
						" 	WHEN DATE_FORMAT(CA.fec_emision, '%m') = '01' THEN 'Enero' " +
						" 	WHEN DATE_FORMAT(CA.fec_emision, '%m') = '02' THEN 'Febrero' " +
						" 	WHEN DATE_FORMAT(CA.fec_emision, '%m') = '03' THEN 'Marzo' " +
						" 	WHEN DATE_FORMAT(CA.fec_emision, '%m') = '04' THEN 'Abril' " +
						" 	WHEN DATE_FORMAT(CA.fec_emision, '%m') = '05' THEN 'Mayo' " +
						" 	WHEN DATE_FORMAT(CA.fec_emision, '%m') = '06' THEN 'Junio' " +
						" 	WHEN DATE_FORMAT(CA.fec_emision, '%m') = '07' THEN 'Julio' " +
						" 	WHEN DATE_FORMAT(CA.fec_emision, '%m') = '08' THEN 'Agosto' " +
						" 	WHEN DATE_FORMAT(CA.fec_emision, '%m') = '09' THEN 'Septiembre' " +
						" 	WHEN DATE_FORMAT(CA.fec_emision, '%m') = '10' THEN 'Octubre' " +
						" 	WHEN DATE_FORMAT(CA.fec_emision, '%m') = '11' THEN 'Noviembre' " +
						" 	WHEN DATE_FORMAT(CA.fec_emision, '%m') = '12' THEN 'Diciembre' " +
						" END, ' de ', " +
						" DATE_FORMAT(CA.fec_emision, '%Y')) as fec_certificado, " +
						" CA.duracion " +
						" FROM alumno AL, capacitacion CA " +
						" WHERE CA.codigo = AL.id_capacitacion " +
						"    AND CA.codigo = ? ",
			group: [
				{col: "nom_capacitacion"},
				{col: "descripcion"}
				],
			detail:[
				{col: "nombre"},
				{col: "apellido"},
				{col: "nom_capacitacion"},
				{col: "descripcion"},
				{col: "fec_certificado"},
				{col: "duracion"}
				] 
		},
		{
			name: "carta",
			title: "Carta de Horas",
			template: "./template/cartahoras.html",
			format: "Letter",
			orientation: "portrait",
			border: "14mm",
			sql_select: " SELECT " +
						" CONCAT(CO.apellido, ', ', CO.nombre) as nombre_colaborador, " +
						" 'Diciembre 07, 2019' as fec_emision, " +
						" (SELECT CONCAT(IT.codigo,'-', IT.descripcion) FROM institucion IT WHERE IT.codigo = CO.id_institucion) as nom_institucion, " +
						" (SELECT PR.nombre FROM proyecto PR WHERE PR.id = CA.id_proyecto) as nom_proyecto, " +
						" CA.total_horas, " +
						" (SELECT SUM(T.total_horas) FROM ctrlasistencia T WHERE T.id_colaborador = CO.codigo ) as sum_horas " +
						" FROM colaborador CO, ctrlasistencia CA " +
						" WHERE CA.id_colaborador = CO.codigo " +
						"   AND CO.codigo = ? ",
			group: [
				{col: "nombre_colaborador"},
				{col: "fec_emision"},
				{col: "nom_institucion"},
				{col: "sum_horas"}
				],
			detail:[
				{col: "nom_proyecto"},
				{col: "total_horas"}
				] 
		}
	]
}
