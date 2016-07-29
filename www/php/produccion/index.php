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
  <link rel="stylesheet" href="../../css/produccion.css" charset="utf-8">
</head>
<body>
  <!-- Barra de navegación y conexión base de datso-->
  <?php
    include '../nav.php';
    include '../conexion/conexion.php';
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
    $conexion->close();
   ?>
  <!-- Tablas de navegación-->
  <div class="container-fluid">
    <div class="row">
      <div role="tabpanel">
        <ul class="nav nav-pills nav-justified" role="tablist">
          <li role="presentation" class="active"><a href="#divNumOrden" aria-controls="divNumorden" role="tab" data-toggle="tab">NÚMERO DE ORDEN</a></li>
          <li role="presentation"><a href="#divAsistencia" aria-controls="divAsistencia" role="tab" data-toggle="tab">ASISTENCIA</a></li>
          <li role="presentation"><a href="#divCaptura" aria-controls="divCaptura" role="tab" data-toggle="tab">CAPTURA</a></li>
          <li role="presentation"><a href="#divRequerimientos" aria-controls="divRequerimientos" role="tab" data-toggle="tab">REQUERIMIENTOS</a></li>
        </ul>
        <br>
        <div class="tab-content">
          <!--Aquí empieza el tab de número de parte-->
          <div role="tabpanel" class="tab-pane fade in active" id="divNumOrden">
            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="post" id="formNumOrden">
              <div class="container-fluid well">
                <div class="row">
                    <div class="col-xs-3 text-center"><label>Número de Orden</label></div>
                    <div class="col-xs-3 text-center"><label>Número de Parte</label></div>
                    <div class="col-xs-3 text-center"><label>Cantidad</label></div>
                    <div class="col-xs-3 text-center"><label>Fecha</label></div>
                </div>
                <div class="row">
                  <div class="col-xs-3 text-center"><input disabled class="form-control" name="numOrden" id="inpNumOrden"required type="number" value="<?php
                  //Aquí vamos a insertar el último registro de el número de parte
                    if (isset($fila)) {
                      echo 1+$fila['id'];
                    }else{
                      echo '0';
                    }
                     ?>"/>
                  </div>
                  <div class="col-xs-3 text-center">
                    <input class="form-control" autocomplete="off" name="numParte" id="inpNumParte" required type="text"/>
                    <ul id="listaNumParte" class="list-unstyled">
                    </ul>
                  </div>
                  <div class="col-xs-3 text-center"><input min="0" value="0" class="form-control" id="inpCantReq"name="cantReq" required type="number"/></div>
                  <div class="col-xs-3 text-center"><input class="form-control" name="fNumOrden" id="inpFNumOrden"required type="date" value="<?php echo $dia?>"/></div>
                  <input type="text" name="numUsuario" id="inpNumUsuario" hidden="hidden"value="<?php echo $_SESSION['idusuario']; ?>">
                </div>
                <div class="row">
                  <div class="col-xs-6 col-xs-offset-3 text-center">
                    <input id="btnOrdPro"type="submit" class="text-center btn btn-primary" value="Generar Orden de producción">
                    <!-- Aquí se muestra los errores-->
                    <div id="mensajeBD">
                      <strong>ERROR: </strong><?php echo $errorConsulta; ?></div>
                  </div>
                </div>
              </div>
            </form>
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-12">
                  <div class="" id="registroOrden">

                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--Aquí acaba el tab de número de parte -->
          <!--Aquí empieza el tab de asistencia-->
          <div role="tabpanel" class="tab-pane fade" id="divAsistencia">
            <div class="row">
              <div class="container-fluid">
                <p>Estas en el tab de asistencia</p>
              </div>
            </div>
          </div>
          <!--Aquí termina el tab de asistencia| -->
          <!--Aquí empieza el tab de captura-->
          <div role="tabpanel" class="tab-pane fade" id="divCaptura">
            <div class="row">
              <div class="container-fluid">
                <p>Estas en el tab de captura</p>
              </div>
            </div>
          </div>
          <!--Aquí termina el tab de captura| -->
          <!--Aquí empieza el tab de captura-->
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


  <!--importar los scripts de la ruta www/js -->
  <?php include '../scriptsPiePag.php'; ?>
  <script type="text/javascript" src="../../js/produccion.js"></script>
</body>
</html>
