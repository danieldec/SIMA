<?php
	include '../../conexion/conexion.php';
	if (isset($_POST['numParteTa'])) {
		$consulta="SELECT * FROM num_parte np ORDER BY np.estado DESC";
		$resultado=$conexion->query($consulta);
		$datos = array();
		if (!$resultado) {
			$datos['validacion']="error";
			$datos['datos']=$conexion->errno."(".$conexion->error.")";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
		$contador=1;
		$tbody="";
		while ($fila=$resultado->fetch_object()) {
			$tbody=$tbody."<tr><td class='c'>$contador</td>";
			$tbody=$tbody."<td class='numParte'>$fila->num_parte</td>";
			$tbody=$tbody."<td class='rate'>$fila->rate</td>";
			$tbody=$tbody."<td class='desc'>$fila->descripcion</td>";
			$tbody=$tbody."<td class='est'>$fila->estado</td>";
			$tbody=$tbody."<td class='btnEdit'><input class='btn btn-default' value='Editar'/></td></tr>";
			$contador++;
		}
		$datos['validacion']="exito";
		$datos['datos']=$tbody;
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	 }
 ?>
