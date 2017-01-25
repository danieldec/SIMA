<?php
  include '../conexion/conexion.php';
  if (isset($_POST['numParte'])&&isset($_POST['numOrden'])) {
    $numOrden = $_POST['numOrden'];
    $numParte = $_POST['numParte'];
    $datos = array();
    $consulta = "DELETE FROM num_orden WHERE num_orden.idnum_orden = '$numOrden' AND num_orden.num_parte= '$numParte';";
    $resultado = $conexion->query($consulta);
    if (!$resultado) {
      $datos['validacion'] = "error";
      $datos['datos'] = $conexion->errno."($conexion->error)";
      echo json_encode($datos,JSON_UNESCAPED_UNICODE);
      exit();
    }
    $datos['validacion']="exito";
    $datos['datos']="Número de orden o folio eliminada";
    echo json_encode($datos,JSON_UNESCAPED_UNICODE);
  }
 ?>
