<?php
  include_once '../../conexion/conexion.php';
  if (isset($_POST['numParte'])&&isset($_POST['lista'])) {
   $numParte=$_POST['numParte'];
   $consulta="SELECT np.num_parte, np.rate FROM num_parte np WHERE np.num_parte LIKE '%$numParte%' AND np.estado = '1' LIMIT 5;";
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
     $datos[]="NO EXISTE ESE NÚMERO DE PARTE";
     echo json_encode($datos,JSON_UNESCAPED_UNICODE);
     exit();
   }
   echo json_encode($datos,JSON_UNESCAPED_UNICODE);
 }
 if (isset($_POST['numParte'])&&isset($_POST['rate'])) {
   $numParte=$_POST['numParte'];
   $datos2=array('rate'=>'');
   $consulta="SELECT np.rate,np.num_parte FROM num_parte np WHERE np.num_parte='$numParte'";
   $resultado=$conexion->query($consulta);
   if (!$resultado) {
     $datos2[]="$conexion->errno".$conexion->error;
     echo json_encode($datos,JSON_UNESCAPED_UNICODE);
     exit();
   }
   $fila=$resultado->fetch_object();
   $datos['num_parte']=$fila->num_parte;
   $datos2['rate']=$fila->rate;
   echo json_encode($datos2,JSON_UNESCAPED_UNICODE);
 }
 $conexion->close();
 $resultado->close();
 ?>
