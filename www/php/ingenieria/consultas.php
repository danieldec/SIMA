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
  <title>Materiales</title>
  <!-- importar hojas de estilo que estan en la ruta www/css y del admin-->
  <?php include '../hojasEstilo.php'; ?>
  <link rel="stylesheet" href="../../css/jquery.dataTables.min.css" media="screen" charset="utf-8">
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
        <li><a href="index.php">BOOM</a></li>
        <li class="active"><a href="reporte.php">REPORTE</a></li>
      </ul>
    </div>
  </div>
  <!--Aquí termina el menú del área de RH  -->
  <!--Aquí empieza el contenido de las pestañas de empleados, usuarios y reporte -->
  <div class="tab-content">
    <br>
    <!--Aquí empieza el contenido de la pestaña empleados-->
    <div class="tab-pane fade" id="boom">
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
    <div class="tab-pane fade in active" id="reporte">
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
                <tr>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </div>
  <!--Aquí termina el contenido de las pestañas de empleados, usuarios y reporte -->

  <!--importar los scripts desde la ruta www/js y los js de rh-->
  <?php include '../scriptsPiePag.php';?>
  <script src="../../js/jquery.dataTables.min.js" charset="utf-8"></script>
  <script type="text/javascript" src="../../js/materiales.js"></script>
</body>
</html>
