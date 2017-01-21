<?php
  include '../../conexion/conexion.php';
  if (isset($_POST['numParte'])) {
    $numParte=$_POST['numParte'];
    $consulta="SELECT np.num_parte FROM num_parte np WHERE np.num_parte LIKE '%$numParte%' AND np.estado = '1' LIMIT 5;";
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
  }//fin del if
  if (isset($_POST['nParteSelect'])&&isset($_POST['np'])) {
    $numParte=$_POST['nParteSelect'];
    $consulta="SELECT np.rate FROM num_parte np WHERE np.num_parte='$numParte' AND np.estado = '1' LIMIT 5;";
    $resultado=$conexion->query($consulta);
    $datos=array();
    if (!$resultado){
      $datos['validacion']="error";
      $datos['datos']="$conexion->errno".$conexion->error;
      echo json_encode($datos,JSON_UNESCAPED_UNICODE);
      exit();
    }
    $datos['validacion']="exito";
    while ($fila=$resultado->fetch_object()) {
      $datos['datos']=$fila->rate;
    }
    echo json_encode($datos,JSON_UNESCAPED_UNICODE);
  }
 ?>
