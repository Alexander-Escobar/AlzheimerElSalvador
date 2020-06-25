USE DBAlzheimer;

SELECT '**** Cambiando el Delimitador ****' as 'INFO';

delimiter $$

SELECT '**** Creando el Trigger ****' as 'INFO' $$

CREATE TRIGGER tbi_paciente
	BEFORE INSERT 
	ON paciente FOR EACH ROW 
BEGIN
	DECLARE v_carnet varchar(9);
	DECLARE i_numero int;

	SET v_carnet = CONCAT(SUBSTRING(NEW.nombre, 1, 1), SUBSTRING(NEW.apellido, 1, 1));
	
	SELECT COUNT(1) + 1
	INTO i_numero
	FROM paciente PA
	WHERE CONCAT(SUBSTRING(PA.nombre, 1, 1), SUBSTRING(PA.apellido, 1, 1)) = v_carnet;
	
	SET NEW.carnet = CONCAT(SUBSTRING(NEW.nombre, 1, 1),SUBSTRING(NEW.apellido, 1, 1),YEAR(NOW()),LPAD(i_numero, 3, '0'));
END; $$

SELECT '**** Cambiando el Delimitador ****' as 'INFO' $$

delimiter ;

SELECT '**** Fin Scripts ****' as 'INFO';
