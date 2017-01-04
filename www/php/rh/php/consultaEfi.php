<?php 
	include '../../conexion/conexion.php';
	if (isset($_POST['fechaIForm'])&&isset($_POST['fechaFForm'])&&isset($_POST['dias'])&&isset($_POST['datosForm'])) {
		$datos = array();
		$datosFecha = array();
		$datosForm = $_POST['datosForm'];
		$datosForm = parse_str($datosForm);
		$fechaIForm = $_POST['fechaIForm'];
		$fechaFForm = $_POST['fechaFForm'];
		$dias = $_POST['dias'];
		$consulta="";
		$thead="";
		$tbody="";
		//Aquí se realizara la tabla de la eficiencia total de los empleados
		if (!isset($inpNuEmp)) {
			$fechaFormat=date_create($fechaIForm);
			//este if solamente nos crea la cabecera de un día
			if ($dias==0) {
				$thead="<tr><th># Empleado</th><th>Nombre</th><th>".date_format($fechaFormat, 'd/m/Y')."</th></tr>";
			}
			//Aquí vamos a construir la cabecera cuando son mas de un día
			else if($dias>0){
				$thead=theadTabla($fechaIForm,$dias);
			}
			//Aquí acabamos con el thead de la tabla
			//vamos a empezar con el tbody de la tabla 
			$consulta="SELECT da.empleados_idempleados AS numEmp, CONCAT_WS(' ', e.nombre,e.apellidos) as nombre FROM detalle_asistencia AS da 
			INNER JOIN empleados e ON e.idempleados=da.empleados_idempleados 
			WHERE da.asistencia_fecha BETWEEN '$fechaIForm' AND '$fechaFForm' 
			GROUP BY da.empleados_idempleados;";
			$resultado=$conexion->query($consulta);
			if (!$resultado) {
				$datos['validacion']="error";
				$datos['datos']=$conexion->errno."(".$conexion->error.")";
				echo json_encode($datos,JSON_UNESCAPED_UNICODE);
				exit();
			}
			//vamos a mostrar un error porque no se encontraron registros.
			if ($resultado->num_rows<=0) {
				$datos['validacion']="error";
				$datos['datos']="No se encontraron registros";
				echo json_encode($datos,JSON_UNESCAPED_UNICODE);
				exit();
			}
			//vamos a contruir la columna #empleado y nombre de la tabla
			while ($fila=$resultado->fetch_object()) {
				$tbody.="<tr><td>$fila->numEmp</td><td>$fila->nombre</td>";
			}
			$datos['validacion']="exito";
			$datos['tc']=$tipoConsul;
			$datos['datos']['thead']=$thead;
			$datos['datos']['tbody']=$tbody;
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
		}
		//Aquí se realizará la consulta de la eficiencia por empleado
		else{
			$fechaFormat=date_create($fechaIForm);
			//este if solamente nos crea la cabecera de un día
			if ($dias==0) {
				$thead="<tr><th># Empleado</th><th>Nombre</th><th>".date_format($fechaFormat, 'd/m/Y')."</th></tr>";
				$tbody="<tr><td>$inpNuEmp</td></tr>";
			}
			//Aquí vamos a construir la cabecera cuando son mas de un día
			else{
				$thead=theadTabla($fechaIForm,$dias);
				$tbody="<tr><td>$inpNuEmp</td></tr>";
			}
			$datos['validacion']="exito";
			$datos['tc']=$tipoConsul;
			$datos['datos']['thead']=$thead;
			$datos['datos']['tbody']=$tbody;
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
		}
	}//fin del if
	function theadTabla($fechaIForm,$dias)
	{
		$fecha=date($fechaIForm);
		$contador=0;
		$thead="<tr><th># Empleado</th><th>Nombre</th>";
		while ($dias>=$contador) {
			$nuevafecha = strtotime ( '+'.$contador.' day' , strtotime($fecha));
			$nuevafecha = date ( 'd/m/Y' , $nuevafecha );
			$thead.="<th>".$nuevafecha."</th>";
			$contador++;
		}
		$thead.="</tr>";
		return $thead;
	}
?>