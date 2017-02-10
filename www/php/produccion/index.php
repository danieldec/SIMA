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
  <!--CSS de Libreria jqwidget-->
  <link type="text/css" rel="Stylesheet" href="../../css/styles/jqx.base.css" />
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
    $consulta="SELECT MAX(idnum_orden) AS id FROM num_orden";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      $errorConsulta=mysqli_error($conexion);
    }else {
      $fila=$resultado->fetch_array();
    }
    $consultaFA="SELECT MAX(asistencia.fecha) AS fechaAsis FROM asistencia";
    $resultadoFA=$conexion->query($consulta);
    if (!$resultadoFA) {
      echo "Error(".$conexion->errno.")$conexion->error";
      return;
    }
    $filaFA=$resultadoFA->fetch_array();
    $conexion->close();
   ?>
   <input type="date" name="hoy" id="hoy" value="<?php echo $dia?>" hidden='hidden'>
   <div class="container-fluid">
    <div class="row">
      <div id="divFechaPagina" class="col-sm-12 text-right">
        <?php include '../diaSemana.php';
        setlocale(LC_TIME , 'es_MX.utf8');
        $fecha="";
        //$fecha="Hoy es ".strftime('%A')." ".date('d/M/Y');
        $fecha = "Hoy es ".fechaWinDia(strtoupper(strftime('%A',strtotime(date('Y/m/d')))))." ".date('d')."/".fechaWinMes(date('n'))."/".date('Y');
        echo "<span id='spanFechaPagina'>".$fecha."</span>";
        ?>
        <?php
         function fechaWinDia($diaSemana)
         {
           $diaSemanaIngles=array('SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY');
           $diaSemanaEspanol =array('DOMINGO','LUNES','MARTES','MIÉRCOLES','JUEVES','VIERNES','SÁBADO');
           for ($i=0; $i < count($diaSemanaEspanol); $i++) {
             if ($diaSemanaEspanol[$i]==$diaSemana) {
               return $diaSemanaEspanol[$i];
             }
           }
           for ($i=0; $i < count($diaSemanaIngles); $i++) {
             if ($diaSemanaIngles[$i]==$diaSemana) {
               return $diaSemanaEspanol[$i];
             }
           }
         }
         function fechaWinMes($mes)
         {
           $mesesEsp = array('enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre');
           return $mesesEsp[$mes-1];
         }
         ?>
      </div>
    </div>
  </div>
  <!-- Tablas de navegación-->
  <div class="container-fluid">
    <div class="row">
      <div role="tabpanel">
        <ul class="nav nav-pills nav-justified" role="tablist">
          <li role="presentation" class="active"><a href="#divNumOrden" aria-controls="divNumorden" role="tab" data-toggle="tab">NÚMERO DE ORDEN</a></li>
          <li role="presentation" ><a href="#divAsistencia" aria-controls="divAsistencia" role="tab" data-toggle="tab">ASISTENCIA</a></li>
          <li role="presentation" class=""><a href="#divCaptura" aria-controls="divCaptura" role="tab" data-toggle="tab">CAPTURA</a></li>
          <li role="presentation"><a href="#divRequerimientos" aria-controls="divRequerimientos" role="tab" data-toggle="tab">REQUERIMIENTOS</a></li>
          <li role="presentation"><a href="consultas.php">CONSULTAS <span class="glyphicon glyphicon-arrow-right" aria-hidden="true" id="iconRowRigh"></span></a></li>
        </ul>
        <br>
        <div class="tab-content">
          <!--Aquí empieza el tab de número de parte-->
          <!--Cambiar cuando termine con las otras pestañas
          <div role="tabpanel" class="tab-pane fade in active" id="divNumOrden">-->
          <!-- <div role="tabpanel" class="tab-pane fade" id="divNumOrden"> -->
          <div role="tabpanel" class="tab-pane fade in active" id="divNumOrden">
            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="post" id="formNumOrden">
              <div class="container-fluid well">
                <div class="row">
                    <div class="col-xs-2 text-center"><label>Folio</label></div>
                    <div class="col-xs-2 text-center"><label>Número de Parte</label></div>
                    <div class="col-xs-2 text-center"><label>Rate NP</label></div>
                    <div class="col-xs-2 text-center"><label>Parcial</label></div>
                    <div class="col-xs-2 text-center"><label><abbr title="Requerimiento">REQ</abbr></label></div>
                    <div class="col-xs-2 text-center"><label>Fecha Requerimiento</label></div>
                </div>
                <div class="row">
                  <div class="col-xs-2 text-center "><input class="form-control" name="numOrden" id="inpNumOrden"required type="number" autofocus value="<?php
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
                  <div class="col-xs-2 text-center"><input min="0" value="0" class="form-control" id="rateNumP" name="rateNumP" type="number" disabled/></div>
                  <div class="col-xs-2 text-center"><input min="0" value="0" class="form-control" id="inpParcial" name="parcial" required type="number" disabled/></div>
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
                      <label for="">De: </label><input type="date" name="fechIni"class="form-control" id="inpFechIni" value="<?php
                        $diaAnterior=strtotime('-1 day',strtotime($dia));
                        $diaAnterior=date('Y-m-d',$diaAnterior);
                        echo $diaAnterior;?>">
                    </div>
                    <div class="col-sm-2">
                      <label for="">Hasta: </label><input type="date" name="fechFin"class="form-control" id="inpFechFin" value="<?php echo $dia?>">
                    </div>
                    <div class="col-sm-2">
                      <label for="button">Click</label>
                      <input type="submit" name="" class="form-control" value="Mostrar" id="btnMostrarNumOrden">
                    </div>
                    <div class="col-sm-2">
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
                  <h2 class="text-center h2Tit">Agregar fecha de asistencia</h2>
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
                      <h2 class="text-center h2Tit">Agregar empleados a lista de  asistencia</h2>
                      <form class="" id="formListAsis"action="#" method="post">
                        <input type="date" class="form-control" name="inpFeAsis" id="inpFeAsis" required value="<?php echo $dia;?>">
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
          <div role="tabpanel" class="tab-pane fade" id="divCaptura">
            <!--Pestañas o tabs de la captura-->
            <ul class="nav nav-tabs" id="uLTabCaptura">
              <li><a href="#tabAsigNumOrden" data-toggle="tab">Asignar Número de Empleado a Número de Orden</a></li>
              <li><a href="#capNumOrd" data-toggle="tab">Captura Numero Orden</a></li>
              <li class="active"><a href="#capNumEmp" data-toggle="tab">Captura Numero de Empleado</a></li>
              <li><a href="#busquedaCap" data-toggle="tab">Captura Numero de Empleado</a></li>
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
                    <div id="divChBoxNumParte" class="col-md-8 col-md-offset-1 container-fluid form-inline">
                      <input type="checkbox"  name="chMostrarNumParte" id="chMostrarNumParte" ><span>Ver Número de parte</span>
                      <input type="text" class="form-control" id="inpBNONP" placeholder="Ingresa #Orden o #Parte"/>
                      <input type="button" class="btn btn btn-success form-control"id="btnBNONP" class="" value="Buscar">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 col-md-offset-3" id="divListNumOrden">
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="capNumOrd">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-12 col-xs-12 text-center">
                        <form action="" id="formListNO" class="">
                          <div style="display:inline-flex">
                            <div id="divFormNOB">
                              <label for="">De:</label>
                              <div id="feNOI"></div>
                            </div>
                            <div id="divFormNOB2">
                              <label for="">Hasta:</label>
                              <div id="feNOF"></div>
                            </div>
                            <div id="divFormNOB3">
                              <input type="submit" name="inpFeNO" id="inpFeNO" value="Buscar" class="btn btn-default form-control"/>
                            </div>
                          </div>
                        </form>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 col-xs-12 text-center">
                      <h4>Fecha Detalle Asistencia</h4>
                      <div id="fecDetAsis"></div>
                    </div>
                  </div>
                </div>
                <div class="col-md-8 col-md-offset-2 container-fluid">
                  <h2 class="text-center">Lista Numero de Ordenes</h2>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="table-responsive">
                        <table id="tablaCaptura"class="table table-bordered table-condensed table-responsive">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>FECHA</th>
                              <th>No. de Orden</th>
                              <th>No. de Parte</th>
                              <th>Estatus</th>
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
                              $consulta="select nm.idnum_orden, nm.num_parte, nm.fecha, nm.STATUS FROM num_orden nm, num_parte np WHERE nm.fecha BETWEEN '".$diaAyer."' and '".$diaManana."' and nm.num_parte=np.num_parte and nm.STATUS='PRODUCCION' ORDER BY nm.fecha_generada DESC";
                              $resultado=$conexion->query($consulta);
                              if (!$resultado) {
                                echo "Error:($conexion->errno)"."$conexion->error";
                                exit();
                              }
                              $contador=1;
                              while ($fila=$resultado->fetch_array()) {
                                  echo '<tr><td>'.$contador.'</td>';
                                  echo '<td class="tdFecha">'.$fila['fecha'].'</td>';
                                  echo '<td class="tdCapNumOrd">'.$fila['idnum_orden'].'</td>';
                                  echo '<td class="tdCapNumPart">'.$fila['num_parte'].'</td>';
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
                          <th>minTM</th>
                          <th>hrsTrab</th>
                          <th>07-08</th>
                          <th>08-09</th>
                          <th>09-10</th>
                          <th>10-11</th>
                          <th>11-12</th>
                          <th>12-13</th>
                          <th>13-14</th>
                          <th>14-15</th>
                          <th>15-16</th>
                          <th>16-17</th>
                          <th>17-18</th>
                          <th>18-19</th>
                          <th hidden="hidden">20-21</th>
                          <th hidden="hidden">21-22</th>
                          <th hidden="hidden">22-23</th>
                          <th hidden="hidden">23-00</th>
                          <th hidden="hidden">00-01</th>
                          <th hidden="hidden">01-02</th>
                          <th hidden="hidden">02-03</th>
                          <th hidden="hidden">03-04</th>
                          <th hidden="hidden">04-05</th>
                          <th hidden="hidden">05-06</th>
                          <th hidden="hidden">06-07</th>
                        </tr>
                      </thead>
                      <tbody id="tBodyCapNumEmp">

                      </tbody>
                    </table>
                  </div>
                </div>
              </div><!--Aquí termina el tab de capNumEmp-->
              <!--Aquí empieza el tab del id=busquedaCap-->
              <div class="tab-pane fade" id="busquedaCap">
                <div class="col-md-12">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="form-inline">
                        <h5>Buscar empleado en Número de Orden</h5>
                        <label for=""># empleado</label>
                        <input type="text" class='form-control' name="" id="idEmplB" value="" placeholder="# empleado">
                        <input type="date" class='form-control' name="" id="" value="<?php echo $dia?>">
                        <input type="button" class='form-control btn btn-primary' name="" id=""value="Buscar">
                        <h5>Buscar número de parte o de orden</h5>
                        <input type="text" class='form-control' name="" id="" value="">
                        <input type="date" class='form-control' name="" id="" value="<?php echo $dia?>">
                        <input type="button" class='form-control btn btn-primary' name="" id=""value="Buscar">
                      </div>
                    </div>
                    <div class="row">
                      <table class="table table-bordered" id="tablaBusqueda">
                        <caption>Captura</caption>
                        <thead>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                    </div>
                    <!--Aquí termina la fila o el div con clase row-->
                  </div>
                  <!--Aquí termina el container-fluid-->
                </div>
                <!--Aquí termina la columna tamaño md-12-->
              </div>
              <!--Aquí termina el tab de busquedaCap-->
            </div>
            <!-- Aquí termina el contenido de la pestaña o tab -->
          </div>
          <!--Aquí termina el tab de captura -->
          <!--Aquí empieza el tab de Requerimientos-->
          <div role="tabpanel" class="tab-pane fade" id="divRequerimientos">
            <div class="row">
              <div class="container-fluid">
                <div class="col-sm-12">
                  <table class="compact display" id="tablaReq" cellspacing="0" width="100%">
                    <caption>Requerimientos <span id="diaReq"></span></caption>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Folio</th>
                        <th>Número de parte</th>
                        <th><abbr title="Requerimiento">Req</abbr></th>
                        <th>Parcial</th>
                        <th><abbr title="Piezas a producir">PaP</abbr></th>
                        <th>Producido</th>
                        <th>Balance</th>
                        <th>Porcentaje</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!--Aquí termina el tab de requerimientos -->

        </div>
      </div>
    </div>
  </div>
  <!--  Modal para la captura de número de orden -->
  <div class="modal fade" id="modCapNumOrd" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" data-dismiss="modal" class="close">&times</button>
          <h4 class="text-center">Captura por número de orden</h4>
        </div>
        <div class="modal-body">
          <div class="row" id="divNMNP">
            <div class="col-md-12">
              <div class="col-md-5"><span id="spanNOMC">Número de Orden: </span></div>
              <div class="col-md-7"><span id="spanNPMC">Número de Parte: </span></div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 col-md-offset-2" id="">
              <h4 class="text-center">ASIGNAR EMPLEADO A FOLIO</h4>
              <div id="divFechaCapEmpleados"></div>
              <input placeholder="# de empleado" autocomplete="off" class="form-control inpAgrNEmpNOrd" name="inpAgrNEmpNOrd">
              <input type="button" class="btn-primary form-control inpAnadirEmp" value="Agregar" data-toggle="popover">
              <br>
            </div>
            <div class="col-md-8 col-md-offset-2" id="">
              <h4 class="text-center">CAPTURA EMPLEADOS POR HORA</h4>
              <input style="" type="button" class="btn-success form-control capturaPorHora" value="CAPTURA"/>
              <br>
              <div id="contenedorVentana">
                <div id="ventanaCapPorHora">
                  <div>Captura</div>
                  <div>
                    <header id="cabeceraVenCapPorHora">
                      <span>Folio: <span id='folioVenCap'></span></span>
                      <span>Número de parte: <span id="numParteVenCap"></span></span>
                      <span>Rate: <span id="rateNumParteVenCap"></span></span>
                      <span>Hora estimada terminada: <span id="horaEstVenCap"></span></span>
                      <div class="col-sm-12">
                        <input class="inpNumParteCap" name="inpNumParteCap" autocomplete="off">
                        <span>Rate:<span id="spanRateCap">800</span></span>
                        <span>Fecha:</span><div id="divFechaCapPost"></div>
                        <input type="button" class="btn btn-primary"value="Número de Parte Original" id="btnResetNumParte">
                      </div>
                    </header>
                    <table class="table table-bordered display compact" id="tablaCapPorHora">
                      <caption class="text-center">Captura</caption>
                      <thead>
                        <tr>
                          <th># Empleado</th>
                          <th hidden="hidden">idDetLista</th>
                          <th hidden="hidden">idDetAsis</th>
                          <th>Nombre</th>
                          <th>TM</th>
                          <th>HR</th>
                          <th data-H='7'>7-8</th>
                          <th data-H='8'>8-9</th>
                          <th data-H='9'>9-10</th>
                          <th data-H='10'>10-11</th>
                          <th data-H='11'>11-12</th>
                          <th data-H='12'>12-13</th>
                          <th data-H='13'>13-14</th>
                          <th data-H='14'>14-15</th>
                          <th data-H='15'>15-16</th>
                          <th data-H='16'>16-17</th>
                          <th data-H='17'>17-18</th>
                          <th data-H='18'>18-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>D-1220</td>
                          <td hidden="hidden">400</td>
                          <td hidden="hidden">300</td>
                          <td>Alejandra</td>
                          <td>0</td>
                          <td>0</td>
                          <td><span>80.76</span><br><span>CC</span><br><span>TM</span></td>
                          <td>800<br><span>CI</span></td>
                          <td>400</td>
                          <td>400</td>
                          <td>400</td>
                          <td>800</td>
                          <td>700</td>
                          <td>600</td>
                          <td>400</td>
                          <td>800</td>
                          <td>700</td>
                          <td>600</td>
                        </tr>
                        <tr>
                          <td>D-1229</td>
                          <td hidden="hidden">400</td>
                          <td hidden="hidden">300</td>
                          <td>Griselda</td>
                          <td>0</td>
                          <td>0</td>
                          <td>57.9</td>
                          <td>90.8</td>
                          <td>98.7</td>
                          <td>98.7</td>
                          <td>98.7</td>
                          <td>96.0</td>
                          <td>78.0</td>
                          <td>89.5</td>
                          <td>55.9</td>
                          <td>66.0</td>
                          <td>88.9</td>
                          <td>78.9</td>
                        </tr>
                      </tbody>
                    </table>
                    <input class="btn btn-danger" type="button" id="inpCancelVentana" value="CERRAR" />
                    <div id="divVentanaCapHora">
                      <div>Título</div>
                      <div>
                        <form class="" id="formCapPorHora">
                          <span>Número Empleado: <span id="spanNumEmpleadoCap"></span></span>
                          <span>Hora: <span id="spanHoraCap"></span></span>
                          <span>Número Parte: <span id="spanNumParteCap"></span></span>
                          <span>Rate: <span id="spanRateCap2"></span></span>
                          <label for="cantidadEmp">Cantidad</label>
                          <input class="form-control "type="text" placeholder="Cantidad" name ="cantidadEmp" id="cantidadEmp" required="true" />
                          <label for="tPar"><abbr title="Minutos Trabajados">MT</abbr></label>
                          <input class="form-control "type="text" placeholder="Tiempo Parcial" name="tPar" id="tPar"/>
                          <label for="tmMinCap"><abbr title="Tiempo Muerto">TM</abbr></label>
                          <input type="text" id ="tmMinCap" name="tmMinCap" value="0" class="form-control" readonly="true" />
                          <label for="eficienciaCap">Eficiencia</label>
                          <input type="text" id="eficienciaCap" value="0" class="form-control" readonly="true" />
                          <input class="form-control btn btn-success"type="button"  value="Tiempo Muerto" id="tmCap"/>
                          <input type="submit" class="form-control btn btn-info" value="CAPTURAR" id="btnCapPorHora"/>
                        </form>
                        <div id="divTMVentana">
                          <div>Tiempo Muerto</div>
                          <div>
                            <div class="col-xs-12 container-fluid">
                              <div class="row">
                                <div class="col-xs-6">
                                  <div class="copiaTM">
                                    <label for=""><abbr title="Tipo tiempo Muerto">TTM</abbr></label>
                                    <input type="text" class="form-control ttMCap" list="listTM">
                                    <datalist id="listTM">
                                    </datalist>
                                    <label for="">minutos</label>
                                    <input type="text" class="form-control minttMCap">
                                  </div>
                                </div>
                                <div class="col-xs-6">
                                  <span>¿Deseas agregar otro tiempo muerto?</span>
                                  <select id="cantTTM">
                                    <option value="1" selected="true">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </div>
                              </div>
                              <div class="row text-center">
                                <br>
                                <input type="button" class="btn btn-primary" value="ACEPTAR" id="btnAceptarTM">
                                <input type="button" class="btn btn-danger" value="CANCERLAR" id="btnCancelTM">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div><!--Fin del div ventana divVentanaCapHora-->
                  </div>
                </div>
              </div>
              <div id="capturaPersona"></div>
            </div>
            <div class="col-md-8 col-md-offset-2" id="divColListEmp"></div>
          </div>
        </div>
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
            <span id='spanNumEmp'></span>
            <span id='spanIdDLNOC'></span>
            <span id='spanNumOrdenC'></span>
            <span id='spanNumParteC'></span>
            <form id='formCaptura' class="form-inline" action="#" method="post" role="form">
              <div class="form-group">
                <label for="fechaC">Fecha</label>
                <input type="date" id="fechaC"name="fechaC" value="" class="form-control">
              </div>
              <div class="form-group">
              <label for="cantidadC">Cantidad</label>
              <input type="number" id="cantidadC" name="cantidadC" min="0" value="0" class="form-control" autofocus required>
              </div>
              <label for="horaInicioC">Hora Inicio<input type="text" id='horaInicioC' name="horaInicioC"  autocomplete="off" class="form-control" required></label>
              <label for="horaFinalC"></label>Hora Final<input type="text" id="horaFinalC" name="horaFinalC" autocomplete="off" class="form-control" required>
              <div class="form-group">TTM
                <label>
                  <input type="radio" id='tm1'name="tm" value="no" required checked="checked"/>No
                </label>
                <label>
                  <input type="radio" id='tm2'name="tm" value="si" required>Si
                </label>
              </div>
              <!-- <label for="">No<input type="radio" name="tiempo" value="No"></label>
              <label for="">SI<input type="radio" name="tiempo" value="Si"></label> -->
              <div class="form-group">
                <label for="">Tiempo Muerto</label>
                <input type="number" name="tmC" id='tmC'value="0" class="form-control" required readonly>
              </div>
              <label for="">Eficiencia<input type="text" name="eficienciaC" id='eficienciaC'value="" class="form-control" required readonly></label>
              <div class="row">
                <div class="col-md-12">
                  <input type="submit" name="capturarC" id="capturarC" value="CAPTURAR" class="form-control btn btn-default btn-block disabled" disabled>
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
            <input class="btn btn-default form-control" type="button" name="btnEliminarTTM" value="Eliminar" id="btnEliminarTTM">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnTM">Guardar</button>
            <button type="button" class="btn btn-default" data-dismiss='modal' id="btnCanTTM">Cancelar</button>
          </div>
        </div>
      </div>
    </div><!--Fin modal Tiempo Muerto-->
    <!--Modal Tiempo Detalle Captura-->
    <div class="col-xs-12">
      <div class="modal fade" tab-index="-1" role="dialog" id="modDetCap">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" data-dismiss="modal" class="close">&times</button>
              <h4>Detalle Captura Numero de orden: <span id="spanNO"></span> y numero de parte: <span id="spanNP"></span> </h4>
            </div>
            <div class="modal-body">
              <div class="col-sm-12">
                <table class="table table-bordered compact display" id="tablaDetCap">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th><abbr title="Id Captura">idc</abbr></th>
                      <th>fecha</th>
                      <th><abbr title="Número de empleado"># empl</abbr></th>
                      <th><abbr title="Hora Inicio">HI</abbr></th>
                      <th><abbr title="Hora Final">HF</abbr></th>
                      <th><abbr title="Tiempo Muerto">TM</abbr></th>
                      <th>Eficiencia</th>
                      <th>cantidad</th>
                      <th>H Captura</th>
                      <th>idDetAsis</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss='modal' id="btnCanTTM">Cerrar</button>
            </div>
          </div>
        </div>
      </div><!--Fin modal Detalle captura-->
    </div>
    <!--Modal Editar Captura-->
    <div class="col-xs-12">
      <div class="modal fade" tab-index="-1" role="dialog" id="modEditCap">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" data-dismiss="modal" class="close">&times</button>
              <h4>Detalle Captura Numero de orden: <span id="spanNO"></span> y numero de parte: <span id="spanNP"></span> </h4>
            </div>
            <div class="modal-body">
              <table class="table table-bordered compact display" id="tablaEditCap">
                <thead>
                  <tr>
                    <th>#</th>
                    <th><abbr title="Id Captura">idC</abbr></th>
                    <th><abbr title="Número de empleado"># Emp</abbr></th>
                    <th style="width:11%;">Fecha</th>
                    <th style="width:15%;">Cantidad</th>
                    <th style="width:20%">Hora I</th>
                    <th style="width:20%">Hora F</th>
                    <th><abbr title="TiempoM">Tm</abbr></th>
                    <th><abbr title="Eficiencia">Efi</abbr></th>
                    <th>Guardar</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <div class="text-center" id="divTmEC" hidden="hidden">
                <div class="tableTMEC text-center">
                </div>
                <div class="form-group form-inline divFormTTM">
                  <input placeholder="tipo tiempo muerto" class="form-control inpTMEC" list="dLTMEC" name="inpTiempoMuerto" autocomplete="off">
                  <datalist id="dLTMEC">
                    <option value="option">option</option>
                  </datalist>
                  <input placeholder="Minutos" type="number" min="0" name="inpMinEC" class="form-control inpMinEC" value="0">
                </div>
                <input class="btn btn-default" type="button" name="btnATMEC" value="Agregar" id="btnATMEC"/>
                <input class="btn btn-default" type="button" name="btnGuardarEC" value="Ocultar" id="btnGuardarEC"/>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss='modal' id="">Cerrar</button>
            </div>
          </div>
        </div>
      </div><!--Fin Modal Editar Captura-->
    </div>
    <div id="jqxNotiModCap">
      <div id="divNotificaciones"></div>
    </div>
    <!-- <div id="jqxErrorConexion">
      <div id="divNotificaciones"></div>
    </div> -->
    <div id="jqxError2ModCap"></div>
    <div id="jqxError3ModCap"></div>
    <div id="divVentanaModalConfirm"></div>
    <div id="divVentanaPre">
      <div>
        <img src="../../images/signo.jpg" alt="No se encontró la imagen" width="14" height="14"/><span>Pregunta</span>
      </div>
      <div>
        <p>¿Quieres ver las capturas realizadas de esta hora?</p>
        <input class="btn" type="button" id="btnAcepVenPre" value="Aceptar"/>
      </div>
    </div>
    <div id="divVenCapHoraEmp">
      <div>
        Ventana Capturas por Hora
      </div>
      <div>
        <div class="contenidoVenCapHEmp">
          <table class="table table-bordered" id="tablaConCap">
            <thead>
              <tr>
                <th class="numCap"># Cap</th>
                <th class="fechaCap">Fecha</th>
                <th class="numEmpCap"># Empleado</th>
                <th class="nomEmpCap">Nombre</th>
                <th class="numOrdCap"># Orden</th>
                <th class="numParteCap"># parte</th>
                <th class="rateCap">rate</th>
                <th class="hiCap"><abbr title="Hora Inicio">HI</abbr></th>
                <th class="hfCap"><abbr title="Hora Final">HF</abbr></th>
                <th class="efiCap">Eficiencia</th>
                <th class="cantidadCap">Cantidad</th>
                <th class="tiempoMCap"><abbr title="Tiempo Muerto">TM</abbr></th>
                <th class="numUsuCap"># Usu</th>
                <th class="nombreUsuCap"><abbr title="Nombre Usuario">NU</abbr></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="divVenPrePar">
      <div>
        <img src="../../images/signo.jpg" alt="No se encontró la imagen" width="14" height="14"/><span>Pregunta</span>
      </div>
      <div>
        <p>¿Qué deseas hacer?</p>
        <input class="btn" type="button" id="btnCapPar" value="CAPTURAR"/>
        <input class="btn" type="button" id="btnVerCapPar" value="VER CAPTURA PARCIAL"/>
      </div>
    </div>
    <div id="divVentanaCapHoraPar">
      <div>Captura Parcial</div>
      <div>
        <form class="" id="formCapPorHoraPar">
          <span># Empleado: <span id="spanNumEmpleadoCapPar"></span></span>
          <span>Hora: <span id="spanHoraCapPar"></span></span>
          <span># Parte: <span id="spanNumParteCapPar"></span></span>
          <span>Rate: <span id="spanRateCap2Par"></span></span><br>
          <span>Hora Inicio: <span id="horaIPar"></span></span><br>
          <label for="cantidadEmpPar">Cantidad</label>
          <input class="form-control "type="text" placeholder="Cantidad" name ="cantidadEmpPar" id="cantidadEmpPar"/>
          <label for="tParPar"><abbr title="Minutos Trabajados">MT</abbr></label>
          <input class="form-control "type="text" placeholder="Tiempo Parcial" name="tParPar" id="tParPar"/>
          <label for="tmMinCapPar"><abbr title="Tiempo Muerto">TM</abbr></label>
          <input type="text" id ="tmMinCapPar" name="tmMinCapPar" value="0" class="form-control" readonly="true" />
          <label for="eficienciaCapPar">Eficiencia</label>
          <input type="text" id="eficienciaCapPar" value="0" class="form-control" readonly="true" />
          <input class="form-control btn btn-success" type="button"  value="Tiempo Muerto" id="tmCapPar"/>
          <input type="submit" class="form-control btn btn-info" value="CAPTURAR" id="btnCapPorHoraPar"/>
        </form>
        <div id="divTMVentanaPar" hidden>
          <div>Tiempo Muerto</div>
          <div>
            <div class="col-xs-12 container-fluid">
              <div class="row">
                <div class="col-xs-6">
                  <div class="copiaTMPar">
                    <label for=""><abbr title="Tipo tiempo Muerto">TTM</abbr></label>
                    <input type="text" class="form-control ttMCapPar" list="listTMPar">
                    <datalist id="listTMPar">
                    </datalist>
                    <label for="">minutos</label>
                    <input type="text" class="form-control minttMCapPar">
                  </div>
                </div>
                <div class="col-xs-6">
                  <span>¿Deseas agregar otro tiempo muerto?</span>
                  <select id="cantTTMPar">
                    <option value="1" selected="true">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div class="row text-center">
                <br>
                <input type="button" class="btn btn-primary" value="ACEPTAR" id="btnAceptarTMPar">
                <input type="button" class="btn btn-danger" value="CANCERLAR" id="btnCancelTMPar">
              </div>
            </div>
          </div>
        </div>
      </div>
     </div><!--Fin del div ventana divVentanaCapHora-->
     <div id="venEditNM">
       <div>Editar Número de Orden (FOLIO)</div>
       <div>
         <table id="tablaEditNM" class="table table-bordered table-condensed table-responsive">
           <thead>
             <tr>
               <th>Folio</th>
               <th># parte</th>
               <th><abbr title="Cantidad Requerimiento">CR</abbr></th>
               <th>Fecha Req.</th>
               <th><abbr title="Fecha y hora generada">Fecha y Hora</abbr></th>
               <th><abbr title="Número de Usuario">NM</abbr></th>
               <th>nombre Usuario</th>
               <th>Acción</th>
             </tr>
           </thead>
           <tbody></tbody>
         </table>
       </div>
     </div>
     <div id="venConf" style="display:none">
       <!-- Si vamos a modificar el contenido de esta ventana hay que modificar una condición el archivo de produccion.js en la funcion crearVenConfig() -->
       <div>Confirmación</div>
       <div>
         <div id="conDivVenConf"></div>
         <input type='button' class="btn btn-danger" id="btnOK" value="Aceptar"/>
         <input type="button" class="btn btn-primary" id="btnCAN" value="Cancelar"/>
       </div>
     </div>
  <!--importar los scripts de la ruta www/js -->
  <?php include '../scriptsPiePag.php'; ?>
  <script src="../../js/jquery.dataTables.min.js" charset="utf-8"></script>
  <script src="../../js/jquery.timeAutocomplete.js" type="text/javascript"></script>
  <script src="../../js/formatters/24hr.js" type="text/javascript"></script>
  <script src="../../js/formatters/ampm.js" type="text/javascript"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxcore.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxnotification.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxwindow.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxdatetimeinput.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxcalendar.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxtooltip.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/globalization/globalize.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/globalization/globalize.culture.es.js"></script>
  <script type="text/javascript" src="../../js/produccion.js"></script>
  <script type="text/javascript" src="js/captura.js">
  </script>
  <script type="text/javascript" src="js/asistencia.js">
  </script>
</body>
</html>
