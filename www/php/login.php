<?php
  session_start();
  include 'conexion/conexion.php';
  if ($_SERVER["REQUEST_METHOD"]==="POST") {
    $usuario=$_POST['nombreUsuario'];
    $contrasena=$_POST['contrasenaUsuario'];
    $sql="select nombre_usuario, contrasena,perfil from usuarios where '$usuario'=nombre_usuario";
    $resultado=$conexion->query($sql);
    if ($resultado) {
      echo "exito";
      
    }else {
      echo "error (".$conexion->connect_errno.")".mysqli_error($conexion)."".$conexion->connect_error;
    }
  }


?>
