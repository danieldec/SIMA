<?php
  include '../../conexion/conexion.php';
  setlocale(LC_TIME , 'es_MX.utf8');
  if (isset($_POST['empListA'])&&isset($_POST['Emp'])) {
		$numEmp=$_POST['empListA'];
		$consulta="SELECT * FROM empleados AS e WHERE e.idempleados LIKE '%$numEmp%' AND e.estado='1' LIMIT 6";
		$resultado=$conexion->query($consulta);
		$datos=array();
		if (!$resultado) {
		$datos[]="$conexion->errno".$conexion->error;
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
		exit();
		}
		while ($fila=$resultado->fetch_object()) {
      $datos[]=$fila->idempleados;
    }
    if ($resultado->num_rows<=0) {
      $datos[]="NO EXISTE ESE NÚMERO DE EMPLEADO";
      echo json_encode($datos,JSON_UNESCAPED_UNICODE);
      exit();
    }
    echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	}
 ?>
