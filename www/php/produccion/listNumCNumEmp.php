<?php
  echo $_SERVER['HTTP_USER_AGENT'];
  include '../conexion/conexion.php';
  /* otra forma de vincular el resultado de la consulta con una variable cuando se conoce el número de tablas*/
  $consulta="select MAX(asistencia.fecha) as fecha from asistencia";
  $resultado=$conexion->query($consulta);
  if (!$resultado) {
    echo "Falló en la consulta: (".$conexion->errno.")".$conexion->error;
    exit();
  }
  $fila=$resultado->fetch_array();
  $diaDb=date($fila['fecha']);
  $diaServidor=date('Y-m-d');
  $fechaHoy=date('Y-m-d',strtotime($diaDb));
  $fechaAyer=date('Y-m-d',strtotime($diaDb."-1 day"));
  $fechaManana=date('Y-m-d',strtotime($diaDb."+1 day"));
  if ($diaDb==$diaServidor) {
    $consulta="SELECT num_orden.idnum_orden,num_orden.cantidad,num_orden.cantidad_realizada from num_orden WHERE num_orden.fecha BETWEEN '$fechaAyer' and '$fechaManana' and num_orden.cantidad_realizada<=num_orden.cantidad ORDER BY num_orden.fecha_generada DESC";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Falló en la consulta: (".$conexion->errno.")".$conexion->error;
      exit();
    }else{
      echo "<ul class='list-group' id='listaNumOrd'>";
      $contador=0;
      while ($fila=$resultado->fetch_array()) {
        echo "<li class='list-group-item'><span class='spanNumOrd'>".$numOrden=$fila[0]."</span>";
        echo "<ul class='list-group'><li class='lisNumPart list-group-item'><span id='spanNumPart$contador'>".$numParte=$fila[1]."</span>";
        echo "<ul class='list-group'><li class='list-group-item'><ul class='lNumEmpCNumOrd'></ul><input placeholder='# de empleado' class='form-control inpCLNE' list='inpLisNumParte$contador' name='inpLisNumParte'><datalist id='inpLisNumParte$contador'>".optionNumEmpl($fechas['fechaHoy'],$conexion)."</datalist><input type='button' class='btn-primary form-control inpBtnLisNumEmp' value='Agregar' data-toggle='popover'></li></ul>";
        echo "</ul></li>";
        $contador++;
      }
      echo "</ul>";
    }
  }else {
    echo "Fechas no coinciden verificar fechar por favor";
    exit();
  }

 ?>
 <?php
 /*una forma de hacer una consulta asociando una variable a cada campo de la consulta
 if (!$resultado=$conexion->prepare($consulta)) {
 echo "Falló la preparación(" . $conexion->errno . ") " . $conexion->error;
}
if (!$resultado->execute()) {
echo "Falló la ejecución: (" . $conexion->errno . ") " . $conexion->error;
}
$fecha=NULL;
if (!$resultado->bind_result($fecha)) {
echo "Falló la vinculación de los parámetros de salida: (" . $resultado->errno . ") " . $resultado->error;
}
while ($resultado->fetch()) {
// printf("fecha = %s (%s),", $fecha, gettype($fecha));
}
if (!($fecha==$dia)) {
echo "Error no coinciden las fechas";
exit();
}*/
  ?>
