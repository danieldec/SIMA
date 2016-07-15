<?php
  $usuario="root";
  $contrasena="";
  $equipo="localhost";
  $baseDatos="SIMA";
  $conexion=new mysqli($equipo,$usuario,$contrasena,$baseDatos,3306);
  $conexion->set_charset('utf8');
  if ($conexion->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
  }
  ?>
