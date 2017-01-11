<?php
  session_start();
  include 'conexion/conexion.php';
  if ($_SERVER["REQUEST_METHOD"]==="POST") {
    $usuario=$_POST['nombreUsuario'];
    $contrasena=$_POST['contrasenaUsuario'];
    $sql="SELECT * FROM usuarios WHERE nombre_usuario='$usuario'";
    $resultado=$conexion->query($sql);
    if ($resultado) {
      $fila=$resultado->fetch_array();
      if ($usuario==$fila['nombre_usuario']&&$contrasena==$fila['contrasena']) {
        $_SESSION['logueado']=1;
        $_SESSION['numUsuario']=$fila['nombre_usuario'];
        $_SESSION['idusuario']=$fila['idusuario'];
        $_SESSION['perfil']=$fila['perfil'];
        $perfil=$_SESSION['perfil'];
        switch ($perfil) {
          case 'admin':
              echo $perfil;
              break;
          case 'rh':
              echo $perfil;
              break;
          case 'produccion':
              echo $perfil;
              break;
          case 'materiales':
              echo $perfil;
              break;
          case 'ing':
              echo $perfil;
              break;
          case 'gerencia':
            echo $perfil;
          case 'entrenamiento':
            echo $perfil;
            break;
          default:
            break;
        }
      }
      else {
        echo "contraseña y/o usuario incorrecto";
      }
    }else {
      echo "error (".$conexion->connect_errno.")".mysqli_error($conexion)."".$conexion->connect_error;
    }
    mysqli_free_result($resultado);
    mysqli_close($conexion);
  }


?>
