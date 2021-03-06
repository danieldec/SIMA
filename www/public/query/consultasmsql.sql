SELECT ROUND(AVG(c.eficiencia),2), da.empleados_idempleados, c.fecha FROM captura AS c
INNER JOIN detalle_lista_numorden AS dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND da.asistencia_fecha
BETWEEN '2016-10-31' AND '2016-11-02'
xGROUP BY da.empleados_idempleados, c.fecha ORDER BY da.empleados_idempleados,c.fecha  ASC

SELECT da.empleados_idempleados, COUNT(*), e.*
FROM detalle_asistencia AS da
INNER JOIN empleados e ON e.idempleados=da.empleados_idempleados
WHERE da.asistencia_fecha BETWEEN '2016-10-31' AND '2016-11-02'
GROUP BY da.empleados_idempleados

SELECT ROUND(AVG(c.eficiencia),2)  AS efi, da.empleados_idempleados, c.fecha FROM captura AS c
INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND da.asistencia_fecha
BETWEEN '2016-10-31' AND '2016-11-02' AND da.empleados_idempleados='D-1022'
GROUP BY da.empleados_idempleados, c.fecha ORDER BY da.empleados_idempleados,c.fecha  ASC

SELECT ROUND(AVG(c.eficiencia),2) AS efi, da.empleados_idempleados, c.fecha FROM captura AS c
				INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
				INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND da.asistencia_fecha = '$nuevafecha' AND da.empleados_idempleados='$numEmp';


SELECT * FROM captura AS c
LEFT JOIN detalleTiempoM AS dtm ON dtm.idcaptura = c.idcaptura
LEFT JOIN tiempo_muerto AS tm ON tm.idtiempo_muerto=dtm.idtiempo_muerto
WHERE c.idcaptura='630'


SELECT c.fecha, nm.num_parte,e.idempleados,CONCAT_WS(' ',e.nombre,e.apellidos) AS nombre,ROUND(SUM(((TIME_TO_SEC(SUBTIME(c.hora_final,c.hora_inicio)))/60)/60) - (c.tiempo_muerto/60),1) as tT
FROM captura AS  c
INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_Lista_NumOrden = c.iddetalle_Lista_NumOrdenCap
INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia = dln.iddetalle_asistenciaDetList
INNER JOIN num_orden AS nm ON nm.idnum_orden = dln.idnum_ordenDetLis
INNER JOIN num_parte AS np ON np.num_parte=nm.num_parte
INNER JOIN empleados as e ON e.idempleados = da.empleados_idempleados
WHERE c.fecha BETWEEN '2016-10-31' AND '2016-11-02'
GROUP BY nm.num_parte,e.idempleados,c.fecha
ORDER BY c.fecha ASC,np.num_parte ASC,e.nombre ASC

SELECT *, COUNT(dtm.idcaptura) FROM captura AS  c
INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_Lista_NumOrden = c.iddetalle_Lista_NumOrdenCap
INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia = dln.iddetalle_asistenciaDetList
INNER JOIN num_orden AS nm ON nm.idnum_orden = dln.idnum_ordenDetLis AND nm.num_parte='11321'
INNER JOIN empleados as e ON e.idempleados = da.empleados_idempleados
LEFT JOIN detalleTiempoM AS dtm ON dtm.idcaptura = c.idcaptura
LEFT JOIN tiempo_muerto AS tm ON tm.idtiempo_muerto = dtm.idtiempo_muerto
WHERE c.fecha='2017-01-06'  AND c.idcaptura = '687'
ORDER BY `c`.`hora_final`  ASC;

