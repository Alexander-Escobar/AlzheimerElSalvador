# Alzheimer El Salvador
Sitio web de la Asociación Alzheimer de El Salvador

El objetivo principal es como respaldo en la nube, del desarrollo en sus versiones iniciales, y como guia de ejemplo para creacion de sitios basicos en Node.Js

El proyecto sigue la politica de CERO dependencias y un desarrollo Minimo, con el objetivo de que cualquiera pueda apoyar siempre y cuando posea los minimos conocimientos de HTML/CSS y JavaScript, el proyecto esta concebido en su Propio "FrameWork" o pseudo lenguaje declarativo utilizando JSON.

El sitio ha sido desarrollado con las siguientes tecnologias:
* HTML 5 / CSS 3
* JavaScripts ECMAScript 2018
* JQuery 3.3.1
* BootStrap 4.1.2 (popper.js 1.14.3)
* MySQL (Server) 8.0 Windows / 5.7 Ubuntu
* Node.JS (Creado Version 7, testeado en 8, 9, 10 y 12)

Dependencias
* stringbuilder 0.0.11
* formidable testeado 1.2.1 / 1.2.2
* nodemailer 6.3.0 / 6.4.11
* MySQL (Cliente) 2.15.0 / 2.18.1
* pdf-creator-node		/ 1.4.1

Librerias Auxiliares
* validetta 1.0.1 (validettaLang-es-ES 1.0.1 Custom)
* toast
* animate 3.6.2
* font-awesome 4.7
* flexdatalist 2.2.4
* sweetalert (Vigente a Marzo 2020)
* dataTables 1.10.19 
  * buttons 1.5.4
  * select	1.2.7
  * Export Flash 1.5.4
  * Export jszip 3.1.3
  * Export pdfmake 0.1.36
  * Export vfs_fonts 0.1.36
  * Export buttons html5 1.5.2
  * Export buttons print 1.5.2
  
Pasos para instalar en GCP, Ubunto VERSION 14/16 LTS:
1. Creacion del Servidor en GCP
   * f1-micro (N1 primera Generacion)
   * ubuntu 16.04 LTS (testeado desde la v14)
   * Permitir trafico HTTP
   * Disco Estandar (10 GB)
2. Configurar la Direccion IP a Estatica/Reservada
3. Instalar dependencias y actualizar paquetes
   - Actualizar los paquetes y el OS
   > $ sudo apt-get update
   - Instalar Node JS V12 & npm V6
   > $ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
   > $ sudo apt-get install -y nodejs
   > $ nodejs -v
   > $ npm -v
    
4. Instalacion y Configuracion de la Base de Datos, compatible con en la version de Ubunto (GCP) para VERSION 14/16 LTS
    // Definir un PASS para el usuario "root" "P@ssw0rd01"  <br>
    // Instalar server  <br>
    > $ sudo apt-get install mysql-server-5.7  <br>
    // Instalar cliente  <br>
    > $ sudo apt-get install mysql-client-5.5  <br>

    // detener o levantar el servicio  <br>
    > $ sudo service mysql [start|stop]  <br>

    // Probar el servicio y coneccion  <br>
    > $ mysql -hlocalhost -uroot -pP@ssw0rd01  <br>
    user: "root",  <br>
    password: "P@ssw0rd01",  <br>
    database: "DBAlzheimer"  <br>

5. Creacion del Proyecto
    * Creacion del espacio de trabajo
    > $ sudo mkdir $HOME/alzheimer
    - Creacion del Proyecto
    > $ sudo npm init
    - Instalacion de las Dependencias
    > $ npm install stringbuilder <br>
    > $ npm install nodemailer <br>
    > $ npm install formidable <br>
    > $ npm install pdf-creator-node <br>
    > $ npm install mysql <br>

6. Instalar y Configurar Git & GitHub
    * Instalar Git
    > $ sudo apt-get install git
    * Configurando Git
    > \# remplazar el usuario Alexander-Escobar <br>
    > $ git config --global user.name "user_name" <br> <br>
    > \# remplazar el correo alexander.enrique.escobar@gmail.com <br>
    > $ git config --global user.email "email_id" <br> <br>
    > remplazar con la carpeta de trabajo "grupolexar" <br>
    > $ git init "nombre_carpeta" <br> <br>
    > Cambiarse a la carpeta de trabajo "alzheimer" <br>
    > $ cd "nombre_carpeta" <br> <br>
    > \# Agregando un Origen Remoto llamado "origin" <br>
    > $ sudo git remote add origin https://github.com/Alexander-Escobar/AlzheimerElSalvador <br> <br>
    > \# Obteniendo los Ultimos cambios <br>
    > $ sudo git pull origin master
7. Levantar el Servicio (cambiar IP, por la IP Interna)
    > $ sudo nohup nodejs alzheimer/app.js --be_ip 10.128.0.4 &  <br>
    > $ exit


