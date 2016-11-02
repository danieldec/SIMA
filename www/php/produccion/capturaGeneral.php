<?php
  include '../conexion/conexion.php';
  if(!isset($_SESSION)){
    session_start();
  }
  if (isset($_POST['pTabCapNumEmp'])) {
    $fecha=fechaActual();
    $arreglo= array('Validacion'=>'','Datos'=>'' );
    $arreglo=mostrarListaEmpleados($conexion,$fecha['fechaHoy'],$arreglo);
    echo json_encode($arreglo);
  }
  function fechaActual()
  {
    include '../conexion/conexion.php';
    $fecha=date('Y-m-d');
    $fechaHoy=date('Y-m-d',strtotime($fecha));
    $consulta="SELECT MAX(a.fecha) hoy from asistencia a";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      errorConsulta($resultado,$conexion);
    }
    $fila=$resultado->fetch_array();
    if ($fila['hoy']==$fechaHoy) {
      $fechaAyer=date('Y-m-d',strtotime($fecha."-1 day"));
      $fechaManana=date('Y-m-d',strtotime($fecha."+1 day"));
      return $fechas= array('fechaHoy' => $fechaHoy,'fechaAyer'=>$fechaAyer,'fechaManana'=>$fechaManana );
    }
  }
  function mostrarListaEmpleados($conexion,$hoy,$arreglo){
    $consulta="select e.idempleados, concat_ws(' ',e.nombre,e.apellidos) as Nombre,da.iddetalle_asistencia  from detalle_asistencia as da, empleados as e where da.asistencia_fecha='$hoy' and e.idempleados=da.empleados_idempleados order by da.iddetalle_asistencia ASC";
    $resultado=$conexion->query($consulta);
    $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
    if ($arreglo['Validacion']=='Error') {
      return $arreglo;
    }
    $arreglo['Validacion']="Exito";
    $datos="";
    while ($fila=$resultado->fetch_array()) {
      $datos=$datos."<tr><td>".$fila['idempleados']."</td>";
      $datos=$datos."<td>".$fila['Nombre']."</td>";
      $datos=$datos."<td>".tmTot($fila['iddetalle_asistencia'])."</td>";
      $datos=$datos."<td>".hrsTrabTot($fila['iddetalle_asistencia'])."</td>";
      for ($i=0; $i <24 ; $i++) {
        if ($i>=0&&$i<12) {
          $datos=$datos."<td>".horaConsulta($i,$fila['iddetalle_asistencia'])."</td>";
        }else{
          $datos=$datos."<td hidden='hidden'>".horaConsulta($i,$fila['iddetalle_asistencia'])."</td>";
        }
      }
      $datos=$datos."<td class='detAsisCap'>".$fila['iddetalle_asistencia']."</td></tr>";
    }
    $arreglo['Datos']=$datos;
    return $arreglo;
  }

  function errorConsultaJSON($resultado,$conexion,$arreglo)
  {
    if (!$resultado){
      $arreglo['Validacion']="Error";
      $arreglo['Datos']="(".$conexion->errno.").".$conexion->error;
      $conexion->close();
      return $arreglo;
    }
  }
  function horaConsulta($j,$detAsis)
  {
    $fechaH=date('Y-m-d');
    $fechaCero=$fechaH."07:00:00";
    $horaI=date("H:i:s",strtotime($fechaCero));
    $horaF=date("H:i:s",strtotime("+1 hour",strtotime($fechaCero)));
    for ($i=0; $i < 24; $i++) {
      if ($i==$j) {
        if ($i==0) {
          $horaI=date("H:i:s",strtotime($fechaCero));
          $horaF=date("H:i:s",strtotime("+1 hour -1 minutes",strtotime($fechaCero)));
          return rangoHora($horaI,$horaF,$detAsis);
        }
        $horaI=date("H:i:s",strtotime("+".$i." hour",strtotime($fechaCero)));
        $horaF=date("H:i:s",strtotime("+".($i+1)." hour -1 minutes",strtotime($fechaCero)));
        // return $horaI."  ".$horaF;
        return rangoHora($horaI,$horaF,$detAsis);
      }
    }
    // $horaI=date("H:i:s",strtotime("+".$i." hour",strtotime($fechaCero))); $horaF=date("H:i:s",strtotime("+".($i+1)." hour",strtotime($fechaCero)));
  }

  function rangoHora($horaI,$horaF,$detAsis)
  {
    include '../conexion/conexion.php';
    // return $horaI.$horaF.$detAsis;
    $consulta="SELECT * FROM captura c where c.iddetalle_Lista_NumOrdenCap in(SELECT dln.iddetalle_Lista_NumOrden from detalle_Lista_NumOrden dln WHERE dln.iddetalle_asistenciaDetList in (SELECT da.iddetalle_asistencia FROM detalle_asistencia da WHERE da.iddetalle_asistencia='$detAsis')) AND (c.hora_inicio BETWEEN '$horaI' AND '$horaF');";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      return $conexion->errno." ".$conexion->error;
    }
    if ($conexion->affected_rows<=0) {
      return "<abbr style='color:rgb(138, 19, 12);'title='Sin Captura'>0</abbr>";
    }else{
      $contador=1;
      $filas=$resultado->num_rows;
      $minutos=0;
      while ($fila=$resultado->fetch_object()) {
        $horaIDB=$fila->hora_inicio;
        $horaFDB=$fila->hora_final;
        $minutos=$minutos+abs(strtotime($horaIDB)-strtotime($horaFDB))/60;
        if ($contador==$filas) {
          if ($minutos<60) {
            return "<abbr style='color:rgb(243, 255, 0)'title='Tiempo Incompleto'>$fila->eficiencia</abbr>";
          }else{
            return "<abbr style='color:rgba(8, 255, 47, 1);' title='Captura Completa'>$fila->eficiencia</abbr>";
          }//fin del else
        }//fin del if
        $contador++;
      }//fin del while
    }//fin del else
    $resultado->close();
  }//fin de la función rangoHora
  function tmTot($iddetAsis)
  {
    include '../conexion/conexion.php';
    // return $iddetAsis;
    $consulta="SELECT SUM(c.tiempo_muerto) tm FROM captura c WHERE c.iddetalle_Lista_NumOrdenCap IN (SELECT dln.iddetalle_Lista_NumOrden FROM detalle_Lista_NumOrden dln WHERE dln.iddetalle_asistenciaDetList IN (SELECT da.iddetalle_asistencia FROM detalle_asistencia da WHERE da.iddetalle_asistencia='$iddetAsis'));";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      return $conexion->errno." ".$conexion->error;
    }
    $fila=$resultado->fetch_object();
    if (gettype($fila->tm)=='NULL') {
      return 0;
    }elseif (gettype($fila->tm)=="string") {
      return $fila->tm;
    }
  }//fin de la función calcTM
  function hrsTrabTot($iddetAsis)
  {
    include '../conexion/conexion.php';
    $consulta="SELECT * FROM captura c WHERE c.iddetalle_Lista_NumOrdenCap IN (SELECT dln.iddetalle_Lista_NumOrden FROM detalle_Lista_NumOrden dln WHERE dln.iddetalle_asistenciaDetList IN (SELECT da.iddetalle_asistencia FROM detalle_asistencia da WHERE da.iddetalle_asistencia='$iddetAsis'));";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      return $conexion->errno." ".$conexion->error;
    }
    $hrsTrab=0;
    while ($fila=$resultado->fetch_object()) {
      $horaIDB=$fila->hora_inicio;
      $horaFDB=$fila->hora_final;
      $hrsTrab=$hrsTrab+abs(strtotime($horaIDB)-strtotime($horaFDB))/60/60;
    }//fin del while
    return $hrsTrab;
  }
?>
