f<?php
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
    $fechas= array('fechaHoy' => $fechaHoy,'fechaAyer'=>$fechaAyer,'fechaManana'=>$fechaManana );
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
    }//fin del if  isset($_POST['pHoy'])&&isset($_POST['pNumOrd'])&&isset($_POST['pNumEmp'])
    if (isset($_POST['pActBadNumOrdn'])&&isset($_POST['pNumOrdenBadge'])&&isset($_POST['pHoy'])) {
      $numOrden=$_POST['pNumOrdenBadge'];
      $fechaHoy=$_POST['pHoy'];
      $numFilas=cantEmplNumOrd($conexion,$numOrden,$fechaHoy);
      echo "$numFilas";
    }
    //este if comprobamos que si se enviaron los datos de la función $.post('captura.php',{pBandListaNumOrd:bandListaNumOrd,phoy:hoy},listCapNumOrd)
    if (isset($_POST['pBandListaNumOrd'])&&isset($_POST['pHoy'])) {
      $arreglo= array('Validacion'=>'','Datos'=>'' );
      if (isset($_POST['pInicio'])) {
        echo json_encode($arreglo);
        exit();
      }
      $fechas=fechaActual();
        $consulta="SELECT DATE_FORMAT(DATE_ADD(MAX(a.fecha), INTERVAL 1 DAY),'%d-%b-%Y') as hoyF, MAX(a.fecha) as hoy from asistencia a";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        $arreglo['Validacion']='Error';
        $arreglo['Datos']="Error: (".$conexion->errno.").".$conexion->error;
        echo json_encode($arreglo);
        exit();
      }
      $fila=$resultado->fetch_array();
      $fechaDia=$fila['hoy'];
      if (!($fechaDia==$fechas['fechaHoy'])) {
        $arreglo['Validacion']='Error';
        $arreglo['Datos']="Por favor ingresa la asistencia del Día ".$fila['hoyF'];
        echo json_encode($arreglo);
        exit();
      }
      $arreglo['Validacion']='Exito';
      $respuesta=listaCaptura($conexion,$fechaDia);
      $arreglo['Datos']=$respuesta;
      echo json_encode($arreglo);
      // echo json_encode($fechas);
    }
    if (isset($_POST['pTabCapNumEmp'])) {
      $fecha=fechaActual();
      $arreglo= array('Validacion'=>'','Datos'=>'' );
      $arreglo=mostrarListaEmpleados($conexion,$fecha['fechaHoy'],$arreglo);
      echo json_encode($arreglo);
    }
    if (isset($_POST['pcapNumOrden'])) {
      $fecha=fechaActual();
      $arreglo= array('Validacion'=>'','Datos'=>'' );
      $numOrden=$_POST['pcapNumOrden'];
      $consulta="SELECT dln.iddetalle_Lista_NumOrden, da.iddetalle_asistencia,e.idempleados, concat_ws(' ',e.nombre,e.apellidos ) as Nombre FROM detalle_Lista_NumOrden dln, detalle_asistencia da,empleados e WHERE dln.idnum_ordenDetLis='$numOrden' AND da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList AND e.idempleados=da.empleados_idempleados AND da.asistencia_fecha='".$fecha['fechaHoy']."'";
      $resultado=$conexion->query($consulta);
      $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
      if ($arreglo['Validacion']=="Error") {
        echo json_encode($arreglo);
        exit();
      }
      $arreglo['Validacion']='Exito';
      $inpDatListEmpleados="<input placeholder='# de empleado' class='form-control inpNumEmpl' list='capListNumEmp' name='inpNumEmpl' autocomplete='off'><datalist id='capListNumEmp'>";
      while ($fila=$resultado->fetch_array()) {
        $inpDatListEmpleados=$inpDatListEmpleados."<option value='".$fila['idempleados']."'>".$fila['Nombre']."</option>";
        $inpDatListEmpleados=$inpDatListEmpleados."<input type='hidden' value='".$fila['iddetalle_Lista_NumOrden']."' id='".$fila['idempleados']."'>";
      }
      $inpDatListEmpleados=$inpDatListEmpleados.'</datalist><button type="button" class="btn btn-success form-control" id="capturaC">Captura</button>';
      $arreglo['Datos']=$inpDatListEmpleados;
      echo json_encode($arreglo);
    }
    //
    if (isset($_POST['pTipoTM'])) {
      $arreglo= array('Validacion'=>'','Datos'=>'' );
      $consulta="SELECT * from tiempo_muerto tm";
      $resultado=$conexion->query($consulta);
      $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
      if ($arreglo['Validacion']=="Error") {
        echo json_encode($arreglo);
        exit();
      }
      $arreglo['Validacion']='Exito';
      $dataListTipoTM="";
      while ($fila=$resultado->fetch_array()) {
        $dataListTipoTM=$dataListTipoTM."<option value=".$fila['idtiempo_muerto'].">".$fila['descripcion']."</option> ";
      }
      $arreglo['Datos']=$dataListTipoTM;
      echo json_encode($arreglo);
    }
    if (isset($_POST['capNumParte'])) {
      $arreglo= array('Validacion'=>'','Datos'=>'');
      $numParte=$_POST['capNumParte'];
      $consulta="SELECT np.rate from num_parte np WHERE np.num_parte='".$numParte."'";
      $resultado=$conexion->query($consulta);
      $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
      if ($arreglo['Validacion']=="Error") {
        echo json_encode($arreglo);
        exit();
      }
      $arreglo['Validacion']=="Exito";
      $fila=$resultado->fetch_array();
      $arreglo['Datos']=$fila['rate'];
      echo json_encode($arreglo);
    }
    /*{pIdEmpleado:idEmpleado,pIdDetAsis:idDetAsis,pDatosForm:datosForm,pArregloTiempoMuerto:arregloTiempoMuerto}
    fechaC=2016-09-19&cantidadC=900&horaInicioC=23%3A00&horaFinalC=00%3A00&tm=no&tmC=0&eficienciaC=0*/
    //Captura de la eficiencia número de empleado
    if (isset($_POST['pIdEmpleado'])&&isset($_POST['pIdDetAsis'])) {
      //Aquí inicializamos el un arreglo, y obtenemos los datos que pasamos atraves del post.
      $arreglo= array('Validacion'=>'','Datos'=>'' );
      $numEmpleado=$_POST['pIdEmpleado'];
      $iddetalle_Lista_NumOrden=$_POST['pIdDetAsis'];
      parse_str($_POST['pDatosForm'],$datosForm);
      $fechaC=$datosForm['fechaC'];
      $cantidadC=$datosForm['cantidadC'];
      $horaInicioC=$datosForm['horaInicioC'];
      $horaFinalC=$datosForm['horaFinalC'];
      $tmC=$datosForm['tmC'];
      $tm=$datosForm['tm'];
      $eficienciaC=$datosForm['eficienciaC'];
      //aquí buscamos si existe un captura con el id de iddetalle_Lista_NumOrden, para buscar si hay una captura con la misma hora de inicio.
      $consulta="select c.idcaptura,c.hora_inicio,c.hora_final,c.eficiencia from captura c where c.iddetalle_Lista_NumOrdenCap=$iddetalle_Lista_NumOrden";
      $resultado=$conexion->query($consulta);
      $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
      if ($arreglo['Validacion']=="Error") {
        echo json_encode($arreglo);
        exit();
      }
      $arreglo['Validacion']="Exito1";
      $fila=$resultado->num_rows;
      if ($fila==0) {
        $arreglo=captura($conexion,$arreglo,$numEmpleado,$iddetalle_Lista_NumOrden,$fechaC,$cantidadC,$horaInicioC,$horaFinalC,$tmC,$eficienciaC);
        if ($arreglo['Validacion']=="Error") {
          echo json_encode($arreglo);
          exit();
        }
        $arreglo['Validacion']="Exito2";
        echo json_encode($arreglo);
      }
      //aquí si el resultado que nos arroja es mayor de 0, quiere decir que existe una captura con el iddetalle_Lista_NumOrden que mandamos en el formulario. y vamos a buscar los errores que pueden surgir.
      elseif ($fila>0) {
        $consulta="SELECT * FROM captura c WHERE c.iddetalle_Lista_NumOrdenCap='$iddetalle_Lista_NumOrden'";
        $resultado=$conexion->query($consulta);
        $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
        if ($arreglo['Validacion']=="Error") {
          echo json_encode($arreglo);
          exit();
        }
        // while ($fila=$resultado->fetch_array()) {
        //   if ($horaInicioC==$fila['hora_inicio']) {
        //   $arreglo['Datos']=['idcaptura'=>$fila['idcaptura'],'fecha'=>$fila['fecha'],'cantidad'=>$fila['cantidad'],'hora_inicio'=>$fila['hora_inicio'],'hora_final'=>$fila['hora_final'],'tiempo_muerto'=>$fila['tiempo_muerto'],'eficiencia'=>$fila['eficiencia']];
        //   $arreglo['Validacion']="Error";
        //   echo json_encode($arreglo);
        //   exit();
        //   }
        // }
        while ($fila=$resultado->fetch_array()) {
          if ($horaInicioC!=$fila['hora_final']) {
            $arreglo['Datos']=['idcaptura'=>$fila['idcaptura'],'fecha'=>$fila['fecha'],'cantidad'=>$fila['cantidad'],'hora_inicio'=>$fila['hora_inicio'],'hora_final'=>$fila['hora_final'],'tiempo_muerto'=>$fila['tiempo_muerto'],'eficiencia'=>$fila['eficiencia']];
            $arreglo['Validacion']="Error";
            echo json_encode($arreglo);
            exit();
          }
        }
        $arreglo=captura($conexion,$arreglo,$numEmpleado,$iddetalle_Lista_NumOrden,$fechaC,$cantidadC,$horaInicioC,$horaFinalC,$tmC,$eficienciaC);
        if ($arreglo['Validacion']=="Error") {
          echo json_encode($arreglo);
          exit();
        }
        $arreglo['Validacion']="Exito3";
        echo json_encode($arreglo);
      }
      if (isset($_POST['pArregloTiempoMuerto'])) {
        foreach ($_POST['pArregloTiempoMuerto'] as $valor) {
          foreach ($valor as $k=>$v) {
            if ($k==0) {
              echo "idTiempoM: ".$valor[$k];
            }
            if ($k==1) {
              if ($valor[$k]>0) {
                echo " MinutosTM ".$valor[$k]."\n";
              }
            }
          }//fin del for each
        }//fin del for each
      }//aquí acaba el if de arrelgo tiempo muerto
    }//aquí acaba el if de la captura
  }//fin del if $_SERVER['REQUEST_METHOD']=="POST"
  else{
    echo "No entro a if de método ".'$_SERVER["REQUEST_METHOD"]==POST'."";
  }
  function errorConsultaJSON($resultado,$conexion,$arreglo)
  {
    if (!$resultado){
      $arreglo['Validacion']="Error";
      $arreglo['Datos']="(".$conexion->errno.").".$conexion->error;
      $conexion->close();
      return $arreglo;
    }
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
      echo "<span class='badge'>".cantEmplNumOrd($conexion,$numOrden,$fechas['fechaHoy'])."</span>";
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
  }//fin de la función listNumEmpEnNumOrden
  function cantEmplNumOrd($conexion,$numOrden,$fecha)
  {
    $consulta="select dln.iddetalle_Lista_NumOrden, da.empleados_idempleados from detalle_Lista_NumOrden dln inner join detalle_asistencia da on dln.iddetalle_asistenciaDetList=da.iddetalle_asistencia where da.asistencia_fecha='$fecha' and dln.idnum_ordenDetLis='$numOrden'";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Error consulta(".$conexion->errno.")".$conexion->error;
      exit();
    }else{
      $fila=$resultado->num_rows;
      return $fila;
    }
  }
  function listaCaptura($conexion,$dia)
  {
    //aquí obtenemos la fecha de ayer y de mañana para la consulta en la base de datos
    $diaAyer=strtotime('-1 day',strtotime($dia));
    $diaAyer=date('Y-m-d',$diaAyer);
    $diaManana=strtotime('+1 day',strtotime($dia));
    $diaManana=date('Y-m-d',$diaManana);
    $consulta="select nm.idnum_orden, nm.num_parte, nm.fecha, nm.STATUS FROM num_orden nm, num_parte np WHERE nm.fecha BETWEEN '".$diaAyer."' and '".$diaManana."' and nm.num_parte=np.num_parte and nm.cantidad_realizada<=nm.cantidad and nm.STATUS='PRODUCCION' ORDER BY nm.fecha_generada DESC";
    $resultado=$conexion->query($consulta);
    $tbody='';
    if (!$resultado) {
      $tbody="Error:($conexion->errno)"."$conexion->error";
      exit();
    }
    $contador=1;
    while ($fila=$resultado->fetch_array()) {
      $tbody=$tbody.'<tr><td>'.$contador.'</td>';
      $tbody=$tbody.'<td class="tdCapNumOrd">'.$fila['idnum_orden'].'</td>';
      $tbody=$tbody.'<td class="tdCapNumPart">'.$fila['num_parte'].'</td>';
      $tbody=$tbody.'<td>'.$fila['STATUS'].'</td>';
      $tbody=$tbody.'<td>'.'<button class="btn btn-default capturaEmpleados form-control"><span class="glyphicon glyphicon-camera" aria-hidden="true">Captura</button>'.'</td>';
      $tbody=$tbody.'<td>'.'<button class="btn btn-default detalleNumOrden form-control"><span class="glyphicon glyphicon-list-alt" aria-hidden="true">Detalle</button>'.'</td></tr>';
      $contador++;
    }
    return $tbody;
  }
  function fechaActual()
  {
    include '../conexion/conexion.php';
    $fecha=date('Y-m-d');
    $fechaHoy=date('Y-m-d',strtotime($fecha));
    $consulta="SELECT MAX(a.fecha) hoy from asistencia a";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      errorConsulta($resultado,$conexion);
    }
    $fila=$resultado->fetch_array();
    if ($fila['hoy']==$fechaHoy) {
      $fechaAyer=date('Y-m-d',strtotime($fecha."-1 day"));
      $fechaManana=date('Y-m-d',strtotime($fecha."+1 day"));
      return $fechas= array('fechaHoy' => $fechaHoy,'fechaAyer'=>$fechaAyer,'fechaManana'=>$fechaManana );
    }
  }
  function mostrarListaEmpleados($conexion,$hoy,$arreglo){
    $consulta="select e.idempleados, concat_ws(' ',e.nombre,e.apellidos) as Nombre,da.iddetalle_asistencia  from detalle_asistencia as da, empleados as e where da.asistencia_fecha='$hoy' and e.idempleados=da.empleados_idempleados order by da.iddetalle_asistencia ASC";
    $resultado=$conexion->query($consulta);
    $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
    if ($arreglo['Validacion']=='Error') {
      return $arreglo;
    }
    $arreglo['Validacion']="Exito";
    $datos="";
    while ($fila=$resultado->fetch_array()) {
      $datos=$datos."<tr><td>".$fila['idempleados']."</td>";
      $datos=$datos."<td>".$fila['Nombre']."</td>";
      for ($i=0; $i <12 ; $i++) {
        $datos=$datos."<td></td>";
      }
      $datos=$datos."<td class='detAsisCap'>".$fila['iddetalle_asistencia']."</td></tr>";
    }
    $arreglo['Datos']=$datos;
    return $arreglo;
  }
  function captura($conexion,$arreglo,$numEmpleado,$iddetalle_Lista_NumOrden,$fechaC,$cantidadC,$horaInicioC,$horaFinalC,$tmC,$eficienciaC)
  {
    $consulta="INSERT INTO captura (idcaptura, fecha, cantidad, hora_inicio, hora_final, tiempo_muerto, eficiencia, usuarios_idusuario, iddetalle_Lista_NumOrdenCap, horaCaptura) VALUES (NULL,'$fechaC','$cantidadC','$horaInicioC','$horaFinalC','$tmC','$eficienciaC','".$_SESSION['idusuario']."','$iddetalle_Lista_NumOrden',CURRENT_TIMESTAMP)";
    $resultado=$conexion->query($consulta);
    $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
    return $arreglo;
  }
  function capturaTM()
  {

  }
?>
