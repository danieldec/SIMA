<?php
  include '../../conexion/conexion.php';
  if (isset($_POST['fechaCI'])&&isset($_POST['fechaCF'])) {
    $fechaI=$_POST['fechaCI'];
    $fechaF=$_POST['fechaCF'];
    $datos = array();
    $consulta="SELECT nm.idnum_orden, nm.num_parte, nm.fecha, nm.STATUS FROM num_orden AS nm WHERE nm.fecha BETWEEN '$fechaI' AND '$fechaF' AND nm.STATUS='PRODUCCION' ORDER BY nm.fecha DESC";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      $datos['validacion']="error";
      $datos['datos']=$conexion->error."($conexion->errno)";
      echo json_encode($datos,JSON_UNESCAPED_UNICODE);
      exit();
    }
    $datos['validacion']="exito";
    $tbody='';
    $contador=1;
    while ($fila=$resultado->fetch_object()) {
      $tbody=$tbody.'<tr><td>'.$contador.'</td>';
      $tbody=$tbody.'<td class="tdFecha">'.$fila->fecha.'</td>';
      $tbody=$tbody.'<td class="tdCapNumOrd">'.$fila->idnum_orden.'</td>';
      $tbody=$tbody.'<td class="tdCapNumPart">'.$fila->num_parte.'</td>';
      $tbody=$tbody.'<td>'.$fila->STATUS.'</td>';
      $tbody=$tbody.'<td>'.'<button class="btn btn-default capturaEmpleados form-control"><span class="glyphicon glyphicon-camera" aria-hidden="true">Captura</button>'.'</td>';
      $tbody=$tbody.'<td>'.'<button class="btn btn-default detalleNumOrden form-control"><span class="glyphicon glyphicon-list-alt" aria-hidden="true">Detalle</button>'.'</td></tr>';
      $contador++;
    }
    $datos['datos']=$tbody;
    echo json_encode($datos,JSON_UNESCAPED_UNICODE);
  }
 ?>
