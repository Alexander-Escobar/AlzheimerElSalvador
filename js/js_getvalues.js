/*
	Funcionalidad que repite o crea un conjunto de objetos en base a una lista de valores JSON obtenidas por una Api REST
	
	GetValues(a_RecursoURL, a_ItemTag, a_FormatString) 
	F_itemListSuccess(a_items, a_ItemTag, a_FormatString)
	F_itemAddRow(a_item, a_ItemTag, a_FormatString)
	F_itemBuildTableRow(a_item, a_FormatString)
	handleException(a_request, message, error)
*/

function GetValues(a_RecursoURL, a_ItemTag, a_FormatString, a_column) 
{
  // Call Web API to get a list of "data Values"
  var data = {col: a_column};
	
  $.ajax({
    url: a_RecursoURL,
    type: 'POST',
    dataType: 'json',
	data: data,
	//contentType: false,
	contentType: "application/json",
    //processData: false,
	//cache: false,
    success: function (items)
	{F_itemListSuccess(items, a_ItemTag, a_FormatString);},
    error: function (request, message, error) 
	{handleException(request, message, error);}
  });
}

function F_itemListSuccess(a_items, a_ItemTag, a_FormatString) {
  // Iterate over the collection of data
  $.each(a_items, function (index, item) {
    // Add a row to the Product table
    F_itemAddRow(item, a_ItemTag, a_FormatString);
  });
}

function F_itemAddRow(a_item, a_ItemTag, a_FormatString) {
 // Check if <tbody> tag exists, add one if not
  //if ($("#itemTable tbody").length == 0) {
  // $("#itemTable").append("<tbody></tbody>");
  //}

  // Append row to <table>
  $("#"+a_ItemTag).append(F_itemBuildTableRow(a_item, a_FormatString));
}

function F_itemBuildTableRow(a_item, a_FormatString) 
{
	var l_string = a_FormatString;
	var l_search = '';

	$.each(a_item, function(l_index, l_item) 
	{
		l_search = '[[' + l_index + ']]';
		
		l_string = l_string.replace(new RegExp(l_search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), l_item);
		//l_string = l_string.replace("[[" + l_index + "]]", l_item);
	});
	return l_string;
}

function handleException(a_request, message, error) {
  var l_msg = "";
  l_msg += "Code: " + a_request.status + "\n";
  l_msg += "Text: " + a_request.statusText + "\n";
  if (a_request.responseJSON != null)
  {l_msg += "Message" + a_request.responseJSON.Message + "\n";}
  alert(l_msg);
}