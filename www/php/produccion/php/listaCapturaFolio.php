<?php
	include_once '../../conexion/conexion.php';
	if (isset($_POST['numOrden'])&&isset($_POST['fechaCompletaHoy'])) {
		$datos = array();
		$numOrden=$_POST['numOrden'];
		$fechaCalendario=$_POST['fechaCompletaHoy'];
		$consulta="SELECT e.idempleados,dln.iddetalle_Lista_NumOrden, da.iddetalle_asistencia, CONCAT_WS(' ',e.nombre,e.apellidos)as nombre FROM  detalle_asistencia da
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
			$tbody.='<td class="idEmpCap">'.$fila->idempleados.'</td>';
			$tbody.='<td class="idDetLisNumOrdCap" hidden="hidden">'.$fila->iddetalle_Lista_NumOrden.'</td>';
			$tbody.='<td class="idDetAsisCap" hidden="hidden">'.$fila->iddetalle_asistencia.'</td>';
			$tbody.='<td class="nombre">'.$fila->nombre.'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='<td>'."0".'</td>';
			$tbody.='</tr>';
		}
		$datos['datos']=$tbody;
		//hacemos otra consulta a la base de datos para extraer el rate del número de parte
		$consulta="SELECT np.rate, np.num_parte FROM num_parte as np INNER JOIN num_orden as nm ON nm.num_parte=np.num_parte AND nm.idnum_orden='$numOrden'";
		$resultado=$conexion->query($consulta);
		if (!$resultado) {
			$datos['validacion']="Error";
			$datos['datos']=$conexion->errno."(".$conexion->error.")";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
		}
		if ($resultado->num_rows==0) {
			$datos['validacion']="Error";
			$datos['datos']="Error inesperado";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
		$datos['validacion']="Exito";
		$fila=$resultado->fetch_object();
		$datos['numParte']=$fila->num_parte;
		$datos['rate']=$fila->rate;

		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
		$conexion->close();
		$resultado->close();
		/*
		e.idempleados,dln.iddetalle_Lista_NumOrden, da.iddetalle_asistencia,CONCAT_WS(' ',e.nombre,e.apellidos)as nombre
		<th># Empleado</th>
		<th hidden="hidden">idDetLista</th>
		<th hidden="hidden">idDetAsis</th>
		<th>Nombre</th>
		<th>TM</th>
		<th>HR</th>
		<th>7-8</th>
		<th>8-9</th>
		<th>9-10</th>
		<th>10-11</th>
		<th>12-13</th>
		<th>13-14</th>
		<th>14-15</th>
		<th>15-16</th>
		<th>16-17</th>
		<th>18-19</th>*/
	}






 ?>
