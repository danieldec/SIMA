<?php
  if (!isset($_SESSION)) {
    session_start();
  }
  include '../conexion/conexion.php';

  if ($_SERVER['REQUEST_METHOD']==="POST") {
    if (isset($_POST['pModificar'])) {
      strtoupper($numEmpleado=$_POST['pNumEmpleado']);
      strtoupper($nomEmpleado=$_POST['pNomEmpleado']);
      strtoupper($apeEmpleado=$_POST['pApeEmpleado']);
      strtoupper($numEmpleadoA=$_POST['pnumEmpleadoAux']);
      $consulta="update empleados set idempleados='$numEmpleadoA', nombre='$nomEmpleado', apellidos='$apeEmpleado' where idempleados='$numEmpleado'";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        echo "error: ".mysqli_error($conexion);
      }else{
        echo "exito";
        echo mysqli_error($conexion);
        //echo "exito";
      }
    }else{
      if (isset($_POST['pEliminar'])) {
        $numEmpleado=$_POST['pnumEmpleado'];
        $consulta="delete from empleados where idempleados ='$numEmpleado'";
        $resultado=$conexion->query($consulta);
        if (!$resultado) {
          echo "error:".mysqli_error($conexion);
        }else{
          echo "Eliminado";
        }
      }
    }
  }

 ?>
