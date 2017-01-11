<!DOCTYPE html>
<html lang="es">
<head>
  <?php session_start();
    if ($_SESSION['perfil']!='entrenamiento') {
      header("Location:../../");
      session_destroy();
      exit;
    }
   ?>
  <meta charset="UTF-8">
  <title>Entramiento</title>
  <!-- importar hojas de estilo que estan en la ruta www/css y del admin-->
  <?php include '../hojasEstilo.php'; ?>
  <link rel="stylesheet" href="../../css/styles/jqx.base.css" type="text/css" />
  <link rel="stylesheet" href="../../css/styles/jqx.classic.css" type="text/css" />
  <link rel="stylesheet" href="../../css/styles/jqx.bootstrap.css" type="text/css" />
  <link rel="stylesheet" href="../../css/jquery.dataTables.min.css" media="screen" charset="utf-8">
  <link rel="stylesheet" href="../../css/buttons.dataTables.min.css" media="screen" charset="utf-8">
  <link rel="stylesheet" href="../../css/rh.css" charset="utf-8">
</head>
<body>
  <!--Barra de navegación-->
  <?php include '../nav.php' ?>
  <!--Aquí esta mi menú en el área de RH  -->
  <div class="container-fluid">
    <div class="row">
      <ul class="nav nav-tabs nav-justified">
        <li class="active"><a href="#reporte">REPORTE</a></li>
      </ul>
    </div>
  </div>
  <!--Aquí termina el menú del área de RH  -->
  <!--Aquí empieza el contenido de las pestañas de empleados, usuarios y reporte -->
  <div class="tab-content col-md-12 col-xs-12">
    <br>
    <!--Aquí empieza el contenido de la pestaña de reporte -->
    <div class="tab-pane fade in active" id="reporte">
      <div class="row">
        <div class="container-fluid">
          <div class="col-md-12 col-xs-12">
            <div class="container-fluid">
            <form action="" id="formRepEnt">
              <fieldset>
                <legend>REPORTE ENTRENAMIENTO</legend>
                <div class="fechasRepEnt">
                  <label for="divFechaIRE">Fecha Inicio:</label>
                  <div id="divFechaIRE"></div>
                </div>
                <div class="fechasRepEnt">
                  <label for="divFechaFRE">Fecha Final:</label>
                  <div id="divFechaFRE"></div>
                  <input type="submit" value="Buscar" class="btn btn-default">
                </div>
              </fieldset>
            </form>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 col-xs-12">
            <div class="container-fluid">
            <table class="table table-bordered" id="tablaRepEnt">
              <thead>
                <th># Empleado</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>hrs</th>
                <th>Número Parte</th>
              </thead>
              <tbody></tbody>
            </table>
            </div>
          </div>
      </div>
    </div>
  <div>
  <!--Aquí termina el contenido de las pestañas de empleados, usuarios y reporte -->
  <!-- Notificaciones de errores y exitos al momento de hacer una acción -->
  <div id="jqxNotE">
    <div id="jqxNotEContent"></div>
  </div>
  <!--Ventana para editar un EMPLEADOS :D-->

  <!--Aquí acaba la ventana para editar un EMPLEADO :D-->
  <!--importar los scripts desde la ruta www/js y los js de rh-->
  <?php include '../scriptsPiePag.php';?>
  <script src="../../js/jquery.dataTables.min.js" charset="utf-8"></script>
  <script src="../../js/dataTables.buttons.min.js" charset="utf-8"></script>
  <script src="../../js/buttons.flash.min.js" charset="utf-8"></script>
  <script src="../../js/jszip.min.js" charset="utf-8"></script>
  <script src="../../js/pdfmake.min.js" charset="utf-8"></script>
  <script src="../../js/vfs_fonts.js" charset="utf-8"></script>
  <script src="../../js/buttons.html5.min.js" charset="utf-8"></script>
  <script src="../../js/buttons.print.min.js" charset="utf-8"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxcore.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxdata.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxbuttons.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxscrollbar.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxmenu.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxlistbox.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxdropdownlist.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxgrid.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxgrid.selection.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxcheckbox.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxgrid.pager.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxgrid.sort.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxgrid.columnsresize.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxgrid.filter.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxgrid.grouping.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxdata.export.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxgrid.export.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxgrid.edit.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxnotification.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxwindow.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxdatetimeinput.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxcalendar.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/globalization/globalize.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/globalization/globalize.culture.es.js"></script>
  <script type="text/javascript" src="../../js/entrenamiento.js"></script>

</body>
</html>
