USE DBAlzheimer;

SELECT '**** Cambiando el Delimitador ****' as 'INFO';

delimiter $$

SELECT '**** Creando el Trigger ****' as 'INFO' $$

CREATE PROCEDURE sp_resetpass(IN a_correo VARCHAR(50), IN a_pass VARCHAR(60), IN a_newpass VARCHAR(60))
BEGIN
	declare v_exist int;
	declare v_return varchar(7);

	SET v_return = "FAILURE";
	
	SELECT count(1)
	FROM usuario
	WHERE correo = a_correo 
		AND password = MD5(a_pass)
	INTO v_exist;
	
	if (v_exist > 0) then
		UPDATE usuario
			set password = MD5(a_newpass)
		WHERE correo = a_correo
			AND password = MD5(a_pass);
		
		SET v_return = "OK";
	end if;
	
	SELECT v_return;

END; $$

SELECT '**** Cambiando el Delimitador ****' as 'INFO' $$

delimiter ;

SELECT '**** Fin Scripts ****' as 'INFO';
