<?php
  include '../conexion/conexion.php';
  $consulta="SELECT c.fecha,e.idempleados, CONCAT_WS(' ',e.nombre,e.apellidos) as Nombre, SUM(((TIME_TO_SEC(SUBTIME(c.hora_final,c.hora_inicio)))/60)/60) - SUM((c.tiempo_muerto/60)) as tT,nm.num_parte
  FROM captura c ,detalle_Lista_NumOrden dln, detalle_asistencia da, empleados e,num_orden nm,num_parte np
  WHERE c.iddetalle_Lista_NumOrdenCap
  IN (SELECT dln.iddetalle_Lista_NumOrden FROM detalle_Lista_NumOrden dln WHERE dln.iddetalle_asistenciaDetList
  IN (SELECT da.iddetalle_asistencia FROM detalle_asistencia da WHERE da.asistencia_fecha='2016-10-31' OR da.asistencia_fecha='2016-11-02'))
  AND dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap AND da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND e.idempleados=da.empleados_idempleados AND nm.idnum_orden=dln.idnum_ordenDetLis AND np.num_parte=nm.num_parte GROUP BY np.num_parte,e.idempleados,c.fecha ORDER BY c.fecha ASC, np.num_parte ASC, Nombre ASC;";
  $resultado=$conexion->query($consulta);
  if (!$resultado) {
    echo "error:".$conexion->errno."($conexion->error)";
    exit();
  }
  $contador=1;
 ?>
 <!DOCTYPE html>
 <html lang="es">
 <head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Tabla</title>
 </head>
 <body>
   <table>
     <thead>
       <tr>
         <th>#</th>
         <th>#empleado</th>
         <th>Nombre</th>
         <th># parte</th>
         <th>fecha</th>
         <th>H</th>
       </tr>
     </thead>
     <tbody>
       <?php while ($fila=$resultado->fetch_object()) {
         echo "<tr>";
         echo "<td>".$contador."</td>";
         echo "<td>".$fila->idempleados."</td>";
         echo "<td>".$fila->Nombre."</td>";
         echo "<td>".$fila->num_parte."</td>";
         echo "<td>".$fila->fecha."</td>";
         echo "<td>".round($fila->tT,1)."</td>";
         $contador++;
       }
        ?>
     </tbody>
   </table>
 </body>
 </html>
