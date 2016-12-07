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
    }
    //necesito saber que hacer cuando el num_rows sea mayor a cero
    else{

    }
    if (isset($_POST['pArregloTiempoMuerto'])&&$minutosTiempoMuerto>0) {
      $consulta="SELECT * FROM captura c WHERE c.iddetalle_Lista_NumOrdenCap='$detalleListaNumOrd' AND cast(c.eficiencia as decimal)=cast('$eficiencia' as decimal) AND c.tiempo_muerto='$minutosTiempoMuerto' AND c.hora_inicio='$horaInicio' AND c.hora_final='$horaFinal' AND c.fecha='$fecha'";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        $arreglo['Validacion']="ErrorDB";
        $arreglo['Datos']=$conexion->errno."($conexion->error)";
        echo json_encode($arreglo);
        exit();
      }
      $numeroFila=$resultado->num_rows;
      $fila=$resultado->fetch_object();
      $idCapturaTM=$fila->idcaptura;
      if ($numeroFila>0) {
        foreach ($_POST['pArregloTiempoMuerto'] as $valor) {
          foreach ($valor as $k=>$v) {
            if ($k==0) {
              $idTiempoM=$valor[$k];
            }
            if ($k==1) {
              if ($valor[$k]>0){
                $minutosTM=$valor[$k];
              }//fin del if
            }//fin del if
          }//fin del foreach
          $consulta="INSERT INTO detalleTiempoM (idcaptura,idtiempo_muerto,minutos) VALUES ('$idCapturaTM','$idTiempoM','$minutosTM')";
          $resultado=$conexion->query($consulta);
          if (!$resultado) {
            $arreglo['Validacion']="ErrorDB";
            $arreglo['Datos']=$conexion->errno."($conexion->error)";
            echo json_encode($arreglo);
            exit();
            }//fin del if
        }//fin del foreach
      }//fin del if
    }//fin del if del tiempo muerto;
  }//FIN DEL ELSE
  else{
    $arreglo = array();
    $arreglo['datos']="no entro";
    // echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
  }


 ?>
