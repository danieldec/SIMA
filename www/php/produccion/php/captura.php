<?php
  include_once '../../conexion/conexion.php';
  if(!isset($_SESSION)){
    session_start();
  }
  if (isset($_POST['fecha'])&&isset($_POST['cantidadCap'])&&isset($_POST['hI'])&&isset($_POST['hF'])&&isset($_POST['minTmCap'])&&isset($_POST['efiCap'])&&isset($_POST['detListNumOrd'])&&isset($_POST['detAsis'])) {
    $arreglo = array();
    $fecha=$_POST['fecha'];
    $cantidad=$_POST['cantidadCap'];
    $horaInicio=$_POST['hI'];
    $horaFinal=$_POST['hF'];
    $minutosTiempoMuerto=$_POST['minTmCap'];
    $eficiencia=$_POST['efiCap'];
    $detalleAsistencia=$_POST['detAsis'];
    $detalleListaNumOrd=$_POST['detListNumOrd'];
    $horaIFin=date("H:i:s",strtotime("+59 minutes",strtotime($horaInicio)));
    $idUsu=$_SESSION['idusuario'];
    $consulta="SELECT * FROM captura as c
    INNER JOIN detalle_Lista_NumOrden dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
    INNER JOIN detalle_asistencia da ON da.iddetalle_asistencia='$detalleAsistencia' AND da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList
    WHERE c.fecha='$fecha' AND (c.hora_inicio BETWEEN '$horaInicio' AND '$horaIFin') ORDER BY c.hora_inicio ASC";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      $arreglo['validacion']="error";
      $arreglo['datos']=$conexion->errno."(".$conexion->error.")";
      echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
      exit();
    }
    if ($resultado->num_rows<=0) {
      // $fecha $cantidad $horaInicio $horaFinal $minutosTiempoMuerto $eficiencia $detalleAsistencia $detalleListaNumOrd $horaIFin $idUsu;
      $consulta="INSERT INTO captura (idcaptura, fecha, cantidad, hora_inicio, hora_final, tiempo_muerto, eficiencia, usuarios_idusuario, iddetalle_Lista_NumOrdenCap, horaCaptura) VALUES (NULL,'$fecha','$cantidad','$horaInicio','$horaFinal','$minutosTiempoMuerto','$eficiencia','$idUsu','$detalleListaNumOrd',CURRENT_TIMESTAMP)";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        $arreglo['validacion']="error";
        $arreglo['datos']=$conexion->errno."(".$conexion->error.")";
        echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
        exit();
      }
      $arreglo['validacion']="exito";
      $arreglo['datos']="Captura realizada";
      echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
      // Temporal.. este comando->
      exit();
    }else{

    }
    $arreglo['validacion']="exito";
    $arreglo['datos']="número de filas: ".$resultado->num_rows." horaFinalBusqueda: ".$horaIFin;
    echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
    if (isset($_POST['pArregloTiempoMuerto'])) {
      // $arreglo[]=$_POST['pArregloTiempoMuerto'];
    }
    // $arreglo[]=$fecha;
    // $arreglo[]=$cantidad;
    // $arreglo[]=$horaInicio;
    // $arreglo[]=$horaFinal;
    // $arreglo[]=$minutosTiempoMuerto;
    // $arreglo[]=$eficiencia;
    // $arreglo[]=$detalleAsistencia;
    // $arreglo[]=$detalleListaNumOrd;
    // echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
  }else{
    $arreglo = array();
    $arreglo['datos']="no entro";
    // echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
  }


 ?>
