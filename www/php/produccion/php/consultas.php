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
    }
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
        }
        $reg++;
      }
    }
    echo json_encode($datos,JSON_UNESCAPED_UNICODE);
  }
 ?>
