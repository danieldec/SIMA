<?php
  include '../conexion/conexion.php';
  $consulta="SELECT DISTINCT dln.iddetalle_asistenciaDetList FROM detalle_Lista_NumOrden dln WHERE dln.iddetalle_asistenciaDetList IN(SELECT da.iddetalle_asistencia FROM detalle_asistencia da WHERE da.asistencia_fecha='2016-11-07');";
  $resultado=$conexion->query($consulta);
  if (!$resultado) {
    echo "conexion fallida".$conexion->errno."($conexion->error)";
    exit();
  }
  $idDetaAsis=array();
  while ($fila=$resultado->fetch_object()) {
    $idDetaAsis[]=$fila->iddetalle_asistenciaDetList;
  }
  echo count($idDetaAsis);
  print_r($idDetaAsis);
  $arrayCaptura=array();
  foreach ($idDetaAsis as $detAsis) {
    $consulta="SELECT AVG(c.eficiencia) FROM captura c ,detalle_Lista_NumOrden dln, detalle_asistencia da, empleados e WHERE c.iddetalle_Lista_NumOrdenCap IN (SELECT dln.iddetalle_Lista_NumOrden FROM detalle_Lista_NumOrden dln WHERE dln.iddetalle_asistenciaDetList IN (SELECT da.iddetalle_asistencia FROM detalle_asistencia da WHERE da.asistencia_fecha='2016-11-07')) AND dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap AND da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND e.idempleados=da.empleados_idempleados AND da.iddetalle_asistencia='$detAsis';";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Error:".$conexion->errno."($conexion->error)";
      exit();
    }
    while ($fila2=$resultado->fetch_object()) {
      $arrayCaptura[]=$fila2;
    }
  }//FIN DEL FOR EACH
  print_r($arrayCaptura);
 ?>
