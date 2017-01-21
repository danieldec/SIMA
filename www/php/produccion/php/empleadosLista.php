<?php
	include '../../conexion/conexion.php';
	setlocale(LC_TIME , 'es_MX.utf8');
	if (isset($_POST['q'])&&isset($_POST['fechaCompletaHoy'])) {
		$fechaCalendario=date('Y-m-d',strtotime($_POST['fechaCompletaHoy']));
		$consulta="SELECT max(a.fecha )AS fecha FROM asistencia a";
		$numEmpleado=$_POST['q'];
		$datos=array();
		$resultado=$conexion->query($consulta);
		if (!$resultado) {
			$datos[]="$conexion->errno".$conexion->error;
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}//fin del if
		$fila=$resultado->fetch_object();
		$fechaDB=$fila->fecha;
		if (strtotime($fechaDB)<strtotime($fechaCalendario)) {
			$dias=(((strtotime($fechaCalendario)-strtotime($fechaDB))/60)/60)/24;
			if ($dias==1) {
				$datos[]="No existe la fecha de asistencia del día: ".strftime('%a %e-%b-%G',strtotime($fechaCalendario));
				$datos[]="por favor de ingresar la fecha de asistencia";
				echo json_encode($datos,JSON_UNESCAPED_UNICODE);
				exit();
			}
			$datos[]="No puedes insertar datos de fechas posteriores a la ".strftime('%a %e-%b-%G',strtotime($fechaDB));
			echo json_encode($datos);
			exit();
		}//fin del if

		if (strtotime($fechaCalendario)===strtotime($fechaDB)||strtotime($fechaCalendario)<=strtotime($fechaDB)) {
			//vamos a buscar en la base de datos si tenemos empleados en la asistencia que vamos a consultar.
			$consulta="SELECT * FROM detalle_asistencia da WHERE da.asistencia_fecha='$fechaCalendario'";
			$resultado=$conexion->query($consulta);
			if (!$resultado) {
			$datos[]="$conexion->errno".$conexion->error;
			echo json_encode($datos);
			exit();
		}//fin del if
			if ($resultado->num_rows<=0) {
				$datos[]="NO HAY OPERADORES ASIGNADOS EN LA LISTA";
				$datos[]="DE ASISTENCIA DEL DÍA: ".strftime('%a %e-%b-%G',strtotime($fechaCalendario));
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}//fin del if
			$consulta="SELECT da.empleados_idempleados as idEmpleados,CONCAT_WS(' ',e.nombre,e.apellidos) as nombre FROM detalle_asistencia da INNER JOIN empleados e ON da.empleados_idempleados=e.idempleados WHERE da.empleados_idempleados LIKE'%$numEmpleado%' AND da.asistencia_fecha='$fechaCalendario' LIMIT 5";
			$resultado=$conexion->query($consulta);
			$datos=array();
			if (!$resultado) {
			$datos[]="$conexion->errno".$conexion->error;
			echo json_encode($datos);
			exit();
		}//fin del if
			while ($fila=$resultado->fetch_object()) {
				$datos[]=$fila->idEmpleados;
			}//fin del while
			if ($resultado->num_rows<=0) {
				$datos[]="NO HAY OPERADORES CON ESE # DE EMPLEADO";
				$datos[]="EN LA LISTA DE ASISTENCIA";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}//fin del if
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
		}//fin del if
		else{
			$datos[]="No existe la fecha de asistencia del día: ".strftime('%a %e-%b-%G',strtotime($fechaCalendario));
			$datos[]="por favor de ingresar la fecha de asistencia";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}//fin del else
	}//fin del if
	else{
		$datos=array();
		$datos[]="No entro al if";
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	}
?>
