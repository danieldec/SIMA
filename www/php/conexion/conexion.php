<?php
  if (!isset($_SESSION)) {
    session_start();
  }
  $usuario="root";
  $contrasena="SIMADB2016";
  $equipo="localhost";
  $baseDatos="SIMAP";
  $conexion=new mysqli($equipo,$usuario,$contrasena,$baseDatos,3306);
  $conexion->set_charset('utf8');
  if ($conexion->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
  }
  ?>
