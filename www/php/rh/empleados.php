<?php
  if (!isset($_SESSION)) {
    session_start();
  }
  include_once '../conexion/conexion.php';
  // Initialize pagenum and pagesize
	$pagenum = $_POST['pagenum'];
	$pagesize = $_POST['pagesize'];
	$start = $pagenum * $pagesize;
  $consulta="SELECT SQL_CALC_FOUND_ROWS * FROM empleados LIMIT $start, $pagesize";
  // get data and store in a json array
  if (isset($_POST['sortdatafield']))
  {
    $sortfield = $_POST['sortdatafield'];
    $sortorder = $_POST['sortorder'];
    if ($sortorder != '')
  		{
  			if ($sortorder == "desc")
  			{
  				$consulta = "SELECT idempleados,nombre,apellidos,estado FROM empleados ORDER BY" . " " . $sortfield . " DESC LIMIT ?, ?";
  			}
  			else if ($sortorder == "asc")
  			{
  				$consulta = "SELECT idempleados,nombre,apellidos,estado FROM empleados ORDER BY" . " " . $sortfield . " ASC LIMIT ?, ?";
  			}
  			$resultado = $conexion->prepare($consulta);
  			$resultado->bind_param('ii', $start, $pagesize);
  		}
  		else
  		{
  			$resultado = $conexion->prepare("SELECT SQL_CALC_FOUND_ROWS idempleados,nombre,apellidos,estado FROM empleados LIMIT ?, ?");
  			$resultado->bind_param('ii', $start, $pagesize);
  		}
  	}
  	else
  	{
  		$resultado = $conexion->prepare("SELECT SQL_CALC_FOUND_ROWS idempleados,nombre,apellidos,estado FROM empleados LIMIT ?, ?");
  		$resultado->bind_param('ii', $start, $pagesize);
  	}
    /* execute query */
    $resultado->execute();
  	/* bind result variables */
  	$resultado->bind_result($idempleados, $nombre,$apellidos,$estado);
  	/* fetch values */
    $contador=1;
    while ($resultado->fetch()) {
      $empleados[]=array(
        'idempleados'=>$idempleados,
        'nombre'=>$nombre,
        'apellidos'=>$apellidos,
        'estado'=>$estado
      );
      $contador++;
    }

  	// get the total rows.
  	$resultado = $conexion->prepare("SELECT FOUND_ROWS()");
  	$resultado->execute();
  	$resultado->bind_result($total_rows);
  	$resultado->fetch();
  	$data[] = array(
      'TotalRows' => $total_rows,
      'Rows' => $empleados
  	);
  	echo json_encode($data,JSON_UNESCAPED_UNICODE);


  $resultado->close();
  $conexion->close();
 ?>
