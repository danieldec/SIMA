<!DOCTYPE html>
<html lang="es">
<head>
  <?php session_start();
  if ($_SESSION['perfil']!='produccion') {
    header("Location:../../");
    session_destroy();
    exit;
  }
   ?>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Producción</title>
  <!-- Hojas de estilos que estan en la ruta www/css-->
  <?php include '../hojasEstilo.php'; ?>
  <link rel="stylesheet" href="../../css/jquery.dataTables.min.css" media="screen" charset="utf-8">
  <link rel="stylesheet" href="../../css/produccion.css" charset="utf-8">
</head>
<body>
  <!-- Barra de navegación y conexión base de datso-->
  <?php
    include '../nav.php';
    include '../conexion/conexion.php';
    // include 'asistencia.php';
   ?>
   <!--consulta php para el número de orden-->
   <?php
    $fila;
    $errorConsulta;
    $tiempo=time();
    $dia=date("Y-m-d");
    $consulta="select MAX(idnum_orden) as id from num_orden";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      $errorConsulta=mysqli_error($conexion);
    }else {
      $fila=$resultado->fetch_array();
    }
    $consultaFA="select MAX(asistencia.fecha) as fechaAsis from asistencia";
    $resultadoFA=$conexion->query($consulta);
    if (!$resultadoFA) {
      echo "Error(".$conexion->errno.")$conexion->error";
      return;
    }
    $filaFA=$resultadoFA->fetch_array();
    $conexion->close();
   ?>
   <input type="date" name="hoy" id="hoy" value="<?php echo $dia?>" hidden='hidden'>
  <div class="row">
    <div id="divFechaPagina" class="col-sm-12 text-right well">
      <?php include '../diaSemana.php';
      $fecha="";
      $diaSem=diaSemana();
      $fecha="Hoy es ".$diaSem." ".date('d/M/Y');
      echo "<span id='spanFechaPagina'>".$fecha."</span>";
      ?>
    </div>
  </div>
  <!-- Tablas de navegación-->
  <div class="container-fluid">
    <div class="row">
      <div role="tabpanel">
        <ul class="nav nav-pills nav-justified" role="tablist">
          <li role="presentation" class=""><a href="#divNumOrden" aria-controls="divNumorden" role="tab" data-toggle="tab">NÚMERO DE ORDEN</a></li>
          <li role="presentation" ><a href="#divAsistencia" aria-controls="divAsistencia" role="tab" data-toggle="tab">ASISTENCIA</a></li>
          <li role="presentation" class="active"><a href="#divCaptura" aria-controls="divCaptura" role="tab" data-toggle="tab">CAPTURA</a></li>
          <li role="presentation"><a href="#divRequerimientos" aria-controls="divRequerimientos" role="tab" data-toggle="tab">REQUERIMIENTOS</a></li>
        </ul>
        <br>
        <div class="tab-content">
          <!--Aquí empieza el tab de número de parte-->
          <!--Cambiar cuando termine con las otras pestañas
          <div role="tabpanel" class="tab-pane fade in active" id="divNumOrden">-->
          <div role="tabpanel" class="tab-pane fade" id="divNumOrden">
            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="post" id="formNumOrden">
              <div class="container-fluid well">
                <div class="row">
                    <div class="col-xs-2 col-xs-offset-1 text-center"><label>Número de Orden</label></div>
                    <div class="col-xs-2 text-center"><label>Número de Parte</label></div>
                    <div class="col-xs-2 text-center"><label>Parcial</label></div>
                    <div class="col-xs-2 text-center"><label>Cantidad</label></div>
                    <div class="col-xs-2 text-center"><label>Fecha Requerimiento</label></div>
                </div>
                <div class="row">
                  <div class="col-xs-2 text-center col-xs-offset-1"><input disabled class="form-control" name="numOrden" id="inpNumOrden"required type="number" value="<?php
                  //Aquí vamos a insertar el último registro de el número de parte
                    if (isset($fila)) {
                      echo 1+$fila['id'];
                    }else{
                      echo '0';
                    }
                     ?>"/>
                  </div>
                  <div class="col-xs-2 text-center">
                    <input class="form-control" autocomplete="off" name="numParte" id="inpNumParte" required type="text"/>
                    <ul id="listaNumParte" class="list-unstyled">
                    </ul>
                  </div>
                  <div class="col-xs-2 text-center"><input min="0" value="0" class="form-control" id="inpParcial" name="parcial" required type="number"/></div>
                  <div class="col-xs-2 text-center"><input min="0" value="0" class="form-control" id="inpCantReq" name="cantReq" required type="number"/></div>
                  <div class="col-xs-2 text-center"><input class="form-control" name="fNumOrden" id="inpFNumOrden"required type="date" value="<?php echo $dia?>"/></div>
                  <input type="text" name="numUsuario" id="inpNumUsuario" hidden="hidden"value="<?php echo $_SESSION['idusuario']; ?>">
                </div>
                <div class="row">
                  <div class="col-xs-6 col-xs-offset-3 text-center">
                    <input id="btnOrdPro"type="submit" class="text-center btn btn-primary" value="Generar Orden de producción">
                    <!-- Aquí se muestra los errores-->
                    <div id="mensajeBD">
                      <strong>ERROR: </strong><?php
                        if (isset($errorConsulta)){
                          echo $errorConsulta;
                        } ?>
                      </div>
                      <div id="mensajeNumOrden"> </div>
                  </div>
                </div>
              </div>
            </form>
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-12">
                  <form action="numOrden.php" id="formMosNumOrd"method="post">
                    <div class="col-sm-2">
                      <label for="">De</label><input type="date" name="fechIni"class="form-control" id="inpFechIni" value="<?php
                        $diaAnterior=strtotime('-1 day',strtotime($dia));
                        $diaAnterior=date('Y-m-d',$diaAnterior);
                        echo $diaAnterior;?>">
                    </div>
                    <div class="col-sm-2">
                      <label for="">hasta</label><input type="date" name="fechFin"class="form-control" id="inpFechFin" value="<?php echo $dia?>">
                    </div>
                    <div class="col-sm-1">
                      <label for="button">Click</label>
                      <input type="submit" name="" class="form-control" value="Mostrar" id="btnMostrarNumOrden">
                    </div>
                    <div class="col-sm-1">
                      <label for="button">Click</label>
                      <input type="button" name="" class="form-control" value="Ocultar" id="btnOcultarNumOrden">
                    </div>
                  </form>
                </div>
              </div>
              <div class="row">
                <div class="col-md-10 col-md-offset-1">
                  <div id="divTablaNumOrden">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--Aquí acaba el tab de número de parte -->
          <!--Aquí empieza el tab de asistencia-->
          <div role="tabpanel" class="tab-pane fade" id="divAsistencia">
            <div class="row">
              <div class="container-fluid col-md-12">
                <div class="col-md-6 container-fluid" id="colPrim">
                  <div class="row">
                    <div class="col-md-6">
                      <input type="date" class="form-control" name="inpAsistencia" id="inpFechAsis" value="<?php echo $dia ?>"/>
                    </div>
                    <div class="col-md-6">
                      <textarea class="form-control" rows="1" id="txtAreCom" placeholder="Comentario..."></textarea>
                    </div><br><br>
                    <div class="col-md-6 col-md-offset-3" id="divBtnFecha">
                      <button type="button" id="btnAsistencia"class="button btn-primary form-control" name="btnAsistencia">Agregar Nueva Fecha de Asistencia</button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <h2 class="text-center">Lista Asistencia</h2>
                      <form class="" id="formListAsis"action="#" method="post">
                        <input type="date" class="form-control" name="inpFeAsis" id="inpFeAsis" required value="<?echo$dia?>">
                        <input type="text" class="form-control" name="inpNumEmpAsis" id="inpNumEmpAsis" required value="" placeholder="# de empleado">
                        <input type="submit" class="form-control btn-success" name="inpBtnLista" id="inpBtnLista" value="Agregar lista"/>
                      </form>
                      <div id="menListNumOpe">

                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 container-fluid" id="colSeg">
                  <div class="row">
                    <button type="button" class="btn-primary form-control"name="btnMosLisFecha" id="btnMosLisFecha">Mostrar Lista Asistencia</button>
                    <div class="col-md-12" id="divMosLista">
                    </div>
                  </div>
                  <div class="row">
                    <button type="button" id="btnMosLisEmpl" class="btn-success form-control"name="button">Mostrar Lista Empleados</button>
                  </div>
                  <div class="row">
                    <div class="col-md-12" id='divTablaEmpleados'>
                      <table class="table table-bordered" id="tableEmplAsis">
                      <?php
                      include '../conexion/conexion.php';
                      $consulta1="SELECT concat_ws(' ',e.nombre,e.apellidos) as Nombre, e.idempleados  from empleados e";
                      $resultado1=$conexion->query($consulta1);
                      if (!$resultado1) {
                        echo "Error(".$conexion->errno.")$conexion->error";
                      }else{
                        $tabla ='';
                        $tabla=$tabla.'<thead><tr><th>#</th><th># empleado</th><th>Nombre</th></tr></thead>';
                        $contador=0;
                        while ($fila=$resultado1->fetch_array()) {
                          $tabla=$tabla."<tr><td>$contador</td><td>".$fila['idempleados']."</td><td>".$fila['Nombre']."</td></tr>";
                          $contador++;
                      }
                      echo $tabla;
                    }
                       ?>
                       </table>
                    </div>
                  </div>
                </div>
              </div>
            </div><br>
            <div class="row">
              <div class="col-md-6">
              </div>
            </div>
            <!-- Aquí termina el row -->
          </div>
          <!--Aquí termina el tab de asistencia| -->
          <!--Aquí empieza el tab de captura-->
          <div role="tabpanel" class="tab-pane fade in active" id="divCaptura">
            <!--Pestañas o tabs de la captura-->
            <ul class="nav nav-tabs" id="uLTabCaptura">
              <li><a href="#tabAsigNumOrden" data-toggle="tab">Asignar Número de Empleado a Número de Orden</a></li>
              <li><a href="#capNumOrd" data-toggle="tab">Captura Numero Orden</a></li>
              <li class="active"><a href="#capNumEmp" data-toggle="tab">Captura Numero de Empleado</a></li>
            </ul>

            <!-- Aquí empieza el contenido de la pestaña o tab -->
            <div class="tab-content">
              <div class="tab-pane fade" id="tabAsigNumOrden">
                <div class="col-md-12 container-fluid text-center">
                  <div class="row">
                    <h3 class="text-center">Asignar Número de Empleado a Número de Orden</h3>
                    <button class="btn-primary btn-lg" id="btnMosListNumOrden">Mostrar</button>
                  </div>
                  <div class="row">
                    <div id="divChBoxNumParte" class="col-md-8">
                      <input type="checkbox"  name="chMostrarNumParte" id="chMostrarNumParte" ><span>Ver Número de parte</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 col-md-offset-3" id="divListNumOrden">
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="capNumOrd">
                <div class="col-md-8 col-md-offset-2 container-fluid">
                  <h2 class="text-center">Lista Numero de Ordenes</h2>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="table-responsive">
                        <table id="tablaCaptura"class="table table-bordered">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>No. de Orden</th>
                              <th>No. de Parte</th>
                              <th>ESTATUS</th>
                              <th>Captura</th>
                              <th>Detalle</th>
                            </tr>
                          </thead>
                          <tbody>
                            <?php
                            function listaCaptura($conexion,$dia)
                            {
                              //aquí obtenemos la fecha de ayer y de mañana para la consulta en la base de datos
                              $diaAyer=strtotime('-1 day',strtotime($dia));
                              $diaAyer=date('Y-m-d',$diaAyer);
                              $diaManana=strtotime('+1 day',strtotime($dia));
                              $diaManana=date('Y-m-d',$diaManana);
                              $consulta="select nm.idnum_orden, nm.num_parte, nm.fecha, nm.STATUS FROM num_orden nm, num_parte np WHERE nm.fecha BETWEEN '".$diaAyer."' and '".$diaManana."' and nm.num_parte=np.num_parte and nm.cantidad_realizada<=nm.cantidad and nm.STATUS='PRODUCCION' ORDER BY nm.fecha_generada DESC";
                              $resultado=$conexion->query($consulta);
                              if (!$resultado) {
                                echo "Error:($conexion->errno)"."$conexion->error";
                                exit();
                              }
                              $contador=1;
                              while ($fila=$resultado->fetch_array()) {
                                echo '<tr><td>'.$contador.'</td>';
                                  echo '<td class="tdCapNumOrd">'.$fila['idnum_orden'].'</td>';
                                  echo '<td>'.$fila['num_parte'].'</td>';
                                  echo '<td>'.$fila['STATUS'].'</td>';
                                  echo '<td>'.'<button class="btn btn-default capturaEmpleados form-control"><span class="glyphicon glyphicon-camera" aria-hidden="true">Captura</button>'.'</td>';
                                    echo '<td>'.'<button class="btn btn-default detalleNumOrden form-control"><span class="glyphicon glyphicon-list-alt" aria-hidden="true">Detalle</button>'.'</td></tr>';
                                      $contador++;
                                    }
                                  }
                                  listaCaptura($conexion,$dia);
                                  ?>
                          </tbody>
                        </table>
                      </div><!--Aquí termina el div de tabla responsiva-->
                    </div>
                  </div><!-- Aquí termina el div con clase row-->
                </div>
                <!--Aquí termina el div de la col-md-12.-->
              </div>
              <!--Aquí termina el div con id capNumOrd-->
              <!--Aquí empieza el tab del id=capNumEmp-->
              <div class="tab-pane fade in active" id="capNumEmp">
                <div class="col-md-12">
                  <div id="divTabCapNumEmp"class="container-fluid">
                    <table class="table table-bordered" id="tableCapNumEmp">
                      <caption>Captura</caption>
                      <thead>
                        <tr>
                          <th># Empleado</th>
                          <th>Nombre</th>
                          <th>7-8</th>
                          <th>8-9</th>
                          <th>9-10</th>
                          <th>10-11</th>
                          <th>11-12</th>
                          <th>12-1</th>
                          <th>1-2</th>
                          <th>2-3</th>
                          <th>3-4</th>
                          <th>4-5</th>
                          <th>5-6</th>
                          <th>6-7</th>
                        </tr>
                      </thead>
                      <tbody id="tBodyCapNumEmp">

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!-- Aquí termina el contenido de la pestaña o tab -->
          </div>
          <!--Aquí termina el tab de captura| -->
          <!--Aquí empieza el tab de Requerimientos-->
          <div role="tabpanel" class="tab-pane fade" id="divRequerimientos">
            <div class="row">
              <div class="container-fluid">
                <p>Estas en el tab de requerimientos</p>
              </div>
            </div>
          </div>
          <!--Aquí termina el tab de captura| -->
        </div>
      </div>
    </div>
  </div>
  <!--  Modal para la captura de número de orden -->
  <div class="modal fade" id="modCapNumOrd" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" data-dismiss="modal" class="close">&times</button>
          <h4 class="text-center">Captura por número de orden</h4>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer"><button type="button" data-dismiss="modal" class="btn btn-default">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
  <!--  Modal de la captura -->
  <div class="modal fade" tabindex="-1" id="modalCaptura" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" data-dismiss="modal" class="close">&times</button>
          <h3 class="text-center">Captura</h4>
        </div>
          <div class="modal-body">
            <form id='formCaptura' class="form-inline" action="#" method="post" role="form">
              <div class="form-group">
                <label for="fechaC">Fecha</label>
                <input type="date" id="fechaC"name="fechaC" value="" class="form-control">
              </div>
              <div class="form-group">
              <label for="cantidadC">Cantidad</label>
              <input type="number" id="cantidadC" name="cantidadC"  value="0" class="form-control" required>
              </div>
              <label for="horaInicioC">Hora Inicio<input type="time" id='horaInicioC' name="horaInicioC" value="" class="form-control" required></label>
              <label for="horaFinalC">Hora Final<input type="time" id="horaFinalC" name="horaFinalC" value="" class="form-control" required></label>
              <div class="form-group">TTM
                <label>
                  <input type="radio" name="tm" value="no" checked>No
                </label>
                <label>
                  <input type="radio" name="tm" value="si">Si
                </label>
              </div>
              <!-- <label for="">No<input type="radio" name="tiempo" value="No"></label>
              <label for="">SI<input type="radio" name="tiempo" value="Si"></label> -->
              <div class="form-group">
                <label for="">Tiempo Muerto</label>
                <input type="number" name="tmC" id='tmC'value="0" class="form-control" required>
              </div>
              <label for="">Eficiencia<input type="text" name="eficienciaC" id='eficienciaC'value="0" class="form-control" required></label>
              <div class="row">
                <div class="col-md-12">
                  <input type="submit" name="capturarC" id="capturarC" value="CAPTURAR" class="form-control btn btn-primary btn-block">
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" data-dismiss="modal" class="btn btn-default">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Fin del modal de captura-->
    <!--Modal Tiempo Muerto-->
    <div class="modal fade" tab-index="-1" role="dialog" id="modalTiempoMuerto">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" data-dismiss="modal" class="close">&times</button>
            <h4>Tiempo Muerto</h4>
          </div>
          <div class="modal-body">
            <div class="form-group form-inline divFormTTM">
              <input placeholder="tipo tiempo muerto" class="form-control inpTiempoMuerto" list="tTM" name="inpTiempoMuerto"/>
              <datalist id="tTM">
              </datalist>
              <input placeholder="Minutos" type="number" min="0" name="inpCantidadTTM" class="form-control inpCantidadTTM" value="0">
            </div>
            <input class="btn btn-default form-control" type="button" name="btnAgregarTTM" value="Agregar" id="btnAgregarTTM">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnTM">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  <!--  Modal para la captura de número de empleado-->
  <!-- <button type="button" class="btn btn-success btn-md" id="myBtn" data-toggle="modal" data-target="#myModal" data-keyboard="false" data-backdrop='false'> -->
  <!-- <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog"> -->
      <!-- Modal -->
        <!-- <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog"> -->
            <!-- Modal content-->
            <!-- <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Modal Options</h4>
              </div>
              <div class="modal-body">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div> -->


  <!--importar los scripts de la ruta www/js -->
  <?php include '../scriptsPiePag.php'; ?>
  <script src="../../js/jquery.dataTables.min.js" charset="utf-8"></script>
  <script type="text/javascript" src="../../js/produccion.js"></script>
</body>
</html>
