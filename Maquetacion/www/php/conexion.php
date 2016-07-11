<?php
$host="localhost";
$usuario="root";
$password="";
$baseDatos="SIMA";
$conexionMysqli = new mysqli($host, $usuario,$password , $baseDatos, 3306);
$conexionMysqli->set_charset('utf8');
if ($conexionMysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $conexionMysqli->connect_errno . ") " . $conexionMysqli->connect_error;
}
?>
