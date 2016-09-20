<?/*php
function fechaActual()
{
  include '../conexion/conexion.php';
  $fecha=date('Y-m-d');
  $fechaHoy=date('Y-m-d',strtotime($fecha));
  $consulta="SELECT MAX(a.fecha) hoy from asistencia a";
  $resultado=$conexion->query($consulta);
  if (!$resultado) {
    errorConsulta($resultado,$conexion);
  }
  $fila=$resultado->fetch_array();
  if ($fila['hoy']==$fechaHoy) {
    $fechaAyer=date('Y-m-d',strtotime($fecha."-1 day"));
    $fechaManana=date('Y-m-d',strtotime($fecha."+1 day"));
    return $fechas= array('fechaHoy' => $fechaHoy,'fechaAyer'=>$fechaAyer,'fechaManana'=>$fechaManana );
  }
}
print_r(fechaActual());*/
 ?>
 <?php /*
 include '../conexion/conexion.php';
 $fecha=fechaActual();
 $arreglo= array('Validacion'=>'','Datos'=>'' );
 $consulta="SELECT dln.iddetalle_Lista_NumOrden, da.iddetalle_asistencia,e.idempleados, concat_ws(' ',e.nombre,e.apellidos ) as Nombre FROM detalle_Lista_NumOrden dln, detalle_asistencia da,empleados e WHERE dln.idnum_ordenDetLis='50008' AND da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND e.idempleados=da.empleados_idempleados AND da.asistencia_fecha='".$fecha['fechaHoy']."'";
 $resultado=$conexion->query($consulta);
  while ($fila=$resultado->fetch_array()) {
    echo "<br>".$fila['iddetalle_Lista_NumOrden']."<br>";
    echo $fila['iddetalle_asistencia']."<br>";
    echo $fila['idempleados']."<br>";
    echo $fila['Nombre']."<br>";
  }*/
  ?>
  <?php
  /*
  pIdEmpleado:idEmpleado,pSumaMin:sumaMin,pIdDetAsis:idDetAsis,pDatosForm:datosForm
  fechaC=2016-09-19&cantidadC=900&horaInicioC=23%3A00&horaFinalC=00%3A00&tm=no&tmC=0&eficienciaC=0
   */
  parse_str($_POST['datosForm'],$formData);
  $fecha=$formData['fechaC'];
  echo $fecha;
  // echo var_dump($formData)."\n".$fecha;
  ?>
