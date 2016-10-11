<?php
  include '../conexion/conexion.php';
  if(!isset($_SESSION)){
    session_start();
  }
  if ($_SERVER['REQUEST_METHOD']=="POST") {
    //este .post es llama desde el archivo produccion.js en la línea 206
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
    }//fin del if $_POST['pFechAsis'])
    //este .post es llama desde el archivo produccion.js en la línea 268
    if (isset($_POST['pInpFeAsis'])&&isset($_POST['pInpNumEmp'])&&isset($_POST['pHoy'])) {
      $error="";
      $inpFeAsis=$_POST['pInpFeAsis'];
      $inpNumEmp=trim($_POST['pInpNumEmp']);
      $fechaHoy=$_POST['pHoy'];
      //hacemos una consulta a la base de datos para verificar si la fecha y el num de empleado existen en la base de datos
      $consulta = "select * from detalle_asistencia as da where da.asistencia_fecha='$inpFeAsis' AND da.empleados_idempleados ='$inpNumEmp'";
      $resultado=$conexion->query($consulta);
      //si la consulta genero un número de fila menor a 1 quiere decir que no existe el registro e insertamos el registro en la tabla detalle_asistencia
      if ($resultado->num_rows<1) {
        $consulta="insert into detalle_asistencia (iddetalle_asistencia,asistencia_fecha, empleados_idempleados) values('','$inpFeAsis','$inpNumEmp')";
        $resultado=$conexion->query($consulta);
        if (!$resultado) {
          //verificamos el tipo de error que nos arroja al momento de insertar un empleado
          $error= "EError:(".$conexion->errno.")".$conexion->error;
          //si el número de error es igual a 1452 quiere decir que no existe el número de empleado en la base de datos o es incorrecto el número de empleado que ingreso
          if ($conexion->errno==1452) {
            $error="EEl Número de empleado o la de Fecha Asistencia No Existe";
            echo $error;
          }else{
            echo $error;
          }
          exit();
        }
        /*$consulta = "select concat_ws(' ',e.nombre,e.apellidos) as Nombre, e.idempleados, dA.asistencia_fecha from empleados as e, detalle_asistencia as dA WHERE e.idempleados='$inpNumEmp' and dA.asistencia_fecha='$inpFeAsis' AND e.idempleados=dA.empleados_idempleados";
        $resultado=$conexion->query($consulta);
        if (!$resultado) {
          echo "Error:(".$conexion->errno.")".$conexion->error;
          exit();
        }
        $fila=$resultado->fetch_array();
        echo "Registro Exitoso: ".$fila['Nombre']." ".$fila['idempleados']." ".$fila['asistencia_fecha'];*/
        mostrarListaEmpleados($conexion,$fechaHoy);
      }else{
        $consulta="select concat_ws(' ',e.nombre,e.apellidos) as Nombre, e.idempleados from empleados as e where e.idempleados='$inpNumEmp'";
        $resultado=$conexion->query($consulta);
        if (!$resultado) {
          echo "EError: (".$conexion->errno.") $conexion->error";
          exit();
        }
        while ($fila=$resultado->fetch_array()) {
          echo "EYA INGRESASTE EL NUM DE EMPLEADO: <strong id='strIdEmp'>".$fila['idempleados']."</strong> ".$fila['Nombre'];
        }
      }

    }
    //este if se genera en la línea 296 del archivo produccion.js
    if (isset($_POST['pHoy'])and isset($_POST['pBAnBtnMos'])) {
      $fechaHoy=$_POST['pHoy'];
      mostrarListaEmpleados($conexion,$fechaHoy);
    }
  }//$_SERVER['REQUEST_METHOD']=="POST"

  //Aquí empiezan las funciones
  function asignarEmpleados(){
    echo "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, quas, in! Magnam error, quas ipsum facere necessitatibus, nemo aperiam iusto possimus voluptates cupiditate sunt excepturi dolore ea numquam veniam rerum.</p>";
  }
  function mostrarListaEmpleados($conexion,$hoy){
    $consulta="select e.idempleados, concat_ws(' ',e.nombre,e.apellidos) as Nombre,da.iddetalle_asistencia  from detalle_asistencia as da, empleados as e where da.asistencia_fecha='$hoy' and e.idempleados=da.empleados_idempleados order by da.iddetalle_asistencia ASC";
    $resultado=$conexion->query($consulta);
    //echo "Exito mostrarListaEmpleados".$conexion->client_info." ".$hoy;
    echo "<table class='table table-bordered table-responsive table-condensed table-reflow' id='tablaListaEmpleados'>
      <caption>Lista de <strong id='fechaListaAsis'>$hoy</strong></caption>
      <thead>
        <tr>
          <th>#</th>
          <th># Empleado</th>
          <th>Nombre</th>
          <th># det_asis</th>
          <th>Acción</th>
        </tr>
      </thead>";
      $contador=0;
      while ($fila=$resultado->fetch_array()) {
        $contador+=1;
        echo "<tr><td>$contador</td>";
        echo "<td>".$fila['idempleados']."</td>";
        echo "<td>".$fila['Nombre']."</td>";
        echo "<td>".$fila['iddetalle_asistencia']."</td>";
        echo "<td>Eliminar</td></tr>";
      }
  }
  function mostrarNumEmple()
  {
    include '../conexion/conexion.php';
    $consulta="select e.idempleados, concat_ws(' ',e.nombre,e.apellidos ) as Nombre from empleados as e order by e.idempleados asc";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Error(".$conexion->errno.") $conexion->error";
      exit();
    }
    echo "<table class='table table-bordered table-responsive table-condensed table-reflow' id='tablaEmpList'>
      <caption>Lista Empleados</caption>
      <thead>
        <tr>
          <th>#</th>
          <th># Empleado</th>
          <th>Nombre Completo</th>
        </tr>
      </thead>";
      $contador=0;
      while ($fila=$resultado->fetch_array()) {
        $contador+=1;
        echo "<tr><td>$contador</td>";
        echo "<td>".$fila['idempleados']."</td>";
        echo "<td>".$fila['Nombre']."</td></tr>";
      }
      mysqli_free_result($resultado);
      $conexion->close();
  }//Se termina la función mostrarNumEmple
?>
