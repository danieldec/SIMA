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
      $fechas= array('fechaHoy' => $fechaHoy,'fechaAyer'=>$fechaAyer,'fechaManana'=>$fechaManana );
      //echo "dia de hoy = ".$fechaHoy." día de ayer: ".$fechaAyer." día de mañana: ".$fechaManana;
      if (isset($_POST['pNumOrdenL'])) {
        $datos=array("optionNumEmpl"=>"","cantEmplNumOrd"=>"");
        $numOrden=$_POST['pNumOrdenL'];
        $datos["optionNumEmpl"]=optionNumEmpl($conexion,$fecha,$numOrden);
        $datos["cantEmplNumOrd"]=cantEmplNumOrd($conexion,$numOrden,$fecha);
        echo json_encode($datos);
        exit();
      }
      mostrarListaNumOrden($conexion,$fechas);

    }//fin del if isset($_POST['pFecha'])
    else{
      // echo "No entro a if del ".'isset($_POST["pFaecha"]'."";
    }//fin del else de isset$_POST['pFecha']
    //eliminar numero empleado de la lista de número de orden;
    if (isset($_POST['pNumEmpleado'])&& isset($_POST['pNumOrd'])&&isset($_POST['pF'])) {
      $numEmpleado=$_POST['pNumEmpleado'];
      $numOrden=$_POST['pNumOrd'];
      $fHoy=$_POST['pF'];
      $arreglo= array('Validacion'=>'HOLA','Datos'=>'HOLA' );
      $consulta="select @idDetLisNum:=dln.iddetalle_Lista_NumOrden from detalle_Lista_NumOrden dln where dln.iddetalle_asistenciaDetList in(select da.iddetalle_asistencia from detalle_asistencia da join detalle_Lista_NumOrden dln on da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList and da.empleados_idempleados='$numEmpleado' AND da.asistencia_fecha='$fHoy') AND dln.idnum_ordenDetLis='$numOrden';
      DELETE FROM detalle_Lista_NumOrden WHERE iddetalle_Lista_NumOrden =@idDetLisNum;";
      $filas=0;
      $contador=0;
      if ($conexion->multi_query($consulta)) {
        do {
          if ($resultado=$conexion->store_result()) {
            while ($fila=$resultado->fetch_object()) {
              $filas=$resultado->num_rows;
              $contador=$contador+1;
            }
            $resultado->free();
          }
        } while ($conexion->next_result());
      }
      if ($conexion->errno) {
        $arreglo['Validacion']="ErrorDB";
        $arreglo['Datos']=$conexion->errno."($conexion->error)";
        if ($conexion->errno==1451) {
          $arreglo['Validacion']="ErrorControlado";
          $arreglo['Datos']="No se puede Eliminar este número de empleado ".$numEmpleado." tiene una o más capturas realizadas";
        }
        echo json_encode($arreglo);
        exit();
      }
      if ($filas==1) {
        $arreglo['Validacion']="Exito";
        $arreglo['Datos']="Numero de empleado eliminado";
        echo json_encode($arreglo);
        exit();
      }
    }
    //este if se llamo desde el archivo produccion.js en la línea 611
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
    // if (isset($_POST['pTabCapNumEmp'])) {
    //   $fecha=fechaActual();
    //   $arreglo= array('Validacion'=>'','Datos'=>'' );
    //   $arreglo=mostrarListaEmpleados($conexion,$fecha['fechaHoy'],$arreglo);
    //   echo json_encode($arreglo);
    // }
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
      //aquí vamos a verificar si hay un operador o no
      if ($resultado->num_rows<=0) {
        $inpDatListEmpleados="<input placeholder='# de empleado' class='form-control inpNumEmpl'value='No hay operadores asignados' list='capListNumEmp' name='inpNumEmpl' autocomplete='off'><datalist id='capListNumEmp'>";
      }elseif ($resultado->num_rows>0) {
        $inpDatListEmpleados="<input placeholder='# de empleado' class='form-control inpNumEmpl' list='capListNumEmp' name='inpNumEmpl' autocomplete='off'><datalist id='capListNumEmp'>";
      }
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
    }//fin del if $_POST['pTipoTM']
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
    //---------------------------Registro de la captura en la base de datos------------
    if (isset($_POST['pIdEmpleado'])&&isset($_POST['pIdDetAsis'])&&isset($_POST['pDatosForm'])) {
      //Aquí inicializamos el un arreglo, y obtenemos los datos que pasamos atraves del post.
      $arreglo= array('Validacion'=>'','Datos'=>'' );
      $numEmpleado=$_POST['pIdEmpleado'];
      $iddetalle_Lista_NumOrden=$_POST['pIdDetAsis'];
      //obtenemos los datos del formulario serializado que enviamos desde produccion.js
      parse_str($_POST['pDatosForm'],$datosForm);
      $fechaC=$datosForm['fechaC'];
      $horaInicioC=$datosForm['horaInicioC'];
      $horaFinalC=$datosForm['horaFinalC'];
      $cantidadC=$datosForm['cantidadC'];
      $tmC=$datosForm['tmC'];
      $tm=$datosForm['tm'];
      $eficienciaC=$datosForm['eficienciaC'];
      //Aquí vamos a convertir las horas en formato string como el siguiente 2016-10-09 10:20:00
      $horaI=date("Y-m-d H:i:s",strtotime($horaInicioC));
      $horaF=date("Y-m-d H:i:s",strtotime($horaFinalC));
      $fechaCero=$fechaC."00:00:00";
      //con este for vamos a encontrar la hora que vamos a buscar en nuestra base de datos y la hora inicio le vamos a sumar 59 minutos
      for ($i=0; $i < 23; $i++) {
        $horaIR=date("Y-m-d H:i:s",strtotime("+".$i."hour",strtotime($fechaCero)));
        $horaFR=date("Y-m-d H:i:s",strtotime("+".($i+1)."hour",strtotime($fechaCero)));
        if ($horaI>=$horaIR&&$horaI<=$horaFR) {
          $hIDB=date("H:i:s",strtotime($horaIR));
          $hFDB=date("H:i:s",strtotime("+59 minutes",strtotime($horaIR)));
        }
      }
      $consulta="SELECT * FROM captura c where c.iddetalle_Lista_NumOrdenCap in (SELECT dln.iddetalle_Lista_NumOrden FROM detalle_Lista_NumOrden dln where dln.iddetalle_asistenciaDetList in (SELECT da.iddetalle_asistencia from detalle_asistencia da where da.empleados_idempleados='$numEmpleado' and da.asistencia_fecha='$fechaC')) AND c.hora_inicio BETWEEN '$hIDB' AND '$hFDB' ORDER BY c.hora_final ASC";
      $resultado=$conexion->query($consulta);
      $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
      if ($arreglo['Validacion']=="Error") {
        $arreglo['Validacion']="ErrorDB";
        echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
        exit();
      }
      if ($conexion->affected_rows==0) {
        $arreglo=captura($conexion,$arreglo,$numEmpleado,$iddetalle_Lista_NumOrden,$fechaC,$cantidadC,$horaInicioC,$horaFinalC,$tmC,$eficienciaC);
        if ($arreglo['Validacion']=="Error") {
          $arreglo['Validacion']="ErrorDB";
          echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
          exit();
        }
        $arreglo['Validacion']="Exito";
        $arreglo['Datos']="Captura Realizada";
      }//fin del if
      else{
        $numReg=$resultado->num_rows;
        $contador=1;
        while ($fila=$resultado->fetch_object()) {
          if ($numReg==$contador) {
            if (strtotime($fila->hora_inicio)==strtotime($horaFinalC)) {
              $arreglo=captura($conexion,$arreglo,$numEmpleado,$iddetalle_Lista_NumOrden,$fechaC,$cantidadC,$horaInicioC,$horaFinalC,$tmC,$eficienciaC);
              if ($arreglo['Validacion']=="Error") {
                $arreglo['Validacion']="ErrorDB";
                echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
                exit();
              }//fin del if
              $arreglo['Validacion']="Exito";
              $arreglo['Datos']="Captura Realizada";
              // echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
              break;
            }
            if (strtotime($fila->hora_final)==strtotime($horaInicioC)) {
              $hIdbA=$fila->hora_inicio;
              $hFdbA=$fila->hora_final;
              $arreglo=captura($conexion,$arreglo,$numEmpleado,$iddetalle_Lista_NumOrden,$fechaC,$cantidadC,$horaInicioC,$horaFinalC,$tmC,$eficienciaC);
              if ($arreglo['Validacion']=="Error") {
                $arreglo['Validacion']="ErrorDB";
                echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
                exit();
              }//fin del if
              $arreglo['Validacion']="Exito";
              $arreglo['Datos']="Captura Realizada";
              // echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
              break;
            }
            if (strtotime($fila->hora_final)>strtotime($horaInicioC)||strtotime($fila->hora_final)<strtotime($horaInicioC)) {
              if (strtotime($fila->hora_inicio)==strtotime($horaInicioC)&&strtotime($fila->hora_final)==strtotime($horaFinalC)) {
                if(abs(((strtotime($fila->hora_inicio)-strtotime($fila->hora_final))/60))==60){
                  $arreglo['Validacion']="Error";
                  $arreglo['Datos']="Captura Duplicada";
                  $arreglo['DatosExtra']=$fila;
                  // echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
                  break;
                }
              }
              $arreglo['Validacion']="Error";
              $arreglo['Datos']="Debe coincidir la hora final del último registro con la hora inicio de la captura";
              $arreglo['DatosExtra']=$fila;
              // echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
              break;
            }
          }
          if (strtotime($fila->hora_inicio)==strtotime($horaInicioC)&&strtotime($fila->hora_final)==strtotime($horaFinalC)) {
            $arreglo['Validacion']="Error";
            $arreglo['Datos']="Captura Duplicada";
            $arreglo['DatosExtra']=$fila;
            // echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
            break;
          }
          if ($horaInicioC!=$fila->hora_inicio&&$horaFinalC!=$fila->hora_final) {
            if (abs(((strtotime($fila->hora_inicio)-strtotime($fila->hora_final))/60))==60) {
              $arreglo['Validacion']="Error";
              $arreglo['Datos']="Captura duplicada";
              $arreglo['DatosExtra']=$fila;
              // echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
              break;
            }
            // if (abs(((strtotime($fila->hora_inicio)-strtotime($fila->hora_final)))/60)<60) {
            //   $arreglo['Validacion']="Error";
            //   $arreglo['Datos']="Debe coincidir la hora final del último registro con la hora inicio de la captura";
            //   $arreglo['DatosExtra']=$fila;
            //   echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
            //   exit();
            // }
          }
          $contador++;
        }//fin del while
        if ($arreglo['Validacion']=="Error") {
          echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
          exit();
        }
      }//fin del else
      if ($tm=="no") {
        echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
        exit();
      }
      if (isset($_POST['pArregloTiempoMuerto'])&&$tm=="si") {
        $consulta="SELECT * FROM captura c WHERE c.iddetalle_Lista_NumOrdenCap='$iddetalle_Lista_NumOrden' AND cast(c.eficiencia as decimal)=cast('$eficienciaC' as decimal) AND c.tiempo_muerto='$tmC' AND c.hora_inicio='$horaInicioC' AND c.hora_final='$horaFinalC' AND c.fecha='$fechaC'";
        $resultado=$conexion->query($consulta);
        if (!$resultado) {
          $arreglo['Validacion']="ErrorDB";
          $arreglo['Datos']=$conexion->errno."($conexion->error)";
          echo json_encode($arreglo);
          exit();
        }
        // $filaArreglo= array();
        // while ($fila=$resultado->fetch_object()) {
        // $filaArreglo[]=$fila;
        // }
        $numeroFila=$resultado->num_rows;
        $fila=$resultado->fetch_object();
        if ($numeroFila>0) {
          $idCapturaTM=$fila->idcaptura;
          foreach ($_POST['pArregloTiempoMuerto'] as $valor) {
            foreach ($valor as $k=>$v) {
              if ($k==0) {
              $idTiempoM=$valor[$k];
            }
            if ($k==1) {
              if ($valor[$k]>0){
                $minutosTM=$valor[$k];
              }
            }
          }//fin del for each
          $consulta="INSERT INTO detalleTiempoM (idcaptura,idtiempo_muerto,minutos) VALUES ('$idCapturaTM','$idTiempoM','$minutosTM')";
          $resultado=$conexion->query($consulta);
          if (!$resultado) {
            $arreglo['Validacion']="ErrorDB";
            $arreglo['Datos']=$conexion->errno."($conexion->error)";
            echo json_encode($arreglo);
            exit();
            }//fin del if
          }//fin del for each
        }//fin del if resultado->num:rows
        // $arreglo["DatosExtra"]="Numero de filas: ".$numeroFila." arreglo fila".var_dump($filaArreglo)."Arreglo tiempo muerto".var_dump($_POST['pArregloTiempoMuerto']);
        $arreglo['TM']="OK";
        echo json_encode($arreglo);
      }//aquí acaba el if de arrelgo tiempo muerto
    }//aquí acaba el if de la captura
    //Aquí se contruye el tbody de la tabla detalle captura
    if (isset($_POST['pNumOrdenDC'])&&isset($_POST['pfechaDC'])) {
      $numOrdenDC=trim($_POST['pNumOrdenDC']);
      $fechaDC=trim($_POST['pfechaDC']);
      $arreglo= array('Validacion'=>'','Datos'=>'' );
      $consulta="SELECT c.idcaptura,c.fecha,da.empleados_idempleados,c.hora_inicio,c.hora_final,c.tiempo_muerto,c.eficiencia,c.cantidad,c.horaCaptura, da.iddetalle_asistencia FROM captura c, detalle_Lista_NumOrden dln, detalle_asistencia da WHERE c.iddetalle_Lista_NumOrdenCap in (SELECT dln.iddetalle_Lista_NumOrden FROM detalle_Lista_NumOrden dln where dln.idnum_ordenDetLis='$numOrdenDC') and dln.iddetalle_Lista_NumOrden= c.iddetalle_Lista_NumOrdenCap and c.fecha='$fechaDC' and da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList ORDER BY c.horaCaptura DESC;";
      $resultado=$conexion->query($consulta);
      $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
      if ($arreglo['Validacion']=="Error") {
        echo json_encode($arreglo);
        exit();
      }
      $arreglo['Validacion']="Exito";
      if ($resultado->num_rows==0) {
        $arreglo['Validacion']="Error";
        $arreglo['Datos']="No se encontraron captura";
        echo json_encode($arreglo);
        exit();
      }
      $registros=array();
      $contador=1;
      $tbody="";
      while ($fila=$resultado->fetch_object()) {
        $tbody=$tbody."<tr>";
        $tbody=$tbody."<td>".$contador."</td>";
        $tbody=$tbody."<td class='idCap'>".$fila->idcaptura."</td>";
        $tbody=$tbody."<td>".$fila->fecha."</td>";
        $tbody=$tbody."<td class='numEmpleado'>".$fila->empleados_idempleados."</td>";
        $tbody=$tbody."<td>".$fila->hora_inicio."</td>";
        $tbody=$tbody."<td>".$fila->hora_final."</td>";
        $tbody=$tbody."<td class='tmCap'>".$fila->tiempo_muerto."</td>";
        $tbody=$tbody."<td>".$fila->eficiencia."</td>";
        $tbody=$tbody."<td>".$fila->cantidad."</td>";
        $tbody=$tbody."<td>".$fila->horaCaptura."</td>";
        $tbody=$tbody."<td>".$fila->iddetalle_asistencia."</td>";
        $tbody=$tbody."<td class='text-center'>".'<button type="button" class="btn btn-default editCap" aria-label="Left Align"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'.'<button type="button" class="btn btn-default elimCap" aria-label="Left Align"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>'."</td>";
        $tbody=$tbody."</tr>";
        $contador++;
      }
      $arreglo['Datos']=$tbody;
      echo json_encode($arreglo);
    }
    //aquí eliminamos la captura de un operador desde nuestro modal detalle captura
    if (isset($_POST['pIdCaptura'])&&isset($_POST['pNumOrdenEC'])&&isset($_POST['pFechaEC'])) {
      $idCaptura=$_POST['pIdCaptura'];
      $pNumOrdenEC=$_POST['pNumOrdenEC'];
      $pFechaEC=$_POST['pFechaEC'];
      $arreglo= array('Validacion'=>'','Datos'=>'' );
      $consulta="DELETE FROM detalleTiempoM where idcaptura='$idCaptura';";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        $arreglo['Validacion']="errordb";
        $arreglo['Datos']="Error($conexion->errno) ".$conexion->error;
        exit();
      }
      $consulta="DELETE FROM captura WHERE idcaptura ='$idCaptura';";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        $arreglo['Validacion']="errordb";
        $arreglo['Datos']="Error($conexion->errno) ".$conexion->error;
        exit();
      }
      if ($conexion->affected_rows>0) {
        $consulta="SELECT c.idcaptura,c.fecha,da.empleados_idempleados,c.hora_inicio,c.hora_final,c.tiempo_muerto,c.eficiencia,c.cantidad,c.horaCaptura, da.iddetalle_asistencia FROM captura c, detalle_Lista_NumOrden dln, detalle_asistencia da WHERE c.iddetalle_Lista_NumOrdenCap in (SELECT dln.iddetalle_Lista_NumOrden FROM detalle_Lista_NumOrden dln where dln.idnum_ordenDetLis='$pNumOrdenEC') and dln.iddetalle_Lista_NumOrden= c.iddetalle_Lista_NumOrdenCap and c.fecha='$pFechaEC' and da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList ORDER BY c.horaCaptura DESC;";
        $resultado=$conexion->query($consulta);
        $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
        if ($arreglo['Validacion']=="Error") {
          $arreglo['Validacion']="errordb";
          echo json_encode($arreglo);
          exit();
        }
        $arreglo['Validacion']="exito";
        // if ($resultado->num_rows==0) {
        //   $arreglo['Validacion']="error";
        //   $arreglo['Datos']="No se encontraron capturas";
        //   echo json_encode($arreglo);
        //   exit();
        // }
        $contador=1;
        $tbody= tbodyDetCaptura($resultado);
        $arreglo['Datos']=$tbody;
        $arreglo['mensaje']="captura eliminada";
        echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
      }else{
        $arreglo['Validacion']="error";
        $arreglo['Datos']="Captura no eliminada";
        echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
      }
    }//fin del if
    if (isset($_POST['pIdCapEdit'])&&isset($_POST['pIdNumEmpl'])) {
      $idCaptura=$_POST['pIdCapEdit'];
      $numEmpleado=$_POST['pIdNumEmpl'];
      $arreglo = array('Validacion'=>'','Datos'=>'');
      $consulta="SELECT * FROM captura c WHERE c.idcaptura=$idCaptura";
      $resultado=$conexion->query($consulta);
      $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
      if ($arreglo['Validacion']=="Error") {
        $arreglo['Validacion']="ErrorDB";
        echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
        exit();
      }
      $arreglo['Validacion']='Exito';
      $tbody="";
      $contador=1;
      while ($fila=$resultado->fetch_object()) {
      $tbody=$tbody."<tr><td>".$contador."</td>";
      $tbody=$tbody."<td>".$fila->idcaptura."</td>";
      $tbody=$tbody."<td>".$numEmpleado."</td>";
      $tbody=$tbody."<td>".$fila->fecha."</td>";
      $tbody=$tbody."<td>"."<input type='text' id='inpCantEC'class='form-control' value='$fila->cantidad'>"."</td>";
      $tbody=$tbody."<td>"."<input type='text' id='inpHIEC'class='form-control' value='$fila->hora_inicio'>"."</td>";
      $tbody=$tbody."<td>"."<input type='text' id='inpHFEC'class='form-control' value='$fila->hora_final'>"."</td>";
      $tbody=$tbody."<td class='tmEC' style='color:rgb(0, 48, 255)'>".$fila->tiempo_muerto."</td>";
      $tbody=$tbody."<td class='efiEC'>".$fila->eficiencia."</td>";
      $tbody=$tbody."<td>".'<button disabled type="button" class="btn btn-default btnEC" aria-label="Left Align"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span></button>'."</td></tr>";
      }
      $arreglo['Datos']=$tbody;
      echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
    }//fin del if $_POST['pIdCapEdit']
    if (isset($_POST['pIdCapEC'])) {
      $idCap=$_POST['pIdCapEC'];
      $arreglo = array('Validacion' => '','Datos'=>'');
      $consulta="SELECT tm.idtiempo_muerto,minutos,descripcion FROM detalleTiempoM dtm, tiempo_muerto tm where dtm.idcaptura='$idCap' AND tm.idtiempo_muerto=dtm.idtiempo_muerto";
      $resultado=$conexion->query($consulta);
      $arreglo= errorConsultaJSON($resultado,$conexion,$arreglo);
      if ($arreglo['Validacion']=="Error") {
        $arreglo['Validacion']="ErrorDB";
        echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
        exit();
      }
      $arreglo['Validacion']="Exito";
      if ($conexion->affected_rows==0) {
        $arreglo['Datos']="No se encontro tiempo muerto";
        echo json_encode($arreglo);
        exit();
      }
      $table="";
      $table="<table class='table table-bordered' style='width:50%; margin-left:27%' id='tablaTMEC'><thead><tr><th>#"."</th>"."<th>idTM</th><th>min</th><th>Desc</th><th>Elim</th></tr></thead><tbody>";
      $contador=1;
      while ($fila=$resultado->fetch_object()) {
        $table=$table."<tr><td>$contador</td>";
        $table=$table."<td class='idElimTMEC'>$fila->idtiempo_muerto</td>";
        $table=$table."<td class='minTMEC'>$fila->minutos</td>";
        $table=$table."<td>$fila->descripcion</td>";
        $table=$table."<td><a href='#' class='eTMEC'>eliminar</a></td></tr>";
        $contador++;
      }
      $table=$table.'</tbody></table>';
      $arreglo['Datos']=$table;
      echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
    }//fin del if isset($_POST['pIdCapEC'])
    if (isset($_POST['pIdCapE'])&&isset($_POST['pElimTM'])&&isset($_POST['pIdElimTM'])
    &&isset($_POST['pMinTMEC'])) {
      $idCaptura=$_POST['pIdCapE'];
      $idTM=$_POST['pIdElimTM'];
      $minTMEC=$_POST['pMinTMEC'];
      $arreglo = array('Validacion' =>'','Datos'=>'');
      $consulta="SELECT c.tiempo_muerto FROM captura c WHERE c.idcaptura='$idCaptura'";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        $arreglo['Validacion']="Error";
        $arreglo['Datos']="$conexion->errno("."$conexion->error)";
        exit();
      }
      $fila=$resultado->fetch_object();
      $minTM=$fila->tiempo_muerto;
      $consulta="DELETE FROM detalleTiempoM WHERE idcaptura='$idCaptura' and idtiempo_muerto='$idTM';";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        $arreglo['Validacion']="Error";
        $arreglo['Datos']="$conexion->errno("."$conexion->error)";
        exit();
      }
      $arreglo['Validacion']="Exito";
      $minTMAct=$minTM-$minTMEC;
      $consulta="UPDATE `SIMAP`.`captura` SET `tiempo_muerto`= '$minTMAct' WHERE `idcaptura`='$idCaptura';";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        $arreglo['Validacion']="Error";
        $arreglo['Datos']="$conexion->errno("."$conexion->error)";
        exit();
      }
      $arreglo['Validacion']="Exito";
      $arreglo['Datos']="Eliminada con éxito";
      echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
    }
    if (isset($_POST['idTM'])&&isset($_POST['minutosTM'])&&isset($_POST['idCap'])&&isset($_POST['minCap'])) {
      $idTM=$_POST['idTM'];
      $minutosTM=$_POST['minutosTM'];
      $idCap=$_POST['idCap'];
      $minCaptura=$_POST['minCap'];
      $arreglo = array('Validacion'=>'','Datos'=>'');
      $consulta="INSERT INTO detalleTiempoM (idcaptura,idtiempo_muerto,minutos) VALUES ('$idCap','$idTM','$minutosTM')";
      $resultado=$conexion->query($consulta);
      $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
      if ($arreglo['Validacion']=="Error") {
        $arreglo['Validacion']="ErrorDB";
        echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
        exit();
      }
      $sumaMinutos=$minutosTM+$minCaptura;
      $consulta="UPDATE `SIMAP`.`captura` SET `tiempo_muerto`='$sumaMinutos' WHERE `idcaptura`='$idCap';";
      $resultado=$conexion->query($consulta);
      $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
      if ($arreglo['Validacion']=="Error") {
        $arreglo['Validacion']="ErrorDB";
        echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
        exit();
      }
      $arreglo['Validacion']="Exito";
      $arreglo['Datos']="registro tiempo muerto exitoso";
      echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
    }//fin del if
    if (isset($_POST['idCapEC'])&&isset($_POST['npCE'])) {
      $idCap=$_POST['idCapEC'];
      $rateNP="";
      $arreglo = array('Validacion' => '','Datos'=>'' );
      $consulta="SELECT * FROM num_parte nm where nm.num_parte in(SELECT nmo.num_parte FROM num_orden nmo where nmo.idnum_orden in(SELECT dln.idnum_ordenDetLis FROM detalle_Lista_NumOrden dln where dln.iddetalle_Lista_NumOrden in (SELECT c.iddetalle_Lista_NumOrdenCap FROM captura c WHERE c.idcaptura='$idCap')));";
      $resultado=$conexion->query($consulta);
      $arreglo=errorConsulta($resultado,$conexion,$arreglo);
      if ($arreglo['Validacion']=="Error") {
        $arreglo['Validacion']="ErrorDB";
        json_encode($arreglo,JSON_UNESCAPED_UNICODE);
        exit();
      }
      $arreglo['Validacion']="Exito";
      $fila=$resultado->fetch_object();
      $rateNP=$fila->rate;
      $arreglo['Datos']=$rateNP;
      echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
    }//fin del if
    if (isset($_POST['cantAuxEC'])&&isset($_POST['horaIAuxEC'])&&isset($_POST['horaFAuxEC'])&&isset($_POST['tmMinAuxEC'])&&isset($_POST['efiAuxEC'])&&isset($_POST['idCapEC'])) {
      $cantAuxEC=$_POST['cantAuxEC'];
      $horaIAuxEC=$_POST['horaIAuxEC'];
      $horaFAuxEC=$_POST['horaFAuxEC'];
      $tmMinAuxEC=$_POST['tmMinAuxEC'];
      $efiAuxEC=$_POST['efiAuxEC'];
      $idCapEC=$_POST['idCapEC'];
      $arreglo = array('Validacion' =>'','Datos'=>'');
      $consulta="UPDATE `SIMAP`.`captura` SET `cantidad`='$cantAuxEC', `hora_inicio`='$horaIAuxEC', `hora_final`='$horaFAuxEC', `tiempo_muerto`='$tmMinAuxEC', `eficiencia`='$efiAuxEC', `usuarios_idusuario`='".$_SESSION['idusuario']."',`horaCaptura`=CURRENT_TIMESTAMP WHERE `idcaptura`='$idCapEC';";
      $resultado=$conexion->query($consulta);
      $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
      if ($arreglo['Validacion']=="Error") {
        $arreglo['Validacion']='ErrorDB';
        echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
        exit();
      }
      $arreglo['Validacion']="Exito";
      $arreglo['Datos']="Captura actualizada con exito";
      echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
    }
  }//fin del if $_SERVER['REQUEST_METHOD']=="POST"
  else{
    echo "No entro a if de método ".'$_SERVER["REQUEST_METHOD"]==POST'."";
  }

