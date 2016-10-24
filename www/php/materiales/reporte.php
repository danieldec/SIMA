<!DOCTYPE html>
<html lang="es">
<head>
  <?php session_start();
    if ($_SESSION['perfil']!='materiales') {
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
</head>
<body>
  <!--Barra de navegación-->
  <?php include '../nav.php' ?>
  <!--Aquí esta mi menú en el área de RH  -->
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
      <div>estoy en el contenido de reporte</div>
     </div>
  </div>
  <!--Aquí termina el contenido de las pestañas de empleados, usuarios y reporte -->

  <!--importar los scripts desde la ruta www/js y los js de rh-->
  <?php include '../scriptsPiePag.php';?>
  <script type="text/javascript" src="../../js/rh.js"></script>
</body>
</html>
