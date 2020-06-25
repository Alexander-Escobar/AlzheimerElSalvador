USE DBAlzheimer;

SELECT '**** Cambiando el Delimitador ****' as 'INFO';

delimiter $$

SELECT '**** Creando el Trigger ****' as 'INFO' $$

CREATE TRIGGER tbi_usuario 
	BEFORE INSERT 
	ON usuario FOR EACH ROW 
BEGIN
	IF (NEW.password IS NULL) THEN
		SET NEW.password = MD5(MD5(NEW.correo));
	END IF;
END; $$

SELECT '**** Cambiando el Delimitador ****' as 'INFO' $$

delimiter ;

SELECT '**** Fin Scripts ****' as 'INFO';
