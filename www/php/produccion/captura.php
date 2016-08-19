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
    while ($fila=$resultado->fetch_array()) {
      echo "<ul class='list-group' id='listaNumOrd'>";
      echo "<li><span id='spanNumOrd'>".$numOrden=$fila[0]."</span>";
      echo "<ul class='list-group'><li class='list-group-item lisNumPart' id=''>".$numParte=$fila[1]."</li></ul></ul>";
    }
  }
?>
