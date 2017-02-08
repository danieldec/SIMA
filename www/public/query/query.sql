Este query se utilizo en el archivo de asistencia.php en la función mostrarListaEmpleados() en la línea 73
SELECT e.idempleados, concat_ws(' ',e.nombre,e.apellidos) as Nombre,da.iddetalle_asistencia  from detalle_asistencia as da, empleados as e where da.asistencia_fecha='2016-08-12' and e.idempleados=da.empleados_idempleados ORDER by e.idempleados ASC
$consulta="select e.idempleados, concat_ws(' ',e.nombre,e.apellidos) as Nombre,da.iddetalle_asistencia  from detalle_asistencia as da, empleados as e where da.asistencia_fecha='$hoy' and e.idempleados=da.empleados_idempleados order by da.iddetalle_asistencia ASC";

otro query que selecciona el número de parte apartir de detalle_Lista_NumOrden
SELECT * from detalle_Lista_NumOrden dln, detalle_asistencia as dt, empleados e, num_orden nm, num_parte np WHERE dln.iddetalle_asistenciaDetList=dt.iddetalle_asistencia and dt.empleados_idempleados = e.idempleados and dln.idnum_ordenDetLis=nm.idnum_orden and nm.num_parte=np.num_parte and np.num_parte=10048
-- otro query que nos va a mostrar los empleados que estan en un un número de parte con la fecha de asistencia del día.
SELECT * from detalle_asistencia da where (da.asistencia_fecha='$hoy') and ( da.iddetalle_asistencia IN (SELECT dln.iddetalle_asistenciaDetList from detalle_Lista_NumOrden dln WHERE dln.idnum_ordenDetLis='$numOrden' and dln.iddetalle_asistenciaDetList=da.iddetalle_asistencia ))

/*seleccionamos de la tabla detalle lista númerp de orden los empleados que estan en la tabla de asistencia de tal fecha y de tal número de orden*/
SELECT * from detalle_Lista_NumOrden dln where dln.iddetalle_asistenciaDetList IN(SELECT da.iddetalle_asistencia from detalle_asistencia da where da.asistencia_fecha='2016-09-19') and (dln.idnum_ordenDetLis='50008')
//lo que hacemos es obtener el último día y le sumamos un día para que nos arroje el día de hoy porque la última asistencia es de un día anterior y le damos formato
SELECT DATE_FORMAT(DATE_ADD(MAX(a.fecha), INTERVAL 1 DAY),'%d-%b-%Y') as hoyF, MAX(a.fecha) as hoy, DATE_ADD( MAX(a.fecha),INTERVAL 1 DAY) from asistencia a

ALTER TABLE `SIMAP`.`detalle_Lista_NumOrden` ADD UNIQUE INDEX `detNumOrdeListDup` (`idnum_ordenDetLis` DESC, `iddetalle_asistenciaDetList` DESC);

SELECT ROUND( SUM(((TIME_TO_SEC(SUBTIME(c.hora_final,c.hora_inicio)))/60)),0 ) as tT,COUNT(c.idcaptura) as contador FROM captura as c
		INNER JOIN detalle_Lista_NumOrden dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
		INNER JOIN detalle_asistencia da ON da.iddetalle_asistencia='983' AND da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList
		WHERE c.fecha='2016-12-06' AND (c.hora_inicio BETWEEN '10:00:00' AND '10:59:00') ORDER BY c.hora_inicio ASC

SELECT * FROM captura as c
    		INNER JOIN detalle_Lista_NumOrden dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
    		INNER JOIN detalle_asistencia da ON da.iddetalle_asistencia='966' AND da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList
    		WHERE c.fecha='2016-12-05' AND (c.hora_inicio BETWEEN '07:00:00' AND '07:59:00') ORDER BY c.hora_inicio ASC

SELECT c.fecha, e.idempleados,CONCAT_WS(' ',e.nombre,e.apellidos) AS nombreC,da.iddetalle_asistencia, COUNT(c.idcaptura) AS cantidadCap,SUM(TIME_TO_SEC(c.hora_final-c.hora_inicio)/60)/60 as ttot, SUM(c.tiempo_muerto/60) AS tm, SUM(TIME_TO_SEC(c.hora_final-c.hora_inicio)/60)/60 - SUM(c.tiempo_muerto/60) ttrab FROM empleados AS e
INNER JOIN detalle_asistencia AS da ON da.empleados_idempleados = e.idempleados
INNER JOIN detalle_lista_numorden AS dln ON dln.iddetalle_asistenciaDetList = da.iddetalle_asistencia
INNER JOIN captura AS c ON c.iddetalle_Lista_NumOrdenCap = dln.iddetalle_Lista_NumOrden
INNER JOIN num_orden AS nm ON nm.idnum_orden = dln.idnum_ordenDetLis
INNER JOIN num_parte AS np ON np.num_parte = nm.num_parte
WHERE e.idempleados = 'D-617' AND c.fecha BETWEEN '2017-01-30' AND '2017-02-03'
GROUP BY c.fecha
ORDER BY c.fecha ASC

SELECT * FROM detalle_asistencia AS da 
INNER JOIN empleados AS e ON e.idempleados = da.empleados_idempleados
INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_asistenciaDetList = da.iddetalle_asistencia
INNER JOIN num_orden AS nm ON nm.idnum_orden = dln.idnum_ordenDetLis
INNER JOIN num_parte AS np ON np.num_parte = nm.num_parte
INNER JOIN captura AS c ON c.iddetalle_Lista_NumOrdenCap = dln.iddetalle_Lista_NumOrden
INNER JOIN usuarios AS u ON u.idusuario = c.usuarios_idusuario
INNER JOIN empleados AS eu ON eu.idempleados = u.empleados_idempleados
WHERE da.iddetalle_asistencia = '1209'
