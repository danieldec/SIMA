<?php
  include_once '../../conexion/conexion.php';
  if (isset($_POST['horaC'])&&isset($_POST['fechaCompletaHoy'])&&isset($_POST['detAsis']))
  {
    $horaI=$_POST['horaC'];
    $fecha=$_POST['fechaCompletaHoy'];
    $detAsis=$_POST['detAsis'];
    $arreglo=array();
    $horaII=":00:00";
    $horaIF=":59:00";
    if ($horaI<10) {
      $horaI="0".$horaI;
      $horaII=$horaI.$horaII;
      $horaIF=$horaI.$horaIF;

    }else{
      $horaII=$horaI.$horaII;
      $horaIF=$horaI.$horaIF;
    }
    $consulta="SELECT ROUND( SUM(((TIME_TO_SEC(SUBTIME(c.hora_final,c.hora_inicio)))/60)),0 ) as tT,COUNT(c.idcaptura) as contador FROM captura as c
		INNER JOIN detalle_Lista_NumOrden dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
		INNER JOIN detalle_asistencia da ON da.iddetalle_asistencia='$detAsis' AND da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList
		WHERE c.fecha='$fecha' AND (c.hora_inicio BETWEEN '$horaII' AND '$horaIF') ORDER BY c.hora_inicio ASC";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      $arreglo['validacion']="error";
      $arreglo['datos']=$conexion->errno."(".$conexion->error.")";
      echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
      exit();
    }
    $fila=$resultado->fetch_object();
    $arreglo['validacion']="exito";
    $arreglo['datos']['tTT']=$fila->tT;
    $consulta="SELECT * FROM captura as c
    INNER JOIN detalle_Lista_NumOrden dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
	  INNER JOIN detalle_asistencia da ON da.iddetalle_asistencia='$detAsis' AND da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList
	  WHERE c.fecha='$fecha' AND (c.hora_inicio BETWEEN '$horaII' AND '$horaIF') ORDER BY c.hora_inicio ASC";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      $arreglo['validacion']="error";
      $arreglo['datos']=$conexion->errno."(".$conexion->error.")";
      echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
      exit();
    }
    while ($fila=$resultado->fetch_object()) {
      $horaFinalDB=$fila->hora_final;
    }
    $arreglo['validacion']="exito";
    $arreglo['datos']['horaFDb']=$horaFinalDB;
    echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
  }
 ?>
