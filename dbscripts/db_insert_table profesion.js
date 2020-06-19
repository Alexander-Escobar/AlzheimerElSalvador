var mysql = require('mysql');
var settings = require('../js/settings');

var con = mysql.createConnection({
  host     : settings.dbConfig.host,
  user     : settings.dbConfig.user,
  password : settings.dbConfig.password,
  database:  settings.dbConfig.database
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //Make SQL statement:
  var sql = "INSERT INTO profesion (id, descripcion) VALUES ?";

  //Make an array of values:
  var values = [
			[1, "NO DEFINIDO" ],
			[2, "Abogado/a" ],
			[3, "Administrador de Empresa" ],
			[4, "Arquitecto" ],
			[5, "Bachiller General" ],
			[6, "Bachiller Técnico" ],
			[7, "Carpintero" ],
			[8, "Chef/Cocinero/a" ],
			[9, "Cirujano" ],
			[10, "Contador/a" ],
			[11, "Dentista" ],
			[12, "Doctor/a" ],
			[13, "Enfermero/a" ],
			[14, "Fontanero" ],
			[15, "Fotógrafo/a" ],
			[16, "Ingeniería Agropecuaria" ],
			[17, "Ingeniería Agrícola" ],
			[18, "Ingeniería Biológica" ],
			[19, "Ingeniería Civil" ],
			[20, "Ingeniería Eléctrica" ],
			[21, "Ingeniería Empresarial" ],
			[22, "Ingeniería Física" ],
			[23, "Ingeniería Industrial" ],
			[24, "Ingeniería Mecanica" ],
			[25, "Ingeniería Otros" ],
			[26, "Ingeniería Química" ],
			[27, "Ingeniería en Sistemas Informaticos" ],
			[28, "Labores del hogar" ],
			[29, "Licenciado" ],
			[30, "Licenciado en Educación" ],
			[31, "Maestro/a" ],
			[32, "Periodista" ],
			[33, "Policía" ],
			[34, "Profesor/a" ],
			[35, "Taxista" ],
			[36, "Tecnólogo en Enfermería" ],
			[37, "Trabajador/a Social" ],
			[38, "Trabajador/a de Fabrica" ],
			[39, "Técnico Otros" ],
			[40, "Técnico en Enfermería" ],
			[41, "Veterinario/a" ]
  ];
  //Execute the SQL statement, with the value array:
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
