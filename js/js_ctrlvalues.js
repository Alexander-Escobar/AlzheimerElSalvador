/*
	Funcionalidades CRUD, mediante Api REST del lado del cliente
	
	itemUpdate(a_RecursoURL, a_Item)
	itemInsert(a_RecursoURL, a_Item)
	itemDelete(a_RecursoURL, a_Item)
	handleException(request, message, error)
*/

function itemUpdate(a_RecursoURL, a_Item) 
{
  // Call Web API to get a list of Product
  $.ajax({
    url: a_RecursoURL,
	type: 'PUT',
	contentType: "application/json;charset=utf-8",
	data: JSON.stringify(a_Item),
    success: function (data)
	{swal({title: "Registro Actualizado", text: "resultado del guardado", icon: "success", buttons: false, timer: 3000});},
    error: function (request, message, error) 
	{handleException(request, message, error);}
  });
}

function itemInsert(a_RecursoURL, a_Item) 
{
  // Call Web API to get a list of Product
  $.ajax({
    url: a_RecursoURL,
	type: 'POST',
	contentType: "application/json;charset=utf-8",
	data: JSON.stringify(a_Item),
    success: function (data)
	{ swal({title: "Registro Adicionado", text: "resultado del guardado", icon: "success", buttons: false, timer: 3000});},
    error: function (request, message, error) 
	{handleException(request, message, error);}
  });
}

function itemDelete(a_RecursoURL, a_Item) 
{
	swal({
		title: "¿Desea Eliminar el Registro?",
		text: "Una vez Eliminado, No podra ser Recuperado",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willDelete) => 
	{
		if (willDelete) 
		{
    
			// Call Web API to get a list of Product
			$.ajax(
			{
				url: a_RecursoURL+"/"+a_Item,
				type: "DELETE",
				success: function (data)
				{
					swal(
					{
					title: "Registro Eliminado", 
					text: "Id de registro "+a_Item, 
					icon: "success", 
					buttons: false,
					timer: 3000 
					});
				},
				error: function (request, message, error) 
				{handleException(request, message, error);}
		   
			});
	
		} else 
		{
			swal({title: "Operacion Cancelada", text: "Id de registro "+a_Item, icon:"error", buttons: false, timer:3000});
		}
	});
}

function handleException(request, message, error)
{
  var msg = "";
  msg += "Code: " + request.status + "\n";
  msg += "Text: " + request.statusText + "\n";
  if (request.responseJSON != null) 
  {msg += "Message" + request.responseJSON.Message + "\n";}
  //alert(msg);
  
  swal(
  {title: "Error", 
  text: msg, 
  icon: "error"
  });
}
