<!DOCTYPE html>
<html lang="es">
<head>
  <?php session_start();
    if ($_SESSION['perfil']!='ing') {
      header("Location:../../");
      session_destroy();
      exit;
    }
   ?>
  <meta charset="UTF-8">
  <title>Ingeniería</title>
  <!-- importar hojas de estilo que estan en la ruta www/css y del admin-->
  <?php include '../hojasEstilo.php'; ?>
  <link rel="stylesheet" href="../../css/jquery.dataTables.min.css" media="screen" charset="utf-8">
  <link rel="stylesheet" href="../../css/styles/jqx.base.css" />
  <link rel="stylesheet" href="../../css/ing.css" charset="utf-8">
</head>
<body>
  <!--Barra de navegación-->
  <?php include '../nav.php' ?>
  <!--Aquí esta mi el tab de ingenieria -->
  <div class="container-fluid">
    <div class="row">
      <ul class="nav nav-tabs nav-justified">
        <li class="active"><a href="index.php">NÚMERO DE PARTE</a></li>
        <li><a href="consultas.php">CONSULTAS</a></li>
      </ul>
    </div>
  </div>
  <!--Aquí termina el tab de ingeniería  -->
  <!--Aquí empieza el contenido de las pestañas núm parte y consultas-->
  <div class="tab-content">
    <br>
    <!--Aquí empieza el contenido de la pestaña num parte-->
    <div class="tab-pane fade in active" id="divNumTabParte">
      <!--tabla boom-->
      <div class="row">
      	<div class="container-fluid">
      		<div class="col-xs-1 col-md-1 col-xs-offset-3 col-md-offset-3">
      		<button type="button" class="btn btn-default" id="btnAgregarNumP">Agregar
      			<span class="glyphicon glyphicon-plus"></span>
      		</button>
      		</div>
      	</div>
      </div>
      <br>
      <div class="row" id="divRowNumParte">
        <div class="container-fluid">
          <div class="col-md-6 col-md-push-3 text-center" id="divColNumParte">
            <table class="table hover" id="numParteTabla">
              <thead>
                <tr>
                  <th>#</th>
                  <th># de parte</th>
                  <th>Rate</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!--Aquí termina el contenido de la pestaña num parte-->

    <!--Aquí empieza el contenido de la pestaña de consultas -->
    <div class="tab-pane fade" id="reporte">
      <div>estoy en el contenido de reporte</div>
     </div>
  </div>
  <!--Aquí termina el contenido de las pestañas de consultas-->
  <div id="jqxNotIng">
    <div id="jqxNotIngContent"></div>
  </div>
  <!--Ventana para agregar un número de parte :D-->
  <div id="venAltaNumParte">
  	<div>Altas número de parte</div>
  	<div>
  		<div class="col-xs-12 col-md-12">
  			<form id="formNumParte">
          		<div class="form-group">
          			<label for="numParte">Número de Parte: </label>
            		<input class="form-control" type="text" name="numParte" id="numParte" placeholder="Número de parte" required autofocus="true" />
            	</div>
            	<div class="form-group">
            		<label for="rateNumParte">Rate: </label>
            		<input class="form-control" type="number" name="rateNumParte" id="rateNumParte" placeholder="Rate" required="true" min="1" />
            	</div>
            	<div class="form-group">
	            	<label for="descNumParte">Descripción: </label>
	            	<input class="form-control" type="text" name="descNumParte" id="descNumParte" placeholder="Descripción"/>
	          	</div>
 				<div class="form-group text-center">
            		<input type="submit" value="Agregar Número de parte" class="btn btn-primary text-center form-control">
          		</div>
        	</form>
  		</div>
  	</div>
  </div>
  <!--Aquí acaba la ventana para agregar un número de parte :D-->

  <!--Ventana para editar un número de parte :D-->
  <div id="venEditNumParte">
  	<div>Editar número de parte</div>
  	<div>
  		<div class="col-xs-12 col-md-12">
  			<form id="formEditNumParte">
          		<div class="form-group">
          			<label for="numParteEdit">Número de Parte: </label>
            		<input class="form-control" type="text" name="numParteEdit" id="numParteEdit" placeholder="Número de parte" required autofocus="true" />
            	</div>
            	<div class="form-group">
            		<label for="rateNumParteEdit">Rate: </label>
            		<input class="form-control" type="number" name="rateNumParteEdit" id="rateNumParteEdit" placeholder="Rate" required="true" min="1" />
            	</div>
            	<div class="form-group">
	            	<label for="descNumParteEdit">Descripción: </label>
	            	<input class="form-control" type="text" name="descNumParteEdit" id="descNumParteEdit" placeholder="Descripción"/>
	          	</div>
 				<div class="form-group text-center">
	 				<span id="spanAltaBaja"></span>
            		<input type="checkbox" class="form-control" value="1" id="bajaEdit" name="bajaEdit">
          		</div>
          		<div class="form-group text-center">
            		<input type="submit" value="Guardar" class="btn btn-primary text-center form-control">
          		</div>
        	</form>
  		</div>
  	</div>
  </div>
  <!--Aquí acaba la ventana para editar un número de parte :D-->
  <!--modal ventana verificar si desea dar de baja el número de parte-->
  <div id="divVenPregBaja">
  	<div>¿Pregunta?</div>
  	<div>
	</div>
  </div>
  <!--modal ventana verificar si desea dar de baja el número de parte-->

  <!--importar los scripts desde la ruta www/js y los js de rh-->
  <?php include '../scriptsPiePag.php';?>
  <script src="../../js/jquery.dataTables.min.js" charset="utf-8"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxcore.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxnotification.js"></script>
  <script type="text/javascript" src="../../js/jqwidget/jqxwindow.js"></script>
  <script type="text/javascript" src="../../js/ing.js"></script>
</body>
</html>