SELECT * FROM captura AS  c
INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_Lista_NumOrden = c.iddetalle_Lista_NumOrdenCap
INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia = dln.iddetalle_asistenciaDetList
INNER JOIN num_orden AS nm ON nm.idnum_orden = dln.idnum_ordenDetLis AND nm.num_parte='11321'
INNER JOIN num_parte AS np ON np.num_parte=nm.num_parte
INNER JOIN empleados as e ON e.idempleados = da.empleados_idempleados
LEFT JOIN detalleTiempoM AS dtm ON dtm.idcaptura = c.idcaptura
LEFT JOIN tiempo_muerto AS tm ON tm.idtiempo_muerto = dtm.idtiempo_muerto
WHERE c.fecha BETWEEN '2016-10-31'  AND '2016-11-03'
ORDER BY c.fecha,da.empleados_idempleados,c.hora_inicio  ASC

--ejemplo de un operador la suma de horas trabajadas menos las horas de tiempo muerto.
SELECT SUM(TIME_TO_SEC(SUBTIME(c.hora_final,c.hora_inicio))/60)/60-SUM(c.tiempo_muerto/60) FROM captura AS c INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND da.empleados_idempleados='D-1291';
-- CONSULTA QUE NOS MUESTRE EL TIEMPO MUERTO QUE DEBEN TENER LOS EMPLEADOS POR DÍA
SELECT * FROM captura AS c
LEFT JOIN detalletiempom AS dtm ON dtm.idcaptura = c.idcaptura
INNER JOIN tiempo_muerto AS tm ON tm.idtiempo_muerto= dtm.idtiempo_muerto
INNER JOIN detalle_lista_numorden AS dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND DA.iddetalle_asistencia= 83

--OTRA CONSULTA DE TIEMPO MUERTO
SELECT * FROM captura AS c
LEFT JOIN detalletiempom AS dtm ON dtm.idcaptura = c.idcaptura
INNER JOIN tiempo_muerto AS tm ON tm.idtiempo_muerto= dtm.idtiempo_muerto
INNER JOIN detalle_lista_numorden AS dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList
INNER JOIN empleados AS e ON e.idempleados = da.empleados_idempleados AND e.idempleados='D-1275'
WHERE c.fecha = '2017-01-24';

SELECT * FROM empleados AS e
INNER JOIN detalle_asistencia AS da ON da.empleados_idempleados = e.idempleados
INNER JOIN detalle_lista_numorden AS dln ON dln.iddetalle_asistenciaDetList = da.iddetalle_asistencia
INNER JOIN captura AS c ON c.iddetalle_Lista_NumOrdenCap = dln.iddetalle_Lista_NumOrden
INNER JOIN num_orden AS nm ON nm.idnum_orden = dln.idnum_ordenDetLis
INNER JOIN num_parte AS np ON np.num_parte = nm.num_parte
WHERE c.fecha BETWEEN '2017-01-31' AND '2017-02-01' AND e.idempleados = 'D-617'
ORDER BY c.fecha,c.hora_inicio

SELECT * FROM captura AS c
INNER JOIN detalle_lista_numorden AS dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap AND dln.iddetalle_Lista_NumOrden = "1101"
INNER JOIN usuarios AS u ON u.idusuario = c.usuarios_idusuario
INNER JOIN empleados AS e ON e.idempleados = u.empleados_idempleados
LEFT JOIN detalletiempom AS dtm ON dtm.idcaptura=c.idcaptura

SELECT c.fecha, e.idempleados,CONCAT_WS(' ',e.nombre,e.apellidos) AS nombreC,da.iddetalle_asistencia, COUNT(c.idcaptura) AS cantidadCap FROM empleados AS e
INNER JOIN detalle_asistencia AS da ON da.empleados_idempleados = e.idempleados
INNER JOIN detalle_lista_numorden AS dln ON dln.iddetalle_asistenciaDetList = da.iddetalle_asistencia
INNER JOIN captura AS c ON c.iddetalle_Lista_NumOrdenCap = dln.iddetalle_Lista_NumOrden
INNER JOIN num_orden AS nm ON nm.idnum_orden = dln.idnum_ordenDetLis
INNER JOIN num_parte AS np ON np.num_parte = nm.num_parte
WHERE e.idempleados = 'D-617' AND c.fecha BETWEEN '2017-01-20' AND '2017-02-02'
GROUP BY c.fecha
ORDER BY c.fecha,c.hora_inicio
