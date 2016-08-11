<?php
  include '../conexion/conexion.php';
  if(!isset($_SESSION)){
    session_start();
  }
  if ($_SERVER['REQUEST_METHOD']=="POST") {
    if (isset($_POST['pFechAsis'])) {
      $fechaAsis=$_POST['pFechAsis'];
      $comentAsis=$_POST['pComentAsis'];
      $consulta="call insertarFechaAsistencia('$fechaAsis','$comentAsis')";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        echo "Error Num(".$conexion->errno.")".$conexion->error;
        exit();
      }
      echo "Exito";
      $conexion->close();
      exit();
    }
    if (isset($_POST['pInpFeAsis'])&&isset($_POST['pInpNumEmp'])) {
      $error="";
      $inpFeAsis=$_POST['pInpFeAsis'];
      $inpNumEmp=$_POST['pInpNumEmp'];
      $consulta = "select * from detalle_asistencia where detalle_asistencia.asistencia_fecha='$inpFeAsis' AND detalle_asistencia.empleados_idempleados ='$inpNumEmp'";
      $resultado=$conexion->query($consulta);
      if ($resultado->num_rows<1) {
        $consulta="insert into detalle_asistencia (iddetalle_asistencia, asistencia_fecha, empleados_idempleados) values('','$inpFeAsis','$inpNumEmp')";
        $resultado=$conexion->query($consulta);
        if (!$resultado) {
          //verificamos el tipo de error que nos arroja al momento de insertar un empleado
          $error= "Error:(".$conexion->errno.")".$conexion->error;
          //si el número de error es igual a 1452 quiere decir que no existe el número de empleado en la base de datos o es incorrecto el número de empleado que ingreso
          if ($conexion->errno==1452) {
            $error="Número de empleado No Existe";
            echo $error;
          }else{
            echo $error;
          }
          exit();
        }
        $consulta = "select * from detalle_asistencia as det_Asis where det_Asis.asistencia_fecha='$inpFeAsis' and det_Asis.empleados_idempleados='$inpNumEmp'";
        $resultado=$conexion->query($consulta);
        if (!$resultado) {
          echo "Error:(".$conexion->errno.")".$conexion->error;
          exit();
        }

      }else{
        $fila=$resultado->fetch_array();
        $consulta="select concat_ws(' ',e.nombre,e.apellidos) as Nombre, e.idempleados from empleados as e where e.idempleados='$inpNumEmp'";
        $resultado=$conexion->query($consulta);
        if (!$resultado) {
          echo "Error: (".$conexion->errno.") $conexion->error";
          exit();
        }
         $fila=$resultado->fetch_array();
         echo $fila['idempleados']." ". $fila['Nombre'];
        while ($fila=$resultado->fetch_array()) {
          echo "YA INGRESASTE EL NUM DE EMPLEADO: ".$fila['idempleados']." ".$fila['idempleados']." ".$fila['Nombre'];
        }
      }

    }
  }
  function asignarEmpleados(){
    echo "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, quas, in! Magnam error, quas ipsum facere necessitatibus, nemo aperiam iusto possimus voluptates cupiditate sunt excepturi dolore ea numquam veniam rerum.</p>";
  }
  function agregarListaEmpleados(){

  }
?>
