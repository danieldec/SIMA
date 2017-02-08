<?php
  include '../../conexion/conexion.php';
  setlocale(LC_TIME , 'es_MX.utf8');
  if (isset($_POST['busEmpPost'])&&isset($_POST['datoBusEmp'])) {
    $tipBus = $_POST['busEmpPost'];
    $datoABus= $_POST['datoBusEmp'];
    $datos = array();
    $consulta = "SELECT e.idempleados, CONCAT_WS(' ',e.nombre,e.apellidos) AS nombre FROM empleados AS e WHERE ";
    if ($tipBus == "numEmpB") {
      $consulta.="e.idempleados LIKE '%$datoABus%' AND e.estado=1 LIMIT 5;";
    }elseif ($tipBus == "nomEmpB") {
      $consulta.="CONCAT_WS(' ', e.nombre,e.apellidos) LIKE '%$datoABus%' AND e.estado = 1 LIMIT 5;";
    }
    $resultado = $conexion->query($consulta);
    if (!$resultado) {
      $datos[]=$conexion->errno."($conexion->error)";
    }//fin del if
    if ($resultado->num_rows<=0) {
      $datos[]="no se encuentran resultados con esta busqueda: ".$datoABus;
    }else{
      $reg=0;
      while ($fila=$resultado->fetch_object()) {
        if ($tipBus=="numEmpB") {
          $datos[$reg]['value']=$fila->idempleados;
          $datos[$reg]['label']=$fila->nombre;
        }elseif ($tipBus=="nomEmpB") {
          $datos[$reg]['value']=$fila->idempleados;
          $datos[$reg]['label']=$fila->nombre;
        }//fin del elseif
        $reg++;
      }//fin del while
    }//fin del else
    echo json_encode($datos,JSON_UNESCAPED_UNICODE);
  }//fin del if
  if (isset($_POST['detAsis'])) {
    $detAsis= $_POST['detAsis'];
    $datos = array();
    $consulta = "SELECT c.idcaptura,c.fecha,e.idempleados,CONCAT_WS(' ',e.nombre,e.apellidos) AS nombreEmp,c.cantidad,c.hora_inicio,c.hora_final,c.tiempo_muerto,c.eficiencia,nm.idnum_orden,nm.num_parte FROM detalle_asistencia AS da
    INNER JOIN empleados AS e ON e.idempleados = da.empleados_idempleados
    INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_asistenciaDetList = da.iddetalle_asistencia
    INNER JOIN num_orden AS nm ON nm.idnum_orden = dln.idnum_ordenDetLis
    INNER JOIN num_parte AS np ON np.num_parte = nm.num_parte
    INNER JOIN captura AS c ON c.iddetalle_Lista_NumOrdenCap = dln.iddetalle_Lista_NumOrden
    INNER JOIN usuarios AS u ON u.idusuario = c.usuarios_idusuario
    INNER JOIN empleados AS eu ON eu.idempleados = u.empleados_idempleados
    WHERE da.iddetalle_asistencia = '$detAsis';";
    $resultado = $conexion->query($consulta);
    if (!$resultado) {
      $datos['validacion'] = "error";
      $datos['datos'] = $conexion->errno."($conexion->error)";
    }else{
      $datos['validacion'] = "exito";
      $tbody="";
      while ($fila = $resultado->fetch_object()) {
        $tbody.="<tr><td>$fila->idcaptura</td>";
        $tbody.="<td>$fila->fecha</td>";
        $tbody.="<td>$fila->idempleados</td>";
        $tbody.="<td>$fila->nombreEmp</td>";
        $tbody.="<td>$fila->cantidad</td>";
        $tbody.="<td>$fila->hora_inicio</td>";
        $tbody.="<td>$fila->hora_final</td>";
        $tbody.="<td>$fila->tiempo_muerto</td>";
        $tbody.="<td>$fila->eficiencia</td>";
        $tbody.="<td>$fila->idnum_orden</td>";
        $tbody.="<td>$fila->num_parte</td></tr>";
      }
      $datos['datos'] = $tbody;
    }
    echo json_encode($datos,JSON_UNESCAPED_UNICODE);
  }
  if (isset($_POST['datosForm'])&&isset($_POST['fechaIB'])&&isset($_POST['fechaFB'])) {
    $datos = array();
    $datosF= $_POST['datosForm'];
    $fechaI=$_POST['fechaIB'];
    $fechaF=$_POST['fechaFB'];
    parse_str($datosF);
    $consulta = "SELECT c.fecha, e.idempleados,CONCAT_WS(' ',e.nombre,e.apellidos) AS nombreC,ROUND(AVG(c.eficiencia),2) AS efi,da.iddetalle_asistencia,ROUND(SUM(TIME_TO_SEC(c.hora_final-c.hora_inicio)/60)/60,2) as ttot, ROUND(SUM(c.tiempo_muerto/60),2) AS tm, ROUND(SUM(TIME_TO_SEC(c.hora_final-c.hora_inicio)/60)/60 - SUM(c.tiempo_muerto/60),2) ttrab
    FROM empleados AS e
    INNER JOIN detalle_asistencia AS da ON da.empleados_idempleados = e.idempleados
    INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_asistenciaDetList = da.iddetalle_asistencia
    INNER JOIN captura AS c ON c.iddetalle_Lista_NumOrdenCap = dln.iddetalle_Lista_NumOrden
    INNER JOIN num_orden AS nm ON nm.idnum_orden = dln.idnum_ordenDetLis
    INNER JOIN num_parte AS np ON np.num_parte = nm.num_parte
    WHERE e.idempleados = '$inpEmpABus' AND c.fecha BETWEEN '$fechaI' AND '$fechaF'
    GROUP BY c.fecha
    ORDER BY c.fecha ASC;";
    $resultado = $conexion->query($consulta);
    if (!$resultado) {
      $datos['validacion'] = "errorDB";
      $datos['datos'] = $conexion->errno."($conexion->error)";
    }
    else{
      if($resultado->num_rows==0){
        $datos['validacion'] = "error";
        $datos['datos'] = "Datos no encontrados";
      }else{
        $datos['validacion'] = "exito";
        $tbody="";
        $tabIndex=1;
        while ($fila=$resultado->fetch_object()) {
          if(floatval($fila->ttrab)+floatval($fila->tm) == 9.0){
            $tbody.="<tr class='success'><td>$fila->fecha</td>";
          }else{
            $tbody.="<tr class='danger'><td>$fila->fecha</td>";
          }
          $tbody.="<td>$fila->idempleados</td>";
          $tbody.="<td>$fila->nombreC</td>";
          $tbody.="<td>$fila->efi</td>";
          $tbody.="<td>$fila->ttot</td>";
          $tbody.="<td>$fila->tm</td>";
          $tbody.="<td>$fila->ttrab</td>";
          $tbody.="<td class='detAsisDia' tabindex = '".$tabIndex."'>$fila->iddetalle_asistencia</td></tr>";
          $tabIndex++;
        }
        $datos['datos'] = $tbody;
      }
    }
    echo json_encode($datos,JSON_UNESCAPED_UNICODE);
  }
 ?>
