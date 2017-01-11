<?php
  include_once '../../conexion/conexion.php';
  if (isset($_POST['fechaIForm'])&&isset($_POST['fechaFForm'])&&isset($_POST['dias'])&&isset($_POST['repEnt'])) {
  	$fechaIForm = $_POST['fechaIForm'];
	$fechaFForm = $_POST['fechaFForm'];
	$dias = $_POST['dias'];
	$repEnt = $_POST['repEnt'];
  	$datos = array();
  	$consulta="SELECT c.fecha, nm.num_parte,e.idempleados,CONCAT_WS(' ',e.nombre,e.apellidos) AS nombre,ROUND(SUM(((TIME_TO_SEC(SUBTIME(c.hora_final,c.hora_inicio)))/60)/60) - SUM(c.tiempo_muerto/60),2) as tT
	FROM captura AS  c
	INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_Lista_NumOrden = c.iddetalle_Lista_NumOrdenCap
	INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia = dln.iddetalle_asistenciaDetList
	INNER JOIN num_orden AS nm ON nm.idnum_orden = dln.idnum_ordenDetLis
	INNER JOIN num_parte AS np ON np.num_parte=nm.num_parte
	INNER JOIN empleados as e ON e.idempleados = da.empleados_idempleados
	WHERE c.fecha BETWEEN '$fechaIForm' AND '$fechaFForm'
	GROUP BY nm.num_parte,e.idempleados,c.fecha
	ORDER BY c.fecha ASC,np.num_parte ASC,e.nombre ASC;";
	$resultado=$conexion->query($consulta);
	if (!$resultado) {
		$datos['validacion']="error";
		$datos['datos']=$conexion->errno."(".$conexion->error.")";
	  	echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	  	exit();
	}
	$datos['validacion']="exito";
	$tbody="";
	while ($fila=$resultado->fetch_object()) {
		$tbody.="<tr><td>$fila->idempleados</td>";
		$tbody.="<td>$fila->nombre</td>";
		$tbody.="<td class='text-center'>$fila->fecha</td>";
		$tbody.="<td class='text-center'>$fila->tT</td>";
		$tbody.="<td class='text-center'>$fila->num_parte</td></tr>";
	}
	$datos['datos']=$tbody;
  	echo json_encode($datos,JSON_UNESCAPED_UNICODE);

  }
 ?>
