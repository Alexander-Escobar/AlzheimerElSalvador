//	Servicio de Mensajeria (Service Mailer)
//
//	Listado:
//	SSend		Service Send

var settings = require('../js/settings');
var nodeMailer = require('nodemailer');
var db = require('../js/db');
const crypto = require('crypto')

// Serv Send, Envio de Correo
// Recibe una estructura con los argumentos requeridos por un correo
// Envia el correo y lo registra en el log
exports.SSend = function (a_mensaje, a_idformat = 0)
{
	var l_pass = '';
	var l_emailFormat = settings.servMail.emailFormat[a_idformat].toString();
	
	console.log("servmailer SSend");
	
	let hash = crypto.createHash('md5').update(a_mensaje.email).digest("hex");
	
	values = [a_mensaje.subject, a_mensaje.email, hash];	
 
	l_emailFormat = l_emailFormat.replace(/{\d+}/g, function(name, offset, string) {
		// This function is called 3 times
		name; // '1', '2', '3'
		offset; // 0, 2, 4
		string; // Always '1 2 3'

		return values[Number(name.substr(1,1))]; // return 'foo', 'bar', 'baz'
	});

	let transporter = nodeMailer.createTransport(settings.servMail.transport);
  
	let mailOptions = {
		// should be replaced with real recipient's account
		from: settings.servMail.fromEmail,
		to: a_mensaje.email,
		subject: ' Credenciales de Acceso ' + a_mensaje.subject,
		html: l_emailFormat
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
	});
};


	//var l_sql = " SELECT MD5(correo) new_pass " +
	//			" FROM usuario WHERE correo = '" + a_mensaje.email + "'";
    //db.executeSQL(l_sql, function(data, err)
    //{
    //    if (err)
    //    {console.log(err);}
    //    else
    //    { 
	//		l_pass = data[0].new_pass;
	//		console.log(data);
	//	}
    //});