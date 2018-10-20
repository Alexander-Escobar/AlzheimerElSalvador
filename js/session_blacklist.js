//var blackList =['10.0.2.15'];

exports.ipTest = function(a_req)
{
	var l_ip = '';
	
	l_ip = a_req.ip || a_req.connection.remoteAddress || a_req.socket.remoteAddress || a_req.connection.socket.remoteAddress;
	l_port = a_req.socket.remotePort;

	return l_ip +'|'+ l_port;
};

////Part3, Blocking Client IP, if it is in the blacklist
//app.use(function(req, res, next) {
//  var ipAddress = getClientIp(req);
//  if(BLACKLIST.indexOf(ipAddress) === -1){
//    next();
//  } else {
//    res.send(ipAddress + ' IP is not in whiteList')
//  }
//});

//exports.ipSet = function(a_req, a_res)
//{
//	var ipAddress = test_ip(a_req);
//	
//	if (blackList.indexOf(ipAddress) === -1)
//	{
//		//adicionar a blackList
//	}
//	
//}

//exports.ipGet = function(a_ipAddress)
//{
//	if (!a_ipAddress) 
//	{ return ''; }
//	
//	// convert from "::ffff:192.0.0.1"  to "192.0.0.1"
//	if (a_ipAddress.substr(0, 7) == "::ffff:") 
//	{
//		a_ipAddress = ipAddress.substr(7)
//	}
//	
//	return a_ipAddress;
//}