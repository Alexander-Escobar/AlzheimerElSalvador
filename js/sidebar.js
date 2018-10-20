var hamburguesa = document.querySelector('.toggle');


hamburguesa.addEventListener('click', function() 
{
  
  if(document.querySelector('.ex'))
  {
    var expandida = document.querySelector('.ex');
    var pivote = expandida.classList.contains('ex');
    console.log('Existe un elemento ocultable: ' + pivote);
    
    while (pivote == true) 
	{
      expandida.classList.remove('ex');
      expandida.classList.add('ok');
      
      if(document.querySelector('.ex')){
        var expandida = document.querySelector('.ex');
        console.log('Aun existe un elemento ocutable.');
      } 
	  else 
	  {
          var pivote = false;
          var expandida = false;
          console.log('Ya no existe ningun elemento ocutable.');
          if(document.querySelector('.fa-angle-double-left')){
            var fonta = document.querySelector('.fa-angle-double-left');
            fonta.classList.remove('fa-angle-double-left');
            fonta.classList.add('fa-list-ul');
            console.log('Cambiado Icono Toggle');
          }
        } // else
    } // end while 1
  } else if(document.querySelector('.moe'))
  {
      var colapsada = document.querySelector('.moe');
      var pivote = colapsada.classList.contains('moe');
      console.log('No existe un elemento ocultable, encontrado uno expandible: ' + pivote);
    
      while (pivote == true) {
        colapsada.classList.remove('moe');
        colapsada.classList.add('ex');
      
        if(document.querySelector('.moe'))
		{
          var colapsada = document.querySelector('.moe');
          console.log('Aun existe un elemento expandible.');
        } else 
		{
            var pivote = false;
            var colapsada = false;
            console.log('Ya no existe ningun elemento expandible.');
            if(document.querySelector('.fa-bars')){
              var fonta = document.querySelector('.fa-bars');
              fonta.classList.remove('fa-bars');
              fonta.classList.add('fa-angle-double-left');
              console.log('Cambiado Icono Toggle');
            }
          } // end else
      } // end while 2
    } else if(document.querySelector('.ok'))
	{
        var oculta = document.querySelector('.ok');
        var pivote = oculta.classList.contains('ok');
        console.log('No existe un elemento expandible, encontrado uno mostrable: ' + pivote);
    
        while (pivote == true) 
		{
          oculta.classList.remove('ok');
          oculta.classList.add('moe');
      
          if(document.querySelector('.ok'))
		  {
            var oculta = document.querySelector('.ok');
            console.log('Aun existe un elemento mostrable.');
          } 
		  else 
		  {
              var pivote = false;
              var oculta = false;
              console.log('Ya no existe ningun elemento mostrable.');
              if(document.querySelector('.fa-list-ul')){
                var fonta = document.querySelector('.fa-list-ul');
                fonta.classList.remove('fa-list-ul');
                fonta.classList.add('fa-bars');
                console.log('Cambiado Icono Toggle');
              }
            } // end else
        } // end while 3
      } 
	  else 
	  { console.log('NO debes ver esto'); }
})

var nav = document.querySelectorAll('.sidebar-nav-item');
  
nav[0].addEventListener('click', function(){ var clica = nav[0];var activo = document.querySelector('.active');if( clica !== activo) { activo.classList.remove('active');clica.classList.add('active');console.log("1 activado"); } else { console.log("nulo"); } })

nav[1].addEventListener('click', function(){ var clica = nav[1];var activo = document.querySelector('.active');if( clica !== activo) { activo.classList.remove('active');clica.classList.add('active');console.log("2 activado"); } else { console.log("nulo"); } })

nav[2].addEventListener('click', function(){ var clica = nav[2];var activo = document.querySelector('.active');if( clica !== activo) { activo.classList.remove('active');clica.classList.add('active');console.log("3 activado"); } else { console.log("nulo"); } })

nav[3].addEventListener('click', function(){ var clica = nav[3];var activo = document.querySelector('.active');if( clica !== activo) { activo.classList.remove('active');clica.classList.add('active');console.log("4 activado"); } else { console.log("nulo"); } })

nav[4].addEventListener('click', function(){ var clica = nav[4];var activo = document.querySelector('.active');if( clica !== activo) { activo.classList.remove('active');clica.classList.add('active');console.log("5 activado"); } else { console.log("nulo"); } })

nav[5].addEventListener('click', function(){ var clica = nav[5];var activo = document.querySelector('.active');if( clica !== activo) { activo.classList.remove('active');clica.classList.add('active');console.log("6 activado"); } else { console.log("nulo"); } })
  
//nav[6].addEventListener('click', function(){ var clica = nav[6];var activo = document.querySelector('.active');if( clica !== activo) { activo.classList.remove('active');clica.classList.add('active');console.log("7 activado"); } else { console.log("nulo"); } })
//
//nav[7].addEventListener('click', function(){ var clica = nav[7];var activo = document.querySelector('.active');if( clica !== activo) { activo.classList.remove('active');clica.classList.add('active');console.log("8 activado"); } else { console.log("nulo"); } })
//
//nav[8].addEventListener('click', function(){ var clica = nav[8];var activo = document.querySelector('.active');if( clica !== activo) { activo.classList.remove('active');clica.classList.add('active');console.log("9 activado"); } else { console.log("nulo"); } })