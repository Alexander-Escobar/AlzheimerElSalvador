var mysql      = require('mysql');
var settings = require('../js/settings');

var con = mysql.createConnection({
  host     : settings.dbConfig.host,
  user     : settings.dbConfig.user,
  password : settings.dbConfig.password,
  database : settings.dbConfig.database
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //Make SQL statement:
  var sql = "INSERT INTO publicacion (id, titulo, subtitulo, contenido, publicado, autor, introduccion, tags, url_imagen) VALUES ?";

  //Make an array of values: 
  var values = [
	[1, 'Campaña de Sensibilizacion', '9 de Septiembre de 2017',
		'La Asociacion de Familiares Alzheimer de El Salvador, celebro la cobertura a la conferencia de Prensa, para presentar su Campa;a de sensibilizacion Alzheimer 2017 “Recuerdame: Un diagnostico temprano significa que puedo vivier bien por mas tiempo” y anunciar las diferrentes actividades que se desarrollanran a nivel nacional, en el marco del Mes Mundial del Alzheimer y Dia Mundial del Alzheimer.' +
		'Celebrado este Sabado 9 de Septiembre de 2017 en el Salon de usos Multiples del Colegio Medico',
		'2017-09-09 00:00:01',
		'Sandra Marroquin',
		'Campaña de Sensibilizacion Alzheimer 2017 &quot;Recuerdame: Un diagnostico temprano significa que puedo vivir bien por mas tiempo&quot;',
		'alzheimer, campaña, diagnostico',
		'intro.png'],
	[2, '1º Catchaton El Salvador', '17 de Septiembre',
		'Se les invita a la Primera Catchaton El Salvador a realizarse el día 17 de Septiembre en horario de 11:00 AM a 12:00 M (Hora Centroamérica ).' +
		'Con dicha actividad estaríamos conectándonos a un juego en línea llamado &quot;Stall Catcher&quot;, a través del cual estaríamos contribuyendo a la investigación que se realiza en este momento para entender el comportamiento del Alzheimer, apoyando a los investigadores de la universidad de Cornell a analizar los datos por medio de películas adquiridas por el microscopio, las cuales muestran el flujo sanguíneo de cerebros de ratones vivos, buscando en ellos &quot;Stalls&quot; (vasos sanguíneos bloqueados, donde la sangre no fluye).'+
		'Se pueden ver las indicaciones en: '+
		'https://youtu.be/E1N610MZoBw '+
		'Habrá dos equipos disputando quien hace mayor puntaje'+
		'Para unirse al equipo de San Salvador pueden inscribirse con el siguiente Link. '+
		'https://stallcatchers.com/main?team=66 '+
		'Para unirse al equipo de San Miguel pueden inscribirse con el siguiente Link '+
		'https://stallcatchers.com/main?team=67 ',
		'2017-09-12 00:00:01',
		'Sandra Marroquin',
		'Primera Catchaton El Salvador a realizarse el día 17 de Septiembre, actividad educativa mediante un juego en línea llamado &quot;Stall Catcher&quot;',
		'catchaton, juego',
		'stock-photo-133415415.jpg'],
	[3, '¿Qué es el Alzheimer?', '¿Cómo puedo saber si mi familia tiene Alzheimer?',
		'<p>' +
		'	Es una enfermedad cerebral que ocasiona problemas relacionados con la memoria, pensamientos y el comportamiento. No es una parte normal del envejecimiento.' +
		'</p>' +
		'<p>' +
		'	El Alzheimer empeora con el tiempo. Aunque los síntomas pueden empeorar mucho, el primer problema que muchas personas notan es el olvido suficientemente grave como para afectar su capacidad para funcionar en el hogar o en el trabajo, o para disfrutar pasatiempos permanentes.' +
		'</p>' +
		'<p>' +
		'	La enfermedad puede causar que una persona se confunda, se pierda en lugares conocidos, extravié las cosas o tenga problemas con el lenguaje.' +
		'	<br>' +
		'	Puede ser fácil de explicar el comportamiento inusual como parte del envejecimiento normal, especialmente cuando alguien parece físicamente saludable.' +
		'	<br>' +
		'	Cada vez hay más personas afectadas por la enfermedad de Alzheimer, cada año se diagnostican más casos de Alzheimer y desgraciadamente es probable que  el impacto de esta terrible enfermedad siga en aumento. El diagnóstico de la enfermedad de Alzheimer supone el inicio de un doloroso camino tanto para los pacientes, familiares y amigos. Dado que en consecuencia de esta enfermedad el paciente dependerá totalmente de otra persona ya que él no podrá realizar sus actividades como lo hacia anteriormente.' +
		'	<br>' +
		'	Técnicamente existe un caso cada 3.5 segundos, solo en centro América existen alrededor de 6 millones de casos diagnosticados, Se estima que 27 mil  personas padecen Alzheimer en El Salvador, siendo esta la única enfermedad mortal que va en aumento cada año.  Se estima que cada año se identifican 4.6 millones de casos nuevos se ha previsto que el envejecimiento progresivo de la población provocara que la cifra de personas afectadas por la enfermedad del Alzheimer casi se doble cada 20 años y en el año 2050, 115 millones de personas padezcan esta patología . ' +
		'	<br>' +
		'	El Alzheimer también tiene un gran impacto en el cuidador  del paciente ya que en su mayoría son familiares cercanos. Este rol es muy exigente y agotador que supone una gran  carga emocional y física ya que el paciente presenta una serie de cambios entre las principales pérdida de memoria, dificultad para tomar decisiones, disminución de la capacidad de aprendizaje y problemas para reconocer a familiares y amigos.' +
		'	<br>' +
		'	También las personas con Alzheimer tienen una reducción de realizar sus actividades cotidianas  normales y también complejas como por ejemplo el hecho de manejar dinero o realizar su higiene personal, dificultades para vestirse entre otras actividades básicas.' +
		'</p>' +
		'<img src=&quot;/img/intro.png&quot; alt=&quot;amigos tercera edad&quot; class=&quot;boletin-image&quot;>' +
		'<p>' +
		'	Esta enfermedad también causa en el paciente cambios de conducta que anteriormente no se presentaban, cambia totalmente su forma de ser aumentando en el cuidador la carga emocional. Pueden desarrollar y mantener conductas socialmente inadecuadas como por ejemplo delirios, agitación y agresión, depresión y cambios del apetito  o la alimentación. Los cambios conductuales son particularmente difíciles de tratar para la familia y el cuidador, y con frecuencia son la razón por la que el paciente es trasladado a una residencia.' +
		'</p>' +
		'' +
		'<br>' +
		'<h3>¿Cómo puedo saber si mi familia tiene Alzheimer?</h3>' +
		'<hr class=&quot;boletin-hr&quot;>' +
		'' +
		'<blockquote class=&quot;blockquote&quot;>' +
		'	<q class=&quot;mb-0&quot;>Una de las señales más comunes del Alzheimer, especialmente en las etapas tempranas, es olvidar información recién aprendida.</q>' +
		'</blockquote>' +
		'' +
		'<p>' +
		'	También se olvidan fechas y eventos importantes. También algunas personas experimentan cambios en su habilidad de desarrollar y seguir un plan o trabajar con números. Pueden tener dificultad en seguir una receta conocida o manejar las cuentas mensuales, se les hace difícil realizar tareas cotidianas del hogar, Para algunas personas, tener problemas de la vista es una señal del Alzheimer. Pueden tener dificultad en leer, juzgar distancias y determinar color o contraste, lo cual puede causar problemas para conducir un vehículo. Es posible, también, que paren en medio de conversar sin idea de cómo seguir o que repitan mucho lo que dicen. Puede ser que luchen por encontrar las palabras correctas o el vocabulario apropiado o que llamen cosas por un nombre incorrecto (como llamar un &quot;lápiz&quot; un &quot;palito para escribir&quot;). Estos son algunas señales que se pueden observar en las personas con la enfermedad del Alzheimer.' +
		'</p>' +
		'<p>' +
		'	Esta enfermedad realmente es difícil para el paciente y para el cuidador pero nunca se debe perder el hecho de que es nuestro familiar o persona cercana. El hecho de que Él o ella tuvo una vida normal en la que no olvidaba aspectos importantes de su vida y que esta enfermedad cambio totalmente su forma de ser y actuar  y se debe saber y reflexionar que tal vez esa persona olvide quien es pero el cuidador o la familia nunca olvidaran quien fue él y por lo tanto deben de ayudarlo y cuidarlo y sobre todo lograr que el paciente viva de una manera digna y feliz.' +
		'</p>' +
		'<blockquote class=&quot;blockquote&quot;>' +
		'	<q class=&quot;mb-0&quot;>Siendo el cuidador la luz en la oscuridad de las personas con Alzheimer.</q>' +
		'</blockquote>',
		'2018-08-15 00:00:01',
		'Jessy B.',
		'Cada 3.5 segundos es diagnosticado una persona en el mundo, solo en centro América existen alrededor de 6 millones de casos diagnosticados, Se estima que 27 mil  personas padecen Alzheimer en El Salvador' +
		'<footer class=&quot;blockquote-footer&quot;>Fuente: <cite title=&quot;Source Title&quot;>Asociacion Alzheimer www.alz.org</cite></footer>',
		'alzheimer, enfermedad',
		'art_ima.jpg']
  ];
  //Execute the SQL statement, with the value array:
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});


