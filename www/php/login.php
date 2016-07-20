<?php
  session_start();
  include 'conexion/conexion.php';
  if ($_SERVER["REQUEST_METHOD"]==="POST") {
    $usuario=$_POST['nombreUsuario'];
    $contrasena=$_POST['contrasenaUsuario'];
    $sql="select nombre_usuario, contrasena, perfil from usuarios where nombre_usuario='$usuario'";
    $resultado=$conexion->query($sql);
    if ($resultado) {
      $fila=$resultado->fetch_array();
      if ($usuario==$fila['nombre_usuario']&&$contrasena==$fila['contrasena']) {
        $perfil=$fila['perfil'];
        switch ($perfil) {
          case 'admin':
              echo $perfil;
            break;

          default:
            # code...
            break;
        }
      }
      else {
        echo "contraseña y/o usuario incorrecto";
      }
    }else {
      echo "error (".$conexion->connect_errno.")".mysqli_error($conexion)."".$conexion->connect_error;
    }
  }


?>
