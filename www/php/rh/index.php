<!DOCTYPE html>
<html lang="es">
<head>
  <?php session_start();
    if ($_SESSION['perfil']!='rh') {
      header("Location:../../");
      session_destroy();
      exit;
    }
   ?>
  <meta charset="UTF-8">
  <title>Recursos Humanos</title>
  <!-- importar hojas de estilo que estan en la ruta www/css y del admin-->
  <?php include '../hojasEstilo.php'; ?>
  <link rel="stylesheet" href="../../css/styles/jqx.base.css" type="text/css" />
  <link rel="stylesheet" href="../../css/styles/jqx.classic.css" type="text/css" />
  <link rel="stylesheet" href="../../css/styles/jqx.bootstrap.css" type="text/css" />
  <link rel="stylesheet" href="../../css/rh.css" charset="utf-8">
</head>
<body>
  <!--Barra de navegación-->
  <?php include '../nav.php' ?>
  <!--Aquí esta mi menú en el área de RH  -->
  <div class="container-fluid">
    <div class="row">
      <ul class="nav nav-tabs nav-justified">
        <li class="active"><a href="#empleados">EMPLEADOS</a></li>
        <li><a href="#usuarios">USUARIOS</a></li>
        <li><a href="#reporte">REPORTE</a></li>
      </ul>
    </div>
  </div>
  <!--Aquí termina el menú del área de RH  -->
  <!--Aquí empieza el contenido de las pestañas de empleados, usuarios y reporte -->
  <div class="tab-content">
    <br>
    <!--Aquí empieza el contenido de la pestaña empleados-->
    <div class="tab-pane fade in active" id="empleados">
      <div class="row">
        <div class="container-fluid">
          <div class="col-md-offset-3 col-md-6 text-center">
            <a class="btn btn-primary btn-block" href="#altaEmpleados" data-toggle="modal">ALTA EMPLEADOS</a>
            <!--Empieza mi Modal o ventana emergente-->
            <div class="modal fade" id="altaEmpleados">
              <div class="modal-dialog">
                <div class="modal-content">
                <!--encabezado del modal-->
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3>Dar de alta a nuevos empleados</h3>
                  </div>
                  <!--cuerpo del modal-->
                  <div class="modal-body">
                    <div class="container-fluid">
                      <form action="altaEmpleados.php" method="post"class="" id="formAltaEmpleados">
                        <div class="form-group">
                          <input type="text" name="numEmpleado" id="inpNumEmpleado" autocomplete class="form-control" placeholder="Número del empleado" autofocus required/>
                        </div>
                        <div class="form-group">
                          <input type="text" name="nombreEmpleado" placeholder="Nombre" class="form-control" required/>
                        </div>
                        <div class="form-group">
                          <input type="text" name="apellidoEmpleado" placeholder="Apellidos" class="form-control" required>
                        </div>
                        <button type="submit" class="form-class btn btn-primary">
                        Guardar Información
                        </button>
                      </form>
                    </div>
                  </div>
                  <!-- pie de página del modal -->
                  <div class="modal-footer">
                    <div class="form-group">
                      <button class="btn btn-default" data-dismiss="modal" type="button">Cerrar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Aquí termina el modal o ventana emergente-->
          </div>
        </div>
      </div>
      <br>
      <!--Botón lista empleados-->
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div class="container-fluid">
             <div id='jqxWidget'>
              <div id="jqxgridEmpleados"></div>
              <br>
              <input type="button" value="Export to Excel" id='excelExport' />
            </div>
          </div>
        </div>
      </div>
      <!--tabla empleados-->
    </div>
    <!--Aquí termina el contenido de la pestaña empleados-->

    <!--Aquí empieza el contenido de la pestaña de usuarios -->
    <div class="tab-pane fade" id="usuarios">
      <div>estoy en el contenido de usuarios</div>
    </div>
    <!--Aquí termina el contenido de la pestaña de usuarios -->


    <!--Aquí empieza el contenido de la pestaña de reporte -->
    <div class="tab-pane fade" id="reporte">
      <h2>Estas en el tab de reporte</h2>
  </div>
  <!--Aquí termina el contenido de las pestañas de empleados, usuarios y reporte -->

  <!--importar los scripts desde la ruta www/js y los js de rh-->
  <?php include '../scriptsPiePag.php';?>

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

  <script type="text/javascript" src="../../js/rh.js"></script>

</body>
</html>