/*---------------AQUÍ EMPIEZAN LAS FUNCIONES DE PHP-------------------*/

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
      echo "<input placeholder='# de empleado' autocomplete='off' class='form-control inpCLNE' list='inpLisNumParte$contador' name='inpLisNumParte'><datalist id='inpLisNumParte$contador'>".optionNumEmpl($conexion,$fechas['fechaHoy'],$numOrden)."</datalist><input type='button' class='btn-primary form-control inpBtnLisNumEmp' value='Agregar' data-toggle='popover'></li></ul>";
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
    $consulta="SELECT * from detalle_asistencia da where (da.asistencia_fecha='$hoy') and ( da.iddetalle_asistencia IN (SELECT dln.iddetalle_asistenciaDetList from detalle_Lista_NumOrden dln WHERE dln.idnum_ordenDetLis='$numOrden' and  da.iddetalle_asistencia=dln.iddetalle_asistenciaDetList))";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Hubo un error en la consulta(".$conexion->errno."): $conexion->error";
      exit();
    }else {
      if ($resultado->num_rows>0) {
        $li="";
        $contador=0;
        while ($fila=$resultado->fetch_array()) {
          $li=$li."<li><span id='numEmpListaNumOrd$contador'>".$fila['empleados_idempleados']."</span><span><a href='#' class='elimNumEmp'>Eliminar</a></span>"."</li>";
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
    $consulta="select nm.idnum_orden, nm.num_parte, nm.fecha, nm.STATUS FROM num_orden nm, num_parte np WHERE nm.fecha BETWEEN '".$diaAyer."' and '".$diaManana."' and nm.num_parte=np.num_parte and nm.STATUS='PRODUCCION' ORDER BY nm.fecha_generada DESC";
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
  // function mostrarListaEmpleados($conexion,$hoy,$arreglo){
  //   $consulta="select e.idempleados, concat_ws(' ',e.nombre,e.apellidos) as Nombre,da.iddetalle_asistencia  from detalle_asistencia as da, empleados as e where da.asistencia_fecha='$hoy' and e.idempleados=da.empleados_idempleados order by da.iddetalle_asistencia ASC";
  //   $resultado=$conexion->query($consulta);
  //   $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
  //   if ($arreglo['Validacion']=='Error') {
  //     return $arreglo;
  //   }
  //   $arreglo['Validacion']="Exito";
  //   $datos="";
  //   while ($fila=$resultado->fetch_array()) {
  //     $datos=$datos."<tr><td>".$fila['idempleados']."</td>";
  //     $datos=$datos."<td>".$fila['Nombre']."</td>";
  //     for ($i=0; $i <22 ; $i++) {
  //       if ($i>=0&&$i<11) {
  //         $datos=$datos."<td></td>";
  //       }else{
  //         $datos=$datos."<td hidden='hidden'></td>";
  //       }
  //     }
  //     $datos=$datos."<td class='detAsisCap'>".$fila['iddetalle_asistencia']."</td></tr>";
  //   }
  //   $arreglo['Datos']=$datos;
  //   return $arreglo;
  // }
  function captura($conexion,$arreglo,$numEmpleado,$iddetalle_Lista_NumOrden,$fechaC,$cantidadC,$horaInicioC,$horaFinalC,$tmC,$eficienciaC)
  {
    $consulta="INSERT INTO captura (idcaptura, fecha, cantidad, hora_inicio, hora_final, tiempo_muerto, eficiencia, usuarios_idusuario, iddetalle_Lista_NumOrdenCap, horaCaptura) VALUES (NULL,'$fechaC','$cantidadC','$horaInicioC','$horaFinalC','$tmC','$eficienciaC','".$_SESSION['idusuario']."','$iddetalle_Lista_NumOrden',CURRENT_TIMESTAMP)";
    $resultado=$conexion->query($consulta);
    $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
    return $arreglo;
  }
  function tbodyDetCaptura($resultado)
  {
    $tbody="";
    $contador=1;
    while ($fila=$resultado->fetch_object()) {
      $tbody=$tbody."<tr>";
      $tbody=$tbody."<td>".$contador."</td>";
      $tbody=$tbody."<td class='idCap'>".$fila->idcaptura."</td>";
      $tbody=$tbody."<td>".$fila->fecha."</td>";
      $tbody=$tbody."<td class='numEmpleado'>".$fila->empleados_idempleados."</td>";
      $tbody=$tbody."<td>".$fila->hora_inicio."</td>";
      $tbody=$tbody."<td>".$fila->hora_final."</td>";
      $tbody=$tbody."<td>".$fila->tiempo_muerto."</td>";
      $tbody=$tbody."<td>".$fila->eficiencia."</td>";
      $tbody=$tbody."<td>".$fila->cantidad."</td>";
      $tbody=$tbody."<td>".$fila->horaCaptura."</td>";
      $tbody=$tbody."<td>".$fila->iddetalle_asistencia."</td>";
      $tbody=$tbody."<td class='text-center'>".'<button type="button" class="btn btn-default editCap" aria-label="Left Align"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'.'<button type="button" class="btn btn-default elimCap" aria-label="Left Align"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>'."</td>";
      $tbody=$tbody."</tr>";
      $contador++;
    }
    return $tbody;
  }
  function capturaTM()
  {

  }
  //serve para enviar mas de una fila en la consulta y enviarlas a javascript
  /*while ($fila=$resultado->fetch_object()) {
    $arreglo['Datos'][]=$fila;
  }
  echo json_encode($arreglo);*/
  /*$records=array();
  if ($resultado=$conexion->query($consulta)) {
    if ($resultado->num_rows) {
      while ($fila->$resultado->fetch_object()) {
        $records[]=$fila;
      }
      $resultado->free();
    }
  }
  if (count($records)) {
    foreach ($records as $r) {
      echo $r->nombreColumna;
    }
  }else{

  }*/
?>
