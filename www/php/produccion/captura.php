<?php
  include '../conexion/conexion.php';
  if(!isset($_SESSION)){
    session_start();
  }
  if ($_SERVER['REQUEST_METHOD']=="POST") {
    $conexionLista=$conexion;
    $fecha=date($_POST['pFecha']);
    $fechaHoy=date('Y-m-d',strtotime($fecha));
    $fechaAyer=date('Y-m-d',strtotime($fecha."-1 day"));
    $fechaManana=date('Y-m-d',strtotime($fecha."+1 day"));
    $fechas=$arrayName = array('fechaHoy' => $fechaHoy,'fechaAyer'=>$fechaAyer,'fechaManana'=>$fechaManana );
    //echo "dia de hoy = ".$fechaHoy." día de ayer: ".$fechaAyer." día de mañana: ".$fechaManana;
    if (isset($_POST['pFecha'])){
      mostrarListaNumOrden($conexion,$fechas);
    }//fin del if isset($_POST['pFecha'])
    else{
      echo "No entro a if del ".'isset($_POST["pFaecha"]'."";
    }//fin del else de $_SERVER['REQUEST_METHOD']=="POST"
  }//fin del if $_SERVER['REQUEST_METHOD']=="POST"
  else{
    echo "No entro a if de método ".'$_SERVER["REQUEST_METHOD"]==POST'."";
  }
  function mostrarListaNumOrden($conexion,$fechas)
  {
    $consulta="select nm.idnum_orden, nm.num_parte, nm.fecha from num_orden nm, num_parte np WHERE nm.fecha BETWEEN '".$fechas['fechaAyer']."' and '".$fechas['fechaManana']."' and nm.num_parte=np.num_parte ORDER BY nm.fecha_generada DESC";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Error: (".$conexion->errno.").".$conexion->error;
      return;
    }
    echo "<ul class='list-group' id='listaNumOrd'>";
    $contador=0;
    while ($fila=$resultado->fetch_array()) {
      echo "<li class='list-group-item'><span class='spanNumOrd'>".$numOrden=$fila[0]."</span>";
      echo "<ul class='list-group'><li class='lisNumPart list-group-item'><span id='spanNumPart$contador'>".$numParte=$fila[1]."</span>";
      echo "<ul class='list-group'><li class='list-group-item'><ul class='lNumEmpCNumOrd'></ul><input class='form-control' list='inpLisNumParte$contador' name='inpLisNumParte'><datalist id='inpLisNumParte$contador'>".optionNumEmpl($fechas['fechaHoy'],$conexion)."</datalist><input type='button' class='btn-primary form-control inpBtnLisNumEmp' value='Agregar'></li></ul>";
      echo "</ul></li>";
      $contador++;
    }
    echo "</ul>";
  }
  function optionNumEmpl($fecha,$conexion)
  {
    $option="";
    $consulta="select e.idempleados, concat_ws(' ',e.nombre,e.apellidos) as Nombre,da.iddetalle_asistencia  from detalle_asistencia as da, empleados as e where da.asistencia_fecha='$fecha' and e.idempleados=da.empleados_idempleados order by da.iddetalle_asistencia ASC";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      $option="<option value='$conexion->error'>";
      return $option;
    }else{
      while ($fila=$resultado->fetch_array()) {
        $option=$option."<option value='".$fila['idempleados']."'>";
      }
      return $option;
    }
  }
?>
