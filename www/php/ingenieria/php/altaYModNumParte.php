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
	if (isset($_POST['formDatos'])) {
		$datosForm=$_POST['formDatos'];
		$datos = array();
		$consulta;
		$resultado;
		$numParteOri;
		parse_str($datosForm);
		$numParteEdit=trim($numParteEdit);
		$rateNumParteEdit=trim($rateNumParteEdit);
		$descNumParteEdit=trim($descNumParteEdit);
		/*Aquí con este if vamos a verificar si se cambio el número de parte*/
		if (isset($_POST['numParteEdt'])) {
			$numParteOri = trim($_POST['numParteEdt']);
			if (isset($bajaEdit)) {
				$bajaEdit=trim($bajaEdit);
				$consulta="UPDATE num_parte AS np SET np.num_parte='$numParteEdit', np.descripcion = '$descNumParteEdit', np.rate= '$rateNumParte', np.estado ='$bajaEdit' WHERE np.num_parte = '$numParteOri';";
				$resultado=$conexion->query($consulta);
				errorDB($resultado,$conexion,$datos);
				$datos['validacion']='exito';
				$datos['datos']='Cambios realizados';
			}else{
				$consulta="UPDATE num_parte AS np SET np.num_parte='$numParteEdit', np.descripcion = '$descNumParteEdit', np.rate= '$rateNumParteEdit' WHERE np.num_parte = '$numParteOri';";
				$resultado=$conexion->query($consulta);
				errorDB($resultado,$conexion,$datos);
				$datos['validacion']='exito';
				$datos['datos']='Cambios realizados';
			}//fin del else
		}else{
			if (isset($bajaEdit)) {
				$bajaEdit=trim($bajaEdit);
				$consulta="UPDATE num_parte AS np SET np.descripcion = '$descNumParteEdit', np.rate= '$rateNumParteEdit', np.estado ='$bajaEdit' WHERE np.num_parte = '$numParteEdit';";
				$resultado=$conexion->query($consulta);
				errorDB($resultado,$conexion,$datos);
				$datos['validacion']='exito';
				$datos['datos']='Cambios realizados';
			}else{
				$consulta="UPDATE num_parte AS np SET np.descripcion='$descNumParteEdit', np.rate='$rateNumParteEdit' WHERE np.num_parte = '$numParteEdit';";
				$resultado=$conexion->query($consulta);
				errorDB($resultado,$conexion,$datos);
				$datos['validacion']='exito';
				$datos['datos']='Cambios realizados';
			}
		}//fin del else
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	}//fin del if
	function errorDB($resultado,$conexion,$datos)
	{
		if (!$resultado) {
			if ($conexion->errno==1062) {
				$datos['validacion']='error';
				$datos['datos']="Número de parte ya existe.";
			}else{
				$datos['validacion']='error';
				$datos['datos']=$conexion->errno."(".$conexion->error.")";
			}
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
	}
 ?>