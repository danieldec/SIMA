<!DOCTYPE html>
<html lang="es">
<head>
  <?php session_start();
    if ($_SESSION['perfil']!='ing') {
      header("Location:../../");
      session_destroy();
      exit;
    }
    $dia=date("Y-m-d");
   ?>
  <meta charset="UTF-8">
  <title>Ingeniería</title>
  <!-- importar hojas de estilo que estan en la ruta www/css y del admin-->
  <?php include '../hojasEstilo.php'; ?>
  <link rel="stylesheet" href="../../css/jquery.dataTables.min.css" media="screen" charset="utf-8">
  <link rel="stylesheet" href="../../css/styles/jqx.base.css" />
  <link rel="stylesheet" href="../../css/rh.css" charset="utf-8">
</head>
<body>
  <!--Barra de navegación-->
  <?php include '../nav.php' ?>
  <input type="date" name="hoy" id="hoy" value="<?php echo $dia?>" hidden='hidden'>
  <!--Aquí esta mi menú en el área de materiales  -->
  <div class="container-fluid">
    <div class="row">
      <ul class="nav nav-tabs nav-justified">
        <li><a href="index.php">NÚMERO DE PARTE</a></li>
        <li class="active"><a href="reporte.php">CONSULTAS</a></li>
      </ul>
    </div>
  </div>
  <!--Aquí termina el menú del área de RH  -->
  <!--Aquí empieza el contenido de las pestañas de empleados, usuarios y reporte -->
  <div class="tab-content">
    <br>
    <!--Aquí empieza el contenido de la pestaña empleados-->
    <div class="tab-pane fade" id="divNumTabParte">
      <div class="row">
        <div class="container-fluid">
        </div>
      </div>
      <br>
      <div class="row">
       <div class="container-fluid">
       </div>
      </div>
    </div>
    <!--Aquí termina el contenido de la pestaña empleados-->

    <!--Aquí empieza el contenido de la pestaña de reporte -->
    <div class="tab-pane fade in active" id="divTabreporte">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 col-xs-12">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <form action="" id="formConPar">
                  <fieldset>
                    <legend>Capturas por número de parte</legend>
                    <label for="">fecha</label>
                    <div id="divFeI"></div>
                    <label for="">fecha</label>
                    <div id="divFeF"></div>
                    <input type="submit" value="buscar">
                  </fieldset>
                </form>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, reiciendis iste libero culpa nisi ducimus amet alias quam ipsam, illum impedit quo aperiam quas sunt labore magni, facilis tempora veniam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  <!--Aquí termina el contenido de las pestañas de empleados, usuarios y reporte -->
  <div id="jqxNotIng">
    <div id="jqxNotIngContent"></div>
  </div>

  <!--importar los scripts desde la ruta www/js y los js de ing-->
  <?php include '../scriptsPiePag.php';?>
  <script src="../../js/jquery.dataTables.min.js" charset="utf-8"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxcore.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxnotification.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxwindow.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxdatetimeinput.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxcalendar.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/globalization/globalize.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/globalization/globalize.culture.es.js"></script>
  <script type="text/javascript" src="js/consulta.js"></script>
</body>
</html>
