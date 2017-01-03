<?php 
	include '../../conexion/conexion.php';
	if (isset($_POST['numEmpleado'])) {
		$datos= array();
		$consulta="SELECT * FROM empleados;";
		$tbody="";
		$resultado=$conexion->query($consulta);
		if (!$resultado) {
			$datos['validacion']="error";
			$datos['datos']=$conexion->errno."(".$conexion->error.")";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
		$datos['validacion']="exito";
		while ($fila=$resultado->fetch_object()) {
			$tbody.="<tr><td class='text-center idEmp' >$fila->idempleados</td>";
			$tbody.="<td class='text-center table-bordered nom'>$fila->nombre</td>";
			$tbody.="<td class='text-center table-bordered ape'>$fila->apellidos</td>";
			$tbody.="<td class='text-center table-bordered est'>$fila->estado</td>";
			$tbody.="<td class='text-center table-bordered'><button class='btn btn-default form-control btnEditEmp'>Editar</button></td></tr>";
		}
		$datos['datos']=$tbody;
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	}
	if (isset($_POST['numEmpleadoEdit']) && isset($_POST['datos'])) {
		$datosPost=$_POST['datos'];
		$datos = array();
		$consulta = "";
		parse_str($datosPost);
		$numEmpEdit = strtoupper(trim($numEmpEdit));
		$nombreEmp = strtoupper(trim($nombreEmp));
		$apellEmpEdit = strtoupper(trim($apellEmpEdit));
		if (isset($editEstado)) {
			if ($editEstado==1) {
				$editEstado=0;
			}else if ($editEstado==0) {
				$editEstado=1;
			}
			if (isset($_POST['numEmpSubmit'])) {
				$numEmpSubmit = $_POST['numEmpSubmit'];
				//$datos['datos']=$numEmpEdit." ".$nombreEmp." ".$apellEmpEdit." ".$editEstado." ".$numEmpSubmit;
				$consulta="UPDATE empleados SET idempleados = '$numEmpEdit', nombre = '$nombreEmp', apellidos = '$apellEmpEdit', estado='$editEstado' WHERE empleados.idempleados = '$numEmpSubmit';";
			}else{
				$consulta="UPDATE empleados SET nombre = '$nombreEmp', apellidos = '$apellEmpEdit', estado='$editEstado' WHERE empleados.idempleados = '$numEmpEdit';";
				//$datos['datos']=$numEmpEdit." ".$nombreEmp." ".$apellEmpEdit." ".$editEstado;
			}
		}//fin del if
		else{
			if (isset($_POST['numEmpSubmit'])) {
				$numEmpSubmit = $_POST['numEmpSubmit'];
				//$datos['datos']=$numEmpEdit." ".$nombreEmp." ".$apellEmpEdit." ".$numEmpSubmit;
				$consulta="UPDATE empleados SET idempleados = '$numEmpEdit', nombre = '$nombreEmp', apellidos = '$apellEmpEdit' WHERE empleados.idempleados = '$numEmpSubmit';";
			}else{
				//$datos['datos']=$numEmpEdit." ".$nombreEmp." ".$apellEmpEdit;
				$consulta="UPDATE empleados SET nombre = '$nombreEmp', apellidos = '$apellEmpEdit' WHERE empleados.idempleados = '$numEmpEdit';";
			}//fin del else
		}//fin del else
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			$datos['datos']=$conexion->errno."(".$conexion->error.")";
			$datos['validacion']="error";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
		$datos['validacion']="exito";
		$datos['datos']="edición exitosa";
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	}//fin del if
 ?>