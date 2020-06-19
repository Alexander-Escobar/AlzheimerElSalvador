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
	var l_sql = " SELECT P.id, " +
					" P.titulo, " +
					" P.subtitulo, " +
					" DATE_FORMAT(P.publicado, '%M %d, %Y') as publicado, " +
					" P.autor, " +
					" P.introduccion, " +
					" P.tags, " +
					" P.url_imagen " +
				" FROM publicacion P " +
				" ORDER BY P.publicado DESC " +
				" LIMIT 10 ";

    db.executeSQL(l_sql, function(data, err)
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
	var l_sql = " SELECT P.id, " +
					" P.titulo, " +
					" P.subtitulo, " +
					" DATE_FORMAT(P.publicado, '%M %d, %Y') as publicado, " +
					" P.autor, " +
					" P.introduccion, " +
					" P.tags, " +
					" P.contenido, " +
					" P.url_imagen, " +
					" (SELECT max(X.id) FROM publicacion X) as ult_id " +
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

