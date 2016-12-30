<?php 
	include '../../conexion/conexion.php';
	if (isset($_POST['hICI'])&&isset($_POST['hICF'])&&isset($_POST['detAsisEmpl'])) {
		$datos = array();
		$detAsisEmpl= $_POST['detAsisEmpl'];
		$hICI=$_POST['hICI'];
		$hICF = $_POST['hICF'];
		/*$datos[]=$detAsisEmpl." ".$hICI." ".$hICF;
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
		exit();*/
		$consulta="	SELECT c.idcaptura,c.fecha as fe ,e.idempleados AS emp, CONCAT_WS(' ',e.nombre,e.apellidos) AS nombre, nm.idnum_orden AS folio, np.num_parte AS NP, np.rate AS rate, c.hora_inicio,c.hora_final,c.eficiencia  AS efi, c.cantidad AS cant, c.tiempo_muerto AS tm , c.usuarios_idusuario AS usu, CONCAT_WS(' ',eu.nombre,eu.apellidos) AS nombreUsu FROM captura as c 
			INNER JOIN
			detalle_Lista_NumOrden dln ON dln.iddetalle_Lista_NumOrden= c.iddetalle_Lista_NumOrdenCap
			INNER JOIN 
			num_orden nm ON nm.idnum_orden =dln.idnum_ordenDetLis
			INNER JOIN 
			num_parte np ON np.num_parte=nm.num_parte
			INNER JOIN 
			detalle_asistencia AS da ON da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList
			INNER JOIN
			empleados AS e ON e.idempleados=da.empleados_idempleados
			INNER JOIN 
			usuarios AS u ON u.idusuario=c.usuarios_idusuario
			INNER JOIN 
			empleados eu ON eu.idempleados=u.empleados_idempleados
			WHERE c.iddetalle_Lista_NumOrdenCap IN (SELECT dln.iddetalle_Lista_NumOrden FROM detalle_Lista_NumOrden as dln WHERE dln.iddetalle_asistenciaDetList IN (SELECT da.iddetalle_asistencia FROM detalle_asistencia AS da WHERE da.iddetalle_asistencia='$detAsisEmpl')) AND c.hora_inicio BETWEEN '$hICI' AND '$hICF'";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			$datos['validacion']="error";
			$datos['datos']=$conexion->errno."(".$conexion->error.")";
			json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
		$datos['validacion']="exito";
		$tbody="";

		while ($fila=$resultado->fetch_object()) {
			$tbody.="<tr><td>$fila->idcaptura</td>";
			$tbody.="<td>$fila->fe</td>";
			$tbody.="<td>$fila->emp</td>";
			$tbody.="<td>$fila->nombre</td>";
			$tbody.="<td>$fila->folio</td>";
			$tbody.="<td>$fila->NP</td>";
			$tbody.="<td>$fila->rate</td>";
			$tbody.="<td>$fila->hora_inicio</td>";
			$tbody.="<td>$fila->hora_final</td>";
			$tbody.="<td>$fila->efi</td>";
			$tbody.="<td>$fila->cant</td>";
			$tbody.="<td>$fila->tm</td>";
			$tbody.="<td>$fila->usu</td>";
			$tbody.="<td>$fila->nombreUsu</td></tr>";
		}
		$datos['datos']=$tbody;
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	}
 ?>