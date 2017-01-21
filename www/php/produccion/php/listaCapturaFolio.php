<?php
	include_once '../../conexion/conexion.php';
	if (isset($_POST['numOrden'])&&isset($_POST['fechaCompletaHoy'])&&isset($_POST['numParte'])) {
		$datos = array();
		$numOrden=$_POST['numOrden'];
		$numParte=$_POST['numParte'];
		$fechaCalendario=$_POST['fechaCompletaHoy'];
		$consulta="SELECT e.idempleados,dln.iddetalle_Lista_NumOrden, da.iddetalle_asistencia, CONCAT_WS(' ',e.nombre,e.apellidos)as nombre FROM  detalle_asistencia da
		INNER JOIN detalle_Lista_NumOrden dln ON da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND dln.idnum_ordenDetLis='$numOrden'
		INNER JOIN empleados e ON da.empleados_idempleados=e.idempleados
		WHERE da.iddetalle_asistencia IN (SELECT dln.iddetalle_asistenciaDetList FROM detalle_Lista_NumOrden dln WHERE dln.idnum_ordenDetLis ='$numOrden') AND da.asistencia_fecha='$fechaCalendario' ORDER BY dln.iddetalle_Lista_NumOrden ASC;";
		$resultado=$conexion->query($consulta);
		if (!$resultado) {
			$datos['validacion']="Error";
			$datos['datos']=$conexion->errno."(".$conexion->error.")";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
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
			for ($i=0; $i <2 ; $i++) {
				if ($i==0) {
					$tbody.='<td class="tmCapTab">'.funTMHrTrab($i,$fila->iddetalle_asistencia,$fechaCalendario).'</td>';
				}elseif ($i==1) {
					$tbody.='<td class="hrCapTab">'.funTMHrTrab($i,$fila->iddetalle_asistencia,$fechaCalendario).'</td>';
				}
			}
			for ($i=0; $i < 12; $i++) {
				$tbody.='<td>'.calcEfiHora($i,$fila->iddetalle_asistencia,$fechaCalendario).'</td>';
			}
			$tbody.='</tr>';
		}
		$datos['datos']=$tbody;
		//hacemos otra consulta a la base de datos para extraer el rate del número de parte
		$consulta="SELECT np.rate, np.num_parte FROM num_parte as np INNER JOIN num_orden as nm ON nm.num_parte=np.num_parte AND nm.idnum_orden='$numOrden' AND nm.num_parte='$numParte'";
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
	}
	function calcEfiHora($hora,$detAsis,$fecha)
	{
		include '../../conexion/conexion.php';
		switch ($hora) {
			case 0:
				$hora=7;
				break;
			case 1:
				$hora=8;
				break;
			case 2:
				$hora=9;
				break;
			case 3:
				$hora=10;
				break;
			case 4:
				$hora=11;
				break;
			case 5:
				$hora=12;
				break;
			case 6:
				$hora=13;
				break;
			case 7:
				$hora=14;
				break;
			case 8:
				$hora=15;
				break;
			case 9:
				$hora=16;
				break;
			case 10:
				$hora=17;
				break;
			case 11:
				$hora=18;
				break;
			default:
				break;
		}
		$horaInicio=":00:00";
		$horaFinal=":59:00";
		if ($hora<10) {
			$hora="0".$hora;
			$horaInicio=$hora.$horaInicio;
			$horaFinal=$hora.$horaFinal;
		}else{
			$horaInicio=$hora.$horaInicio;
			$horaFinal=$hora.$horaFinal;
		}
		$consulta="SELECT AVG(c.eficiencia) as efi, COUNT(c.eficiencia) as contador FROM captura as c
		INNER JOIN detalle_Lista_NumOrden dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
		INNER JOIN detalle_asistencia da ON da.iddetalle_asistencia='$detAsis' AND da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList
		WHERE c.fecha='$fecha' AND (c.hora_inicio BETWEEN '$horaInicio' AND '$horaFinal') ORDER BY c.hora_inicio ASC";
		$resultado=$conexion->query($consulta);
		if (!$resultado) {
			return $conexion->errno."(".$conexion->error.")";
			exit();
		}
		$fila=$resultado->fetch_object();
		return round($fila->efi,2);
	}
	function funTMHrTrab($i,$detAsis,$fecha)
	{
		include '../../conexion/conexion.php';
		switch ($i) {
			case 0:
				$consulta="SELECT ROUND(SUM(dtm.minutos)/60,2) as tmMin FROM detalleTiempoM as dtm
				INNER JOIN captura as c ON c.idcaptura = dtm.idcaptura AND c.fecha='$fecha'
				INNER JOIN detalle_Lista_NumOrden as dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
				INNER JOIN detalle_asistencia as da ON da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND da.iddetalle_asistencia='$detAsis'";
				$resultado=$conexion->query($consulta);
				if (!$resultado) {
					return $conexion->errno."(".$conexion->error.")";
					exit();
				}
				$fila=$resultado->fetch_object();
				if ($fila->tmMin==NULL) {
					return 0;
				}
				return $fila->tmMin;
				break;
			case 1:
				$consulta="SELECT ROUND( SUM(((TIME_TO_SEC(SUBTIME(c.hora_final,c.hora_inicio)))/60)/60),2 ) as tTT,COUNT(c.idcaptura) as contador FROM captura as c INNER JOIN detalle_Lista_NumOrden dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap INNER JOIN detalle_asistencia da ON da.iddetalle_asistencia='$detAsis' AND da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList WHERE c.fecha='$fecha' ORDER BY c.hora_inicio ASC";
				$resultado=$conexion->query($consulta);
				if (!$resultado) {
					return $conexion->errno."(".$conexion->error.")";
				}
				$fila=$resultado->fetch_object();
				if ($fila->tTT==NULL) {
					return 0;
				}elseif ($fila->tTT>=0) {
					return $fila->tTT;
				}
				break;
			default:
				break;
		}
	}
 ?>
	<?php
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
	 ?>
