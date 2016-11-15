<?php
	include '../../conexion/conexion.php';
	setlocale(LC_TIME , 'es_MX.utf8');
	if (isset($_POST['q'])) {
		$fechaHoy=date('Y-m-d');
		$consulta="SELECT MAX(a.fecha) AS fecha FROM asistencia a";
		$numEmpleado=$_POST['q'];
		$datos[]=array();
		$resultado=$conexion->query($consulta);
		if (!$resultado) {
			$datos[]="$conexion->errno".$conexion->error;
			echo json_encode($datos);
			exit();
		}
		$fila=$resultado->fetch_object();
		$fechaDB=$fila->fecha;
		if (strtotime($fechaHoy)===strtotime($fechaDB)) {
			$consulta="SELECT da.empleados_idempleados as idEmpleados,CONCAT_WS(' ',e.nombre,e.apellidos) as nombre FROM detalle_asistencia da INNER JOIN empleados e ON da.empleados_idempleados=e.idempleados WHERE da.empleados_idempleados LIKE'%$numEmpleado%' AND da.asistencia_fecha='$fechaDB' LIMIT 5";
			$resultado=$conexion->query($consulta);
			$datos=array();
			if (!$resultado) {
			$datos[]="$conexion->errno".$conexion->error;
			echo json_encode($datos);
			exit();
			}
			while ($fila=$resultado->fetch_object()) {
				$datos[]=$fila->idEmpleados;
			}
			if ($resultado->num_rows<=0) {
				$datos[]="NO HAY OPERADORES CON ESE # DE EMPLEADO";
				$datos[]="EN LA LISTA DE ASISTENCIA";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
			}
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
		}else{
			$datos[]="No existe la fecha de asistencia del día: ".strftime('%a %e-%b-%G',strtotime($fechaHoy));
			$datos[]="por favor de ingresar la fecha de asistencia";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
	}
?>