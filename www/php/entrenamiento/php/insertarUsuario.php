<?php 
	include '../../conexion/conexion.php';
	if (isset($_POST['datosForm'])) {
		$datosFormulario = $_POST['datosForm'];
		$datos = array();
		//aquí separamos los valores para tratarlos poer separado
		parse_str($datosFormulario);
		//en esta parte quitamos los espacios en blanco si el usuario no se percato
		trim($nombreU);
		trim($contrasenaU);
		trim($numEmp);
		trim($perfilU);
		$consulta = "INSERT INTO usuarios (idusuario, nombre_usuario, contrasena, empleados_idempleados, perfil) VALUES ('', '$nombreU', '$contrasenaU', '$numEmp', '$perfilU');";
		$resultado=$conexion->query($consulta);
		if (!$resultado) {
			$datos['validacion'] = "error";
			$datos['datos']=$conexion->errno."(".$conexion->error.")";
			if ($conexion->errno==1452) {
				$datos['datos']="# de empleado no válido porque no exite en la base de datos.";
			}
			if ($conexion->errno==1062) {
				$datos['datos']="El nombre de usuario ".$nombreU." ya se encuentra registrado";
			}
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
		$datos['validacion'] = "exito";
		$datos['datos'] = "Usuario registrado con exito";
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	}
 ?>