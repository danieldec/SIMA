<?php
  include '../conexion/conexion.php';
  if(!isset($_SESSION)){
    session_start();
  }
  if ($_SERVER['REQUEST_METHOD']=="POST") {
    if (isset($_POST['pFechAsis'])) {
      $fechaAsis=$_POST['pFechAsis'];
      $comentAsis=$_POST['pComentAsis'];
      $consulta="call insertarFechaAsistencia('$fechaAsis','$comentAsis')";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        echo "Error Num(".$conexion->errno.")".$conexion->error;
        return;
      }
      echo "Exito";
    }
  }
?>
