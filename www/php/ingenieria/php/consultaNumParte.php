<?php
  include '../../conexion/conexion.php';
  if (isset($_POST['numParte']) && isset($_POST['busNumParte'])) {
    $numParte=$_POST['numParte'];
    $consulta="SELECT np.num_parte, np.rate FROM num_parte np WHERE np.num_parte LIKE '%$numParte%' AND np.estado = '1' LIMIT 5;";
    $resultado=$conexion->query($consulta);
    $datos=array();
    if (!$resultado) {
    $datos[]="$conexion->errno".$conexion->error;
    echo json_encode($datos,JSON_UNESCAPED_UNICODE);
    exit();
    }
    while ($fila=$resultado->fetch_object()) {
      $datos[]=$fila->num_parte;
    }
    if ($resultado->num_rows<=0) {
      $datos[]="NO EXISTE ESE NÚMERO DE PARTE";
      echo json_encode($datos,JSON_UNESCAPED_UNICODE);
      exit();
    }
    echo json_encode($datos,JSON_UNESCAPED_UNICODE);
    $conexion->close();
    $resultado->close();
  }//fin del if
  if (isset($_POST['numParte']) && isset($_POST['consulNumParte']) && $_POST['fechaFI'] && $_POST['fechaFF']) {
    $numParte = $_POST['numParte'];
    $consulNumParte = $_POST['consulNumParte'];
    $fechaI = $_POST['fechaFI'];
    $fechaF = $_POST['fechaFF'];
    $datos = array();
    $consulta="SELECT c.idcaptura,c.fecha,e.idempleados,CONCAT_WS(' ',e.nombre,e.apellidos) AS nombre, np.num_parte,np.rate,c.cantidad,c.hora_inicio,c.hora_final,c.eficiencia,c.tiempo_muerto,dtm.minutos,tm.descripcion FROM captura AS  c
    INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_Lista_NumOrden = c.iddetalle_Lista_NumOrdenCap
    INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia = dln.iddetalle_asistenciaDetList
    INNER JOIN num_orden AS nm ON nm.idnum_orden = dln.idnum_ordenDetLis AND nm.num_parte='$numParte'
    INNER JOIN num_parte AS np ON np.num_parte=nm.num_parte
    INNER JOIN empleados as e ON e.idempleados = da.empleados_idempleados
    LEFT JOIN detalleTiempoM AS dtm ON dtm.idcaptura = c.idcaptura
    LEFT JOIN tiempo_muerto AS tm ON tm.idtiempo_muerto = dtm.idtiempo_muerto
    WHERE c.fecha BETWEEN '$fechaI' AND '$fechaF'
    ORDER BY c.fecha,da.empleados_idempleados,c.hora_inicio ASC;";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      $datos['validacion']="error";
      $datos['datos']=$conexion->errno."(".$conexion->error.")";
      echo json_encode($datos,JSON_UNESCAPED_UNICODE);
      exit();
    }
    if ($resultado->num_rows==0) {
      $datos['validacion']="error";
      $datos['datos']="No se encontraron registros del número de parte "."<span>$numParte</span>";
      echo json_encode($datos,JSON_UNESCAPED_UNICODE);
      exit();
    }
    $datos['validacion']="exito";
    $tbody="";
    while ($fila=$resultado->fetch_object()) {
      $tbody.="<tr><td>$fila->idcaptura</td>";
      $tbody.="<td>$fila->fecha</td>";
      $tbody.="<td>$fila->idempleados</td>";
      $tbody.="<td>$fila->nombre</td>";
      $tbody.="<td>$fila->num_parte</td>";
      $tbody.="<td>$fila->rate</td>";
      $tbody.="<td>$fila->cantidad</td>";
      $tbody.="<td>$fila->hora_inicio</td>";
      $tbody.="<td>$fila->hora_final</td>";
      $tbody.="<td>$fila->eficiencia</td>";
      $tbody.="<td>$fila->tiempo_muerto</td>";
      if ($fila->minutos==NULL) {
        $tbody.="<td></td>";
        $tbody.="<td></td></tr>";
      }else{
        $tbody.="<td>$fila->minutos</td>";
        $tbody.="<td>$fila->descripcion</td></tr>";
      }
    }
    $datos['datos']=$tbody;
    echo json_encode($datos,JSON_UNESCAPED_UNICODE);
    $conexion->close();
    $resultado->close();
  }
 ?>
