<?php
	include_once '../../conexion/conexion.php';
	$fechaHoy=date('Y-m-d');
	if (isset($_POST['numOrden'])&&isset($_POST['idEmpleado'])&&isset($_POST['fechaCompletaHoy']))
	{
		$fechaCompletaHoy=$_POST['fechaCompletaHoy'];
		$idEmpleado=$_POST['idEmpleado'];
		$numOrden=$_POST['numOrden'];
		$datos= array();
		/*if (strtotime($fechaHoy)===strtotime($_POST['fechaCompletaHoy'])) {
			$datos['validacion']="exito";
		}else{
			$datos['validacion']="error";
			$datos['datos']="fechas no coinciden fecha maquina ".$fechaCompletaHoy." fecha servidor: ".$fechaHoy;
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}*/
		$consulta="SELECT da.iddetalle_asistencia FROM detalle_asistencia da WHERE da.empleados_idempleados IN (SELECT e.idempleados FROM empleados e WHERE e.idempleados='$idEmpleado') AND da.asistencia_fecha='$fechaCompletaHoy'";
		$resultado=$conexion->query($consulta);
		if (!$resultado) {
			$datos['validacion']='error';
			$datos['datos']=$conexion->errno."($conexion->error)";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
		if ($resultado->num_rows<=0) {
			$datos['validacion']='error';
			$datos['datos']="No existe empleado en la asistencia del dia ".$fechaCompletaHoy;
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}else{
			$fila=$resultado->fetch_object();
			$idDetLista=$fila->iddetalle_asistencia;
			$consulta="INSERT INTO detalle_Lista_NumOrden (iddetalle_Lista_NumOrden,idnum_ordenDetLis,iddetalle_asistenciaDetList) VALUES (null,'$numOrden','$idDetLista')";
			$resultado=$conexion->query($consulta);
			if (!$resultado) {
				$datos['validacion']='error';
				if ($conexion->errno==1062) {
				$datos['datos']="el número de empleado ".$idEmpleado."\n ya existe en este folio ".$numOrden;
				}else{
				$datos['datos']=$conexion->errno."($conexion->error)";
				}
				echo json_encode($datos,JSON_UNESCAPED_UNICODE);
				exit();
			}
			$datos['validacion']='exito';
			$datos['datos']='Agregado con exito';
			$conexion->close();
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
		}
	}
 ?>
