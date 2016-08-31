<?php
  include '../conexion/conexion.php';
  if(!isset($_SESSION)){
    session_start();
  }
  if ($_SERVER['REQUEST_METHOD']=="POST") {
    if (isset($_POST['pFecha'])){
    $conexionLista=$conexion;
    $fecha=date($_POST['pFecha']);
    $fechaHoy=date('Y-m-d',strtotime($fecha));
    $fechaAyer=date('Y-m-d',strtotime($fecha."-1 day"));
    $fechaManana=date('Y-m-d',strtotime($fecha."+1 day"));
    $fechas=$arrayName = array('fechaHoy' => $fechaHoy,'fechaAyer'=>$fechaAyer,'fechaManana'=>$fechaManana );
    //echo "dia de hoy = ".$fechaHoy." día de ayer: ".$fechaAyer." día de mañana: ".$fechaManana;
      mostrarListaNumOrden($conexion,$fechas);
    }//fin del if isset($_POST['pFecha'])
    else{
      // echo "No entro a if del ".'isset($_POST["pFaecha"]'."";
    }//fin del else de isset$_POST['pFecha']
    //este if se llamo desde el archivo produccion.js en la línea 425
    if (isset($_POST['pHoy'])&&isset($_POST['pNumOrd'])&&isset($_POST['pNumEmp'])) {
      $fechaHoyPost=$_POST['pHoy'];
      $NumOrden=$_POST['pNumOrd'];
      $numEmp=$_POST['pNumEmp'];
      $consulta="select MAX(a.fecha) from asistencia a";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        echo "Error: (".$conexion->errno.").".$conexion->error;
        $conexion->close();
        exit();
      }
      $fila=$resultado->fetch_array();
      if (!($fila[0]==$fechaHoyPost)) {
        echo "Fechas no coinciden";
        $conexion->close();
        exit();
      }
      $consulta="select nm.idnum_orden, da.iddetalle_asistencia, da.asistencia_fecha FROM num_orden nm, detalle_asistencia da where nm.idnum_orden='$NumOrden' and da.empleados_idempleados='$numEmp' and da.asistencia_fecha='$fechaHoyPost'";
      $resultado=$conexion->query($consulta);
      //si el resultado de consulta tiene errores no va a seguir despues de la función errorConsulta
      errorConsulta($resultado,$conexion);
      $fila=$resultado->fetch_array();
      $numOrdQue=$fila['idnum_orden'];
      $idDetAsisQue=$fila['iddetalle_asistencia'];
      /*vamos a comprobar que no haya en la tabla iddetalle_Lista_NumOrden dos registros iguales por ejemplo en un mismo número de orden el mismo iddetalle_asistenciaDetList
      iddetalle_asistenciaDetList idnum_ordenDetLis iddetalle_Lista_NumOrden
      247                         50029                         6
      247                         50029                         7             */
      buscarDetalleListaOrden($conexion,$idDetAsisQue,$numOrdQue);
      /* pruebas para comprobar la información
      echo "Numero de orden: ".$numOrdQue." idDetAsistencia: "."$idDetAsisQue";*/
      $consulta="insert into `detalle_Lista_NumOrden` (`iddetalle_Lista_NumOrden`, `idnum_ordenDetLis`, `iddetalle_asistenciaDetList`) values (null,'$numOrdQue','$idDetAsisQue')";
      $resultado=$conexion->query($consulta);
      errorConsulta($resultado,$conexion);
      echo "Exito";
    }//fin del if isset($_POST['pHoy'])&&isset($_POST['pNumOrd'])&&isset($_POST['pNumEmp'])
  }//fin del if $_SERVER['REQUEST_METHOD']=="POST"
  else{
    echo "No entro a if de método ".'$_SERVER["REQUEST_METHOD"]==POST'."";
  }
  function mostrarListaNumOrden($conexion,$fechas)
  {
    $consulta="select nm.idnum_orden, nm.num_parte, nm.fecha from num_orden nm, num_parte np WHERE nm.fecha BETWEEN '".$fechas['fechaAyer']."' and '".$fechas['fechaManana']."' and nm.num_parte=np.num_parte and nm.cantidad_realizada<=nm.cantidad ORDER BY nm.fecha_generada DESC";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Error: (".$conexion->errno.").".$conexion->error;
      return;
    }
    echo "<ul class='list-group' id='listaNumOrd'>";
    $contador=0;
    while ($fila=$resultado->fetch_array()) {
      echo "<li class='list-group-item'><span class='spanNumOrd'>".$numOrden=$fila[0]."</span>";
      echo "<ul class='list-group'><li class='lisNumPart list-group-item'><span id='spanNumPart$contador'>".$numParte=$fila[1]."</span>";
      $listNumEmpEnNumOrdenRes=listNumEmpEnNumOrden($conexion,$numOrden,$fechas['fechaHoy']);
      echo "<ul class='list-group'><li class='list-group-item'><ul class='lNumEmpCNumOrd'>".$listNumEmpEnNumOrdenRes."</ul>";
      echo "<input placeholder='# de empleado' class='form-control inpCLNE' list='inpLisNumParte$contador' name='inpLisNumParte'><datalist id='inpLisNumParte$contador'>".optionNumEmpl($conexion,$fechas['fechaHoy'],$numOrden)."</datalist><input type='button' class='btn-primary form-control inpBtnLisNumEmp' value='Agregar' data-toggle='popover'></li></ul>";
      echo "</ul></li>";
      $contador++;
    }
    echo "</ul>";
  }
  function optionNumEmpl($conexion,$fecha,$numOrden)
  {
    $option="";
    $consulta="SELECT da.*,concat_ws(' ',e.nombre,e.apellidos) as Nombre,e.idempleados from detalle_asistencia da, empleados e where (da.asistencia_fecha='$fecha') and not ( da.iddetalle_asistencia IN (SELECT dln.iddetalle_asistenciaDetList from detalle_Lista_NumOrden dln WHERE dln.idnum_ordenDetLis='$numOrden' and dln.iddetalle_asistenciaDetList=da.iddetalle_asistencia )) and (da.empleados_idempleados=e.idempleados) ORDER BY da.iddetalle_asistencia DESC";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      $option="<option value='$conexion->error'>";
      return $option;
    }else{
      while ($fila=$resultado->fetch_array()) {
        $option=$option."<option value='".$fila['idempleados']."'>".$fila['Nombre']."</option>";
      }
      return $option;
    }
  }
  function errorConsulta($resultado,$conexion)
  {
      if (!$resultado){
        echo "Error: (".$conexion->errno.").".$conexion->error;
        $conexion->close();
        exit();
      }
  }
  function buscarDetalleListaOrden($conexion,$detAsis,$numOrden)
  {
    $consulta="SELECT * from detalle_Lista_NumOrden dlm where dlm.idnum_ordenDetLis='$numOrden' and dlm.iddetalle_asistenciaDetList='$detAsis'";
    $resultado=$conexion->query($consulta);
    errorConsulta($resultado,$conexion);
    $numFila=$resultado->num_rows;
    if ($numFila>0) {
      echo "Error Ya existe el número de empleado en este número de orden";
      exit();
    }
  }//fin de la función buscarDetalleListaOrden
  //si exite empleados en el número de orden que me los muestre en la lista, de la fecha del día(HOY).
  function listNumEmpEnNumOrden($conexion,$numOrden,$hoy)
  {
    $consulta="SELECT * from detalle_asistencia da where (da.asistencia_fecha='$hoy') and ( da.iddetalle_asistencia IN (SELECT dln.iddetalle_asistenciaDetList from detalle_Lista_NumOrden dln WHERE dln.idnum_ordenDetLis='$numOrden' and dln.iddetalle_asistenciaDetList=da.iddetalle_asistencia ))";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Hubo un error en la consulta(".$conexion->errno."): $conexion->error";
      exit();
    }else {
      if ($resultado->num_rows>0) {
        $li="";
        $contador=0;
        while ($fila=$resultado->fetch_array()) {
          $li=$li."<li><span id='numEmpListaNumOrd$contador'>".$fila['empleados_idempleados']."</span><span>Eliminar</span>"."</li>";
          $contador++;
        }
        return $li;
      }
    }
  }
?>
