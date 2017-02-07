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
        $fecha = "Hoy es ".strtoupper(strftime('%A',strtotime(date('Y/m/d'))))." ".strftime('%d/%B/%Y',strtotime(date('Y/m/d')));
        echo "<span id='spanFechaPagina'>".$fecha."</span>";
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
                  <label class="radio-inline"><input type="radio" name="tipoBusE" value="numEmpB" required tabindex="1">Número de empleado</label>
                  <label class="radio-inline"><input type="radio" name="tipoBusE" value="nomEmpB" required tabindex="2">Nombre empleado</label>
                </p>
                <div style="display:inline-flex">
                  <p id="pOpEmp" hidden="hidden">
                    <label>Selecciona una opción
                      <input type="text" name="inpEmpABus" value="" id="inpEmpABus" required tabindex="3">
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
          </article>
          <article id="articleTabRepEfi" class="tab-pane fade">

          </article>
        </section>
      </div>
    </div>
  </div>
  <div id="jqxNoti">
    <div id="divNotificaciones"></div>
  </div>
  <!--scripts de la pagina-->
  <?php include '../scriptsPiePag.php'; ?>
  <script src="../../js/jquery.dataTables.min.js" charset="utf-8"></script>
  <script type="text/javascript" src="js/consultasPro.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxcore.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxnotification.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxwindow.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxdatetimeinput.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxcalendar.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxtooltip.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/globalization/globalize.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/globalization/globalize.culture.es.js"></script>
</body>
</html>
