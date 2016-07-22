<?php
  if (!isset($_SESSION)) {
    session_start();
  }
  include '../conexion/conexion.php';
  //Altas a nuevos empleados
  if ($_SERVER["REQUEST_METHOD"]==="POST"&&isset($_POST['pnumEmpleado'])) {
    $numEmpleado=trim($_POST['pnumEmpleado']);
    $nombreEmpleado=trim($_POST['pnombreEmpleado']);
    $apellidoEmpleado=trim($_POST['papeEmpleado']);
    //esta consulta nos permite saber si hay un empleado registrado con el nombre y apellido igual
    $nombreCompleto=$nombreEmpleado." ".$apellidoEmpleado;
    $consulta="select concat_ws(' ',nombre,apellidos) as Nombre_Completo from empleados where concat_ws(' ',nombre,apellidos) = '$nombreCompleto'";
    $resultado=$conexion->query($consulta);
    $fila=$resultado->fetch_array();
    if ($resultado->num_rows>0) {
      echo "EError el <span id='spanMenErr'>nombre</span> de empleado ya existe";
      return;
    }
    $consulta="insert into empleados (idempleados,nombre,apellidos) values ('$numEmpleado','$nombreEmpleado','$apellidoEmpleado')";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      if (mysqli_errno($conexion)=="1062") {
        echo "EError el <span id='spanMenErr'>número</span> de empleado esta duplicado\nIngrese otro número de empleado diferente";
      }
    }else{
      echo "SUsuario Agreado con Exito";
    }
    mysqli_close($conexion);
  }else{
    echo "Error sintaxis de javascript";
  }

 ?>
