<?php
  include '../conexion/conexion.php';
  $consulta="SELECT DISTINCT dln.iddetalle_asistenciaDetList FROM detalle_lista_numorden dln WHERE dln.iddetalle_asistenciaDetList IN(SELECT da.iddetalle_asistencia FROM detalle_asistencia da WHERE da.asistencia_fecha='2016-10-31');";
  $resultado=$conexion->query($consulta);
  if (!$resultado) {
    echo "conexion fallida".$conexion->errno."($conexion->error)";
  }
  $idDetaAsis=array();
  while ($fila=$resultado->fetch_object()) {
    $idDetaAsis[]=$fila->iddetalle_asistenciaDetList;
  }
  count($idDetaAsis);
 ?>
