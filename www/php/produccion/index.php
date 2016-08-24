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
    include 'asistencia.php';
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
  <!-- Tablas de navegación-->
  <input type="date" name="hoy" id="hoy" value="<?php echo $dia?>" hidden='hidden'>
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
            <div class="row">
              <div class="col-md-12 container-fluid">
                <div class="col-md-6">
                  <div class="row">
                    <h3 class="text-center">Asignar Número de Empleado a Número de Orden</h3>
                    <button class="btn-primary btn-lg" id="btnMosListNumOrden">Mostrar</button>
                  </div>
                  <div class="row">
                    <div id="divChBoxNumParte" class="col-md-12">
                      <input type="checkbox"  name="chMostrarNumParte" id="chMostrarNumParte" ><span>Mostrar Número de parte</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6" id="divListNumOrden">
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <h2 class="text-center">Lista Numero de Ordenes</h2>
                </div>
              </div>
            </div>
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


  <!--importar los scripts de la ruta www/js -->
  <?php include '../scriptsPiePag.php'; ?>
  <script type="text/javascript" src="../../js/produccion.js"></script>
</body>
</html>
