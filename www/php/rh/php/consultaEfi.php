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
				$tbody= efiEmpTbody($fila->numEmp,$fechaIForm,$fechaFForm,$tbody,$dias,$tipoConsul);
			}
		}
		//Aquí se realizará la consulta de la eficiencia por empleado
		else{
			$fechaFormat=date_create($fechaIForm);
			//este if solamente nos crea la cabecera de un día
			if ($dias==0) {
				$thead="<tr><th># Empleado</th><th>Nombre</th><th>".date_format($fechaFormat, 'd/m/Y')."</th></tr>";
			}
			//Aquí vamos a construir la cabecera cuando son mas de un día
			else{
				$thead=theadTabla($fechaIForm,$dias);
			}
			//vamos a construir el tbody cuando se hace la consulta de un empleado
			//VAMOS A COMPROBAR SI EXISTE EL EMPLEADO
			$consulta="SELECT e.idempleados FROM empleados AS e WHERE e.idempleados='$inpNuEmp';";
			$resultado=$conexion->query($consulta);
			if (!$resultado) {
				$datos['validacion']="error";
				$datos['datos']=$conexion->errno."(".$conexion->error.")";
				echo json_encode($datos,JSON_UNESCAPED_UNICODE);
				exit();
			}
			if ($resultado->num_rows==0) {
				$datos['validacion']="error";
				$datos['errorE']=1;
				$datos['datos']="Número de empleado invalido";
				echo json_encode($datos,JSON_UNESCAPED_UNICODE);
				exit();
			}
			$consulta="SELECT DISTINCT da.empleados_idempleados AS numEmp, CONCAT_WS(' ', e.nombre,e.apellidos) as nombre
			FROM detalle_asistencia AS da 
			INNER JOIN empleados e ON e.idempleados=da.empleados_idempleados 
			WHERE da.asistencia_fecha BETWEEN '$fechaIForm' AND '$fechaFForm' AND da.empleados_idempleados='$inpNuEmp';";
			$resultado=$conexion->query($consulta);
			if (!$resultado) {
				$datos['validacion']="error";
				$datos['datos']=$conexion->errno."(".$conexion->error.")";
				echo json_encode($datos,JSON_UNESCAPED_UNICODE);
				exit();
			}
			//vamos a comprobar si tiene registros en las fechas seleccionadas
			if ($resultado->num_rows==0) {
				$datos['validacion']="error";
				$datos['errorC']=1;
				$datos['datos']="No se tiene registros de eficiencia en las fechas seleccionadas";
				echo json_encode($datos,JSON_UNESCAPED_UNICODE);
				exit();
			}
			while ($fila=$resultado->fetch_object()) {
				$tbody.="<tr><td>$fila->numEmp</td><td>$fila->nombre</td>";
				$tbody= efiEmpTbody($fila->numEmp,$fechaIForm,$fechaFForm,$tbody,$dias,$tipoConsul);
			}
		}
		$datos['validacion']="exito";
		$datos['tc']=$tipoConsul;
		$datos['datos']['thead']=$thead;
		$datos['datos']['tbody']=$tbody;
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
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
	function efiEmpTbody($numEmp,$fechaIForm,$fechaFForm,$tbody,$dias,$tipoConsul)
	{
		include '../../conexion/conexion.php';
		if ($tipoConsul=="t") {
			$fecha=date($fechaIForm);
			$contador=0;
			while ($dias>=$contador) {
				$nuevafecha = strtotime ( '+'.$contador.' day' , strtotime($fecha));
				$nuevafecha = date ( 'Y-m-d' , $nuevafecha );
				$consulta = "SELECT ROUND(AVG(c.eficiencia),2) AS efi, da.empleados_idempleados, c.fecha FROM captura AS c 
				INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
				INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND da.asistencia_fecha = '$nuevafecha' AND da.empleados_idempleados='$numEmp';";
				$resultado=$conexion->query($consulta);
				if (!$resultado) {
					$datos['validacion']="error";
					$datos['datos']=$conexion->errno."(".$conexion->error.")";
					echo json_encode($datos,JSON_UNESCAPED_UNICODE);
					exit();
				}
				$fila = $resultado->fetch_object();
				if ($fila->efi==NULL) {
					$tbody.="<td>0</td>";
				}else{
					$tbody.="<td>$fila->efi</td>";
				}
				$contador++;
			}
			return $tbody;
		}
		else if ($tipoConsul=="e") {
			$fecha=date($fechaIForm);
			$contador=0;
			while ($dias>=$contador) {
				$nuevafecha = strtotime ( '+'.$contador.' day' , strtotime($fecha));
				$nuevafecha = date ( 'Y-m-d' , $nuevafecha );
				$consulta = "SELECT ROUND(AVG(c.eficiencia),2) AS efi, da.empleados_idempleados, c.fecha FROM captura AS c 
				INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
				INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND da.asistencia_fecha = '$nuevafecha' AND da.empleados_idempleados='$numEmp';";
				$resultado=$conexion->query($consulta);
				if (!$resultado) {
					$datos['validacion']="error";
					$datos['datos']=$conexion->errno."(".$conexion->error.")";
					echo json_encode($datos,JSON_UNESCAPED_UNICODE);
					exit();
				}
				$fila = $resultado->fetch_object();
				if ($fila->efi==NULL) {
					$tbody.="<td>0</td>";
				}else{
					$tbody.="<td>$fila->efi</td>";
				}
				$contador++;
			}
			return $tbody;
		}
	}
	/*
	function efiEmpTbody($numEmp,$fechaIForm,$fechaFForm,$tbody,$dias,$tipoConsul)
	{
		include '../../conexion/conexion.php';
		$consulta="SELECT ROUND(AVG(c.eficiencia),1) AS efi, da.empleados_idempleados, c.fecha FROM captura AS c
		INNER JOIN detalle_Lista_NumOrden AS dln ON dln.iddetalle_Lista_NumOrden=c.iddetalle_Lista_NumOrdenCap
		INNER JOIN detalle_asistencia AS da ON da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND da.asistencia_fecha BETWEEN '$fechaIForm' AND '$fechaFForm' AND da.empleados_idempleados='$numEmp'
		GROUP BY da.empleados_idempleados, c.fecha 
		ORDER BY da.empleados_idempleados,c.fecha  ASC";
		$resultado=$conexion->query($consulta);
		if (!$resultado) {
			$datos['validacion']="error";
			$datos['datos']=$conexion->errno."(".$conexion->error.")";
			echo json_encode($datos,JSON_UNESCAPED_UNICODE);
			exit();
		}
		if ($tipoConsul=="t") {
			$fecha=date($fechaIForm);
			$contador=0;
			if ($resultado->num_rows==0){
				while ($dias>=$contador) {
					$tbody.="<td>0</td>";
					$contador++;
				}
			}else{
				while ($dias>=$contador) {
					$nuevafecha = strtotime ( '+'.$contador.' day' , strtotime($fecha));
					$nuevafecha = date ( 'Y-m-d' , $nuevafecha );
					$tbody.="<td>$nuevafecha</td>";
					$contador++;
				}
			}
			return $tbody;
		}
		else if ($tipoConsul=="e") {

		}
	}*/
?>