//	Servicio Generador de Reportes (Service Report)
//
//	Listado:
//	isEqual		Funcion Interna, verifica si Dos Objetos son iguales en base a su contenido
//	GetReport	Obtiene el Reporte Asociado en base a la Configuracion recibida

// Importacion
var settings = require('../js/settings');
var httpMsgs = require('../js/httpmsgs');
var pdf = require("pdf-creator-node");
var fs = require('fs');

isEqual = function(a_obj1, a_obj2)
{
	// Compara la Igualdad de valores de dos objetos
	// Recibe:
	// a_obj1, a_obj2	Objetos a ser comparados por sus elementos
	//
	// Retorna:
	// True | False		Si es o no Iguales los objetos

  const obj1Keys = Object.keys(a_obj1);
  const obj2Keys = Object.keys(a_obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (let objKey of obj1Keys) {
    if (a_obj1[objKey] !== a_obj2[objKey]) {
      return false;
    }
  }

  return true;
};

exports.GetReport = function (a_req, a_resp, a_data, a_rpt_config)
{
	//	Obtiene el Reporte Asociado en base a la Configuracion recibida
	//
	//	Recibe:
	//	a_req
	//	a_resp
	//	a_data			Valores a ser incrustados en el formato del reporte
	//	a_rpt_config	Configuracion del Reporte (formato, orientacion, borde, etc)
	//
	//	Retorna:
	//	Get				Invoca a showResource de httpMsgs, con el que se obtiene una respuesta de archivo en HTTP
	
	console.log("servrpt GetReport");
	// Read HTML Template
	var html = fs.readFileSync(a_rpt_config.template, 'utf8');
	
	//console.log(a_data);
	console.log(a_rpt_config);

	var options = {
        format: a_rpt_config.format,
        orientation: a_rpt_config.orientation,
        border: a_rpt_config.border
    };

	var dataGlobal = [];
	var dataGroup = null;
	var dataGroup_current = null;
	var dataDetail = null;
	var dataRow = null;
	
	for (var j=0; j < a_data.length; j++)
	{
		dataGroup = new Object();
		dataDetail = new Object();
		
		// Grupo
		for (var i=0; i < a_rpt_config.group.length; i++)
		{
			dataGroup[a_rpt_config.group[i].col] = a_data[j][a_rpt_config.group[i].col];
		}

		// Detalle
		for (var k=0; k < a_rpt_config.detail.length; k++)
		{
			dataDetail[a_rpt_config.detail[k].col] = a_data[j][a_rpt_config.detail[k].col];
		}
		
		if (dataGroup_current)
		{
			if (isEqual(dataGroup_current, dataGroup))
			{
				dataRow["detail"].push(dataDetail);
			}
			else
			{
				dataGlobal.push(dataRow);
				dataGroup_current = { ...dataGroup};
				dataRow = { ...dataGroup_current};
				dataRow["detail"] = [];
				dataRow["detail"].push(dataDetail);
			}
		}
		else
		{
			dataGroup_current = { ...dataGroup };
			dataRow = { ...dataGroup_current};
			dataRow["detail"] = [];
			dataRow["detail"].push(dataDetail);
		}
	}
	dataGlobal.push(dataRow);
	
	console.log(dataGlobal);
	
	var DataRecord = dataGlobal;

	var document = {
    html: html,
    data: {
        company: "DISMATEL, S.A. DE C.V.",
		title: a_rpt_config.title,
		range: "Del 1 al 15 de Octubre 2019",
		rows: DataRecord
    },
    path: "./img/output.pdf"
	};
	
	pdf.create(document, options)
    .then(resp => {
		console.log(resp)
		httpMsgs.showResource(a_req, a_resp, "/img/", ".pdf", "output.pdf", "application/pdf", "binary");
		})
    .catch(error => {console.error(error)});

	return;
}