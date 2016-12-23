<?php 
	if (isset($_POST['prueba'])) {
		$datos = array();
		$consulta;
		$amor = $_POST['prueba'];
		$resultado;
		$datos[] = $amor;
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	}
 ?>