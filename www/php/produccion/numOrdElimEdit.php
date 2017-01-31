<?php
 include '../conexion/conexion.php';
 if(!isset($_SESSION)){
   session_start();
 }
 if (isset($_POST['numOrden'])&&isset($_POST['numParte'])&&isset($_POST['numReg'])) {
   $datos = array();
   $numParte = $_POST['numParte'];
   $numOrden = $_POST['numOrden'];
   $numReg = $_POST['numReg'];
   $consulta = "DELETE FROM num_orden WHERE num_orden.idnum_orden = '$numOrden' AND num_orden.num_parte = '$numParte'";
   $resultado=$conexion->query($consulta);
   if (!$resultado) {
     if ($conexion->errno==1451) {
       $datos['validacion']='error';
       $datos['datos']="No se puede eliminar el número de orden porque tiene empleados asignados y/o capturas realizadas";
     }else{
       $datos['validacion']='errordb';
       $datos['datos']=$conexion->errno."($conexion->error)";
     }
     echo json_encode($datos,JSON_UNESCAPED_UNICODE);
     exit();
   }
   if ($conexion->affected_rows==1) {
     $datos['validacion'] = "exito";
     $datos['datos'] = "Número de orden eliminado";
     $datos['numReg'] = $numReg;
     echo json_encode($datos,JSON_UNESCAPED_UNICODE);
   }else{
     $datos['validacion'] = "exito";
     $datos['datos'] = "Ya se encontraba eliminada";
     echo json_encode($datos,JSON_UNESCAPED_UNICODE);
   }
 }
 if (isset($_POST['fechaReqM'])&&isset($_POST['NumOrdD'])&&isset($_POST['cantReqM'])&&isset($_POST['numParD'])) {
   $datos = array();
   $numVarPost=count($_REQUEST);
   $idNumOrdenD = $_POST['NumOrdD'];
   $numParteD = $_POST['numParD'];
   $numParteM = $_POST['numParM'];
   $cantidad = $_POST['cantReqM'];
   $fecha = $_POST['fechaReqM'];
   switch ($numVarPost) {
     case 7:
       $idNumOrdenM = $_POST['NumOrdM'];
       $idUsuario = $_POST['numUsuLog'];
       $consulta = "SELECT * FROM num_orden AS nm WHERE nm.idnum_orden = '$idNumOrdenM';";
       $resultado = $conexion->query($consulta);
       if (!$resultado) {
         $datos['validacion'] = "error";
         $datos['datos'] = $conexion->errno."($conexion->error)";
         echo json_encode($datos,JSON_UNESCAPED_UNICODE);
         exit();
       }
       if ($resultado->num_rows>0) {
         $datos['validacion'] = 'error';
         $datos['datos'] = 'Número de orden ya existe intente con otro folio';
         echo json_encode($datos,JSON_UNESCAPED_UNICODE);
         exit();
       }
       $consulta="UPDATE num_orden SET idnum_orden='$idNumOrdenM',num_parte='$numParteM',cantidad = '$cantidad',fecha='$fecha',usuarios_idusuario='$idUsuario',fecha_generada=CURRENT_TIMESTAMP WHERE num_orden.idnum_orden = '$idNumOrdenD' AND num_orden.num_parte = '$numParteD'";
       $resultado=$conexion->query($consulta);
       if (!$resultado) {
         $datos['validacion'] = "error";
         $datos['datos'] = $conexion->errno."($conexion->error)";
         echo json_encode($datos,JSON_UNESCAPED_UNICODE);
         exit();
       }
       $datos['validacion'] = "exito";
       $datos['datos'] = "Edición Realizada";
       break;
     case 6:
       if (isset($_POST['NumOrdM'])) {
         $idNumOrdenM = $_POST['NumOrdM'];
         $consulta = "SELECT * FROM num_orden AS nm WHERE nm.idnum_orden = '$idNumOrdenM';";
         $resultado = $conexion->query($consulta);
         if (!$resultado) {
           $datos['validacion'] = "error";
           $datos['datos'] = $conexion->errno."($conexion->error)";
           echo json_encode($datos,JSON_UNESCAPED_UNICODE);
           exit();
         }
         if ($resultado->num_rows>0) {
           $datos['validacion'] = 'error';
           $datos['datos'] = 'Número de orden ya existe intente con otro folio';
           echo json_encode($datos,JSON_UNESCAPED_UNICODE);
           exit();
         }
         $consulta="UPDATE num_orden SET idnum_orden='$idNumOrdenM',num_parte='$numParteM',cantidad = '$cantidad',fecha='$fecha',fecha_generada=CURRENT_TIMESTAMP WHERE num_orden.idnum_orden = '$idNumOrdenD' AND num_orden.num_parte = '$numParteD'";
         $resultado=$conexion->query($consulta);
         if (!$resultado) {
           $datos['validacion'] = "error";
           $datos['datos'] = $conexion->errno."($conexion->error)";
           echo json_encode($datos,JSON_UNESCAPED_UNICODE);
           exit();
         }
         $datos['validacion'] = "exito";
         $datos['datos'] = "Edición Realizada";
       }/*Fin del if*/
       else{
         $idUsuario = $_POST['numUsuLog'];
         $consulta="UPDATE num_orden SET num_parte='$numParteM',cantidad = '$cantidad',fecha='$fecha',usuarios_idusuario='$idUsuario',fecha_generada=CURRENT_TIMESTAMP WHERE num_orden.idnum_orden = '$idNumOrdenD' AND num_orden.num_parte = '$numParteD'";
         $resultado=$conexion->query($consulta);
         if (!$resultado) {
           $datos['validacion'] = "error";
           $datos['datos'] = $conexion->errno."($conexion->error)";
           echo json_encode($datos,JSON_UNESCAPED_UNICODE);
           exit();
         }
         $datos['validacion'] = "exito";
         $datos['datos'] = "Edición Realizada";
       }
       break;
     case 5:
       $consulta="UPDATE num_orden SET num_parte='$numParteM',cantidad = '$cantidad',fecha='$fecha',fecha_generada=CURRENT_TIMESTAMP WHERE num_orden.idnum_orden = '$idNumOrdenD' AND num_orden.num_parte = '$numParteD'";
       $resultado=$conexion->query($consulta);
       if (!$resultado) {
         $datos['validacion'] = "error";
         $datos['datos'] = $conexion->errno."($conexion->error)";
         echo json_encode($datos,JSON_UNESCAPED_UNICODE);
         exit();
       }
       $datos['validacion'] = "exito";
       $datos['datos'] = "Edición Realizada";
       break;

     default:
       $datos['validacion']="error";
       $datos['datos']="error inesperado";
       break;
   }
   echo json_encode($datos,JSON_UNESCAPED_UNICODE);
 }
 ?>
