<?php 
	include '../../conexion/conexion.php';
	if (isset($_POST['mosNumEmpl'])&&isset($_POST['numEmp'])){
		$datos=array();
		$numEmp=$_POST['numEmp'];
		$consulta="SELECT * FROM empleados e WHERE e.estado=1 AND e.idempleados LIKE '%$numEmp%' LIMIT 5";
		$resultado=$conexion->query($consulta);
		if (!$resultado) {
			$datos[]="$conexion->errno".$conexion->error;
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
		while ($fila=$resultado->fetch_object()) {
			$datos[]=$fila->idempleados;
		}
		if ($resultado->num_rows<=0) {
			$datos[]="No se encontraron coencidencias";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	}
 ?>