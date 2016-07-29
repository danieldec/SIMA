<?php
  include '../conexion/conexion.php';
  if(!isset($_SESSION)){
    session_start();
  }

  if ($_SERVER['REQUEST_METHOD']=="POST") {
    if (isset($_POST['pVNumOrden'])) {
      echo "exito por el momento";
    }
  }
  if (isset($_POST['pPalabraC'])) {
    $busqueda=$_POST['pPalabraC'];
    $consulta="select num_parte from num_parte where num_parte like '%$busqueda%'order by num_parte limit 5";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Error:".mysqli_error($conexion);
    }else{
      while ($fila=$resultado->fetch_array()) {
        $numParte=str_replace($_POST['pPalabraC'],"<b>".$_POST['pPalabraC']."</b>",$fila['num_parte']);
        echo '<li onclick="set_item(\''.str_replace("'", "\'", $fila['num_parte']).'\')">'.$numParte.'</li>';
      }
    }
  }
 ?>
