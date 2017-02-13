<!DOCTYPE html>
<html lang="es">
<head>
  <?php session_start();
    if ($_SESSION['perfil']!='produccion') {
      header("Location:../../");
      session_destroy();
      exit();
    }
  ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Consultas</title>
  <?php include '../hojasEstilo.php'; ?>
  <!--CSS de Libreria jqwidget-->
  <link type="text/css" rel="Stylesheet" href="../../css/styles/jqx.base.css" />
  <link rel="stylesheet" href="../../css/jquery.dataTables.min.css" media="screen" charset="utf-8">
  <link rel="stylesheet" href="../../css/buttons.dataTables.min.css" media="screen" charset="utf-8">
  <!-- archivo css creado por el desarrollador -->
  <link rel="stylesheet" href="css/consultas.css">
</head>
<body>
  <?php
    include '../nav.php';
    $dia=date("Y-m-d");
   ?>
   <input type="date" name="hoy" id="hoy" value="<?php echo $dia?>" hidden='hidden'>
   <div class="container-fluid">
    <div class="row">
      <div class="col-sm-2">
        <a href="index.php"><img src="../../public/img/backarrow.png" alt="Que chingados paso aquí xD" id="imgAtras"></a><span>Regresar</span>
      </div>
      <div id="divFechaPagina" class="col-sm-10 text-right">
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
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-6 col-md-6">
        <ul class="nav nav-tabs" id="ulTabConsulta">
          <li class="active"><a href="#articleTabEfiEmp" data-toggle="tab">Eficiencia por empleado</a></li>
          <li><a href="#articleTabRepEfi" data-toggle="tab">Reporte eficiencia</a></li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <section class="tab-content">
          <article id="articleTabEfiEmp" class="tab-pane fade in active">
            <form id="formEfiPorEmp">
              <fieldset>
                <legend>Buscar eficiencia</legend>
                <p>
                  <label class="radio-inline"><input type="radio" name="tipoBusE" value="numEmpB" id="numEmpB" required tabindex="1"><span>Número de empleado</span></label>
                  <label class="radio-inline"><input type="radio" name="tipoBusE"  value="nomEmpB" id="nomEmpB" required tabindex="2"><span>Nombre empleado</span></label>
                </p>
                <div style="display:inline-flex">
                  <p id="pOpEmp" hidden="hidden">
                    <label>
                      <input type="text" name="inpEmpABus" value="" id="inpEmpABus" required tabindex="3" disabled>
                    </label>
                  </p>
                  <p id="divFormNOB">
                    <label for="">De:<div id="feNOI"></div></label>
                  </p>
                  <p id="divFormNOB2">
                    <label for="">Hasta:</label>
                    <div id="feNOF"></div>
                  </p>
                  <p id="divFormNOB3">
                    <input type="submit" name="inpFeNO" id="inpFeNO" value="Buscar" class="btn btn-default form-control" tabindex="8"/>
                  </p>
                </div>
              </fieldset>
            </form>
            <div class="row">
              <div class="col-xs-12 col-md-12">
                <table id="tablaDetEfi" class="table table-bordered table-hover table-condensed table-responsive">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Núm Empleado</th>
                      <th>Nombre Completo</th>
                      <th>Eficiencia</th>
                      <th><abbr title="Total horas capturadas">Thcap</abbr></th>
                      <th><abbr title="Tiempo muerto">Tm</abbr></th>
                      <th><abbr title="Total horas trabajadas">Thtrab</abbr></th>
                      <th>detAsistencia</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </article>
          <article id="articleTabRepEfi" class="tab-pane fade">
            <div class="row">
              <div class="container-fluid">
                <div class="col-md-12 col-xs-12">
                  <div class="container-fluid">
                    <form action="" id="formBufi">
                      <fieldset>
                        <legend>Reporte Eficiencia</legend>
                        <label for="">Todo</label>
                        <input type="radio" name="tipoConsul" id="radTodo" checked value="t">
                        <label for="">por numero de empleado</label>
                        <input type="radio" name="tipoConsul" id="radEmp" value="e"><br>
                        <div id="divForm">
                          <div id="divNumEmp">
                            <label for="">Número de empleado</label>
                            <input type="text" id="inpNuEmp" disabled name="inpNuEmp" required>
                          </div>
                          <label for="">Fecha Inicio:</label>
                          <div id="divFechaI"></div>
                          <label for="">Fecha Final</label>
                          <div id="divFechaF"></div>
                        </div>
                        <input type="submit" value="Buscar" class="btn btn-default">
                      </fieldset>
                    </form>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-xs-12">
                    <div class="container-fluid">
                      <table class="table table-bordered table-condensed table-responsive display compact" id="tablaEfiCap" style="width:100%">
                        <thead></thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  </div>
  <div id="jqxNoti">
    <div id="divNotificaciones"></div>
  </div>
  <!--Ventana detalleCaptura-->
  <div id="venDetCap">
    <div>Detalle Captura</div>
    <div>
        <div class="row">
          <div class="container-fluid">
            <div class="col-md-12 col-xs-12">
              <table id="tablaDetCap" class="table table-bordered table-hover table-condensed table-responsive">
                <thead>
                  <tr>
                    <th><abbr title="id Captura">idC</abbr></th>
                    <th>fecha</th>
                    <th>#Emple</th>
                    <th>nombre completo</th>
                    <th>cantidad</th>
                    <th><abbr title="Hora inicio">Hi</abbr></th>
                    <th><abbr title="Hora final">Hf</abbr></th>
                    <th><abbr title="Tiempo muerto">tm</abbr></th>
                    <th><abbr title="Eficiencia">Efi</abbr></th>
                    <th>Folio</th>
                    <th>num_parte</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 col-xs-2"><input type="button" class="btn btn-danger" value="Cerrar" id="btnCeDetCap"></div>
        </div>
    </div>
  </div>
  <!--scripts de la pagina-->
  <?php include '../scriptsPiePag.php'; ?>
  <!--  librerias de datatables-->
  <script src="../../js/jquery.dataTables.min.js" charset="utf-8"></script>
  <script src="../../js/dataTables.buttons.min.js" charset="utf-8"></script>
  <script src="../../js/buttons.flash.min.js" charset="utf-8"></script>
  <script src="../../js/jszip.min.js" charset="utf-8"></script>
  <script src="../../js/pdfmake.min.js" charset="utf-8"></script>
  <script src="../../js/vfs_fonts.js" charset="utf-8"></script>
  <script src="../../js/buttons.html5.min.js" charset="utf-8"></script>
  <script src="../../js/buttons.print.min.js" charset="utf-8"></script>
  <!--  librerias jqwidget-->
  <script type="text/javascript" src="../../js/jqwidget/jqxcore.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxnotification.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxwindow.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxdatetimeinput.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxcalendar.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxtooltip.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/globalization/globalize.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/globalization/globalize.culture.es.js"></script>
  <script type="text/javascript" src="js/consultasPro.js"></script>
</body>
</html>
