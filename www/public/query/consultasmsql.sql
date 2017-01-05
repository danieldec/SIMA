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