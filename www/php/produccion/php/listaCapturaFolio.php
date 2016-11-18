<?php
	include_once '../../conexion/conexion.php';
	if (isset($_POST['numOrden'])&&isset($_POST['fechaCompletaHoy'])) {
		$datos = array();
		$numOrden=$_POST['numOrden'];
		$fechaCalendario=$_POST['fechaCompletaHoy'];
		$consulta="SELECT * FROM  detalle_asistencia da
		INNER JOIN detalle_Lista_NumOrden dln ON da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND dln.idnum_ordenDetLis='$numOrden'
		INNER JOIN empleados e ON da.empleados_idempleados=e.idempleados
		WHERE da.iddetalle_asistencia IN (SELECT dln.iddetalle_asistenciaDetList FROM detalle_Lista_NumOrden dln WHERE dln.idnum_ordenDetLis ='$numOrden') AND da.asistencia_fecha='$fechaCalendario';";
		$resultado=$conexion->query($consulta);
		if (!$resultado) {
			$datos['validacion']="Error";
			$datos['datos']=$conexion->errno."(".$conexion->error.")";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
		}
		if ($resultado->num_rows==0) {
			$datos['validacion']="Error";
			$datos['datos']="No existe operadores asigados a este folio ".$numOrden;
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
		$datos['validacion']="Exito";
		$datos['datos']="";
		$tbody="";

		while ($fila=$resultado->fetch_object()) {
			$tbody.="<tr>";
		$tbody.='</tr>';
		}
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	}






 ?>
