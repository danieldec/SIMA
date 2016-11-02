<!DOCTYPE html>
<html lang="es">
<head>
  <?php session_start();
    if ($_SESSION['perfil']!='gerencia') {
      header("Location:../../");
      session_destroy();
      exit;
    }
   ?>
  <meta charset="UTF-8">
  <title>Materiales</title>
  <!-- importar hojas de estilo que estan en la ruta www/css y del admin-->
  <?php include '../hojasEstilo.php'; ?>
  <link rel="stylesheet" href="../../css/rh.css" charset="utf-8">
  <link rel="stylesheet" href="../../css/jquery.dataTables.min.css" media="screen" charset="utf-8">
</head>
<body>
  <!--Barra de navegación-->
  <?php include '../nav.php' ?>
  <!--Aquí esta mi menú en el área de RH  -->
  <div class="container-fluid">
    <div class="row">
      <ul class="nav nav-tabs nav-justified">
        <li class="active"><a href="index.php">CAPTURA POR HORA</a></li>
        <li><a href="reporte.php">REPORTE NÚMERO DE ORDENES</a></li>
      </ul>
    </div>
  </div>
  <!--Aquí termina el menú del área de RH  -->
  <!--Aquí empieza el contenido de las pestañas de empleados, usuarios y reporte -->
  <div class="tab-content">
    <br>
    <!--Aquí empieza el contenido de la pestaña empleados-->
    <div class="tab-pane fade in active" id="boom">
      <!--tabla boom-->
      <div class="row" id="divTablaBoom">
        <div class="container-fluid">
          <div class="col-md-6 col-md-push-3 text-center" id="boomLista">
            <table class="table">
              <thead>
                <tr>
                  <th>idBoom</th>
                  <th>BinAct</th>
                  <th>Description</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!--Aquí termina el contenido de la pestaña empleados-->

    <!--Aquí empieza el contenido de la pestaña de reporte -->
    <div class="tab-pane fade" id="reporte">
      <div>estoy en el contenido de reporte</div>
     </div>
  </div>
  <!--Aquí termina el contenido de las pestañas de empleados, usuarios y reporte -->

  <!--importar los scripts desde la ruta www/js y los js de rh-->
  <?php include '../scriptsPiePag.php';?>
  <script src="../../js/jquery.dataTables.min.js" charset="utf-8"></script>
  <script type="text/javascript" src="../../js/materiales.js"></script>
</body>
</html>
