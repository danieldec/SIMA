<?php 
	include '../../conexion/conexion.php';
	if (isset($_POST['datosNumParte'])) {
		$datosForm = $_POST['datosNumParte'];
		$datos = array();
		parse_str($datosForm);
		$numParte = trim($numParte);
		$rateNumParte = trim($rateNumParte);
		$descNumParte = trim($descNumParte);
		$consulta = "INSERT INTO num_parte (num_parte, rate, descripcion, estado) VALUES ('$numParte', '$rateNumParte', '$descNumParte', DEFAULT)";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			$datos['validacion'] = "error";
			$datos['datos'] = $conexion->errno."(".$conexion->error.")";
			if ($conexion->errno==1062) {
				$datos['datos'] = "Número de parte registrado";
			}
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
		$datos['validacion'] = "exito";
		$datos['datos'] = "número de parte insertado";
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	}
 ?>