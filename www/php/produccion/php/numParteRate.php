<?php
  include_once '../../conexion/conexion.php';
  if (isset($_POST['numParte'])) {
   $numParte=$_POST['numParte'];
   $consulta="SELECT np.num_parte, np.rate FROM num_parte np WHERE np.num_parte LIKE '%$numParte%' LIMIT 5;";
   $resultado=$conexion->query($consulta);
   $datos=array();
   if (!$resultado) {
   $datos[]="$conexion->errno".$conexion->error;
   echo json_encode($datos,JSON_UNESCAPED_UNICODE);
   exit();
   }
   while ($fila=$resultado->fetch_object()) {
     $datos[]=$fila->num_parte;
   }
   if ($resultado->num_rows<=0) {
     $datos[]="NO EXISTE ESE NÚMERO DE ORDEN";
     echo json_encode($datos,JSON_UNESCAPED_UNICODE);
     exit();
   }
   echo json_encode($datos,JSON_UNESCAPED_UNICODE);
 }
 if (isset($_POST['numParte'])&&isset($_POST['rate'])x) {
   $numParte=$_POST['numParte'];
   $datos=array();
   $consulta="SELECT np.rate FROM num_parte np WHERE np.num_parte='$numParte'";
   $resultado=$conexion->quer($consulta);

 }
 ?>
