var db = require('../js/db');
var httpMsgs = require('../js/httpmsgs');
var util = require('util');

exports.GetHome = function (a_req, a_resp)
{
	var l_sql = " SELECT * " +
				" FROM evento E ";
    db.executeSQL(l_sql, function(data, err)
    {
        if (err)
        {httpMsgs.show500(a_req, a_resp, err);}
        else
        {httpMsgs.showHome(a_req, a_resp, data);}
    });
};

exports.GetBoletin = function (a_req, a_resp)
{
    db.executeSQL("SELECT * FROM publicacion ORDER BY publicado DESC ", function(data, err)
    {
        if (err)
        {httpMsgs.show500(a_req, a_resp, err);}
        else
        {httpMsgs.showBoletinList(a_req, a_resp, data);}
    });
};

exports.GetStaticPage = function (a_page, a_req, a_resp)
{
	db.executeSQL("SELECT * FROM pagina_estatica WHERE id = " + a_page, function(data, err)
    {
        if (err)
        {httpMsgs.show500(a_req, a_resp, err);}
        else
        { httpMsgs.showStaticPage(a_req, a_resp, data);	}
    });
}

exports.GetPublicacion = function (a_filter, a_req, a_resp)
{
	var l_sql = "SELECT P.id, " +
					" P.titulo, " +
					" P.publicado, " +
					" P.introduccion, " +
					" P.contenido " +
					" FROM publicacion P " +
					" WHERE id = " + a_filter ;

    db.executeSQL(l_sql, function(data, err)
    {
        if (err)
        {httpMsgs.show500(a_req, a_resp, err);}
        else
        {httpMsgs.showPublicacion(a_req, a_resp, data);}
    });
};

exports.GetSiteMap = function (a_req, a_resp)
{
	var l_sql = " SELECT CONCAT('http://alzheimerelsalvador.org/boletin/', CONVERT(P.id, CHAR)) as url,  P.id as id, '' as descripcion, 0 as ord, 1 grup " +
					" FROM publicacion P ";
				
    db.executeSQL(l_sql, function(data, err)
    {
        if (err)
        {httpMsgs.show500(a_req, a_resp, err);}
        else
        {httpMsgs.showSiteMap(a_req, a_resp, data);}
    });
};

