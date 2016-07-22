<!DOCTYPE html>
<html lang="es">
<head>
  <?php session_start();
  if ($_SESSION['perfil']!='admin') {
    header("Location:../../");
    session_destroy();
    exit;
  }
  ?>
  <meta charset="UTF-8">
  <title>Admin</title>
  <!-- importar hojas de estilo que estan en la ruta www/css y del admin-->
  <?php include '../hojasEstilo.php'; ?>
  <link rel="stylesheet" href="../../css/admin.css" charset="utf-8"/>
</head>
<body>
  <!-- Barra de navegación -->
  <?php include '../nav.php'; ?>
  <!-- Aquí empieza el tab de la página-->
  <div class="row">
    <div id="dia" class="col-sm-12 text-right">
      <?php
      // $fecha1=new DateTime();
      // print_r($fecha1);
      include '../diaSemana.php';
      $fecha="";
      $dia=diaSemana();
      $fecha="Hoy es ".$dia." ".date('d/m/Y h:i:sa');
      echo $fecha;
      ?>

    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
        <ul class="nav nav-tabs nav-justified">
          <li class="active"><a href="#usuarios">USUARIOS</a></li>
          <li class=""><a href="#acercaDe">ACERCA DE..</a></li>
        </ul>
    </div>
  </div><!-- Aquí termina el tab de la página-->
  <!--Aquí empieza el tab del usuario admin-->
  <div class="tab-content">
    <br>
      <!-- aquí empieza el tab de usuario-->
      <div class="tab-pane fade in active" id="usuarios">
        <!--aquí empieza la fila-->
        <div class="row">
          <div class="container-fluid">
            <!-- aquí empieza la mitad de la columna-->
            <div class="col-md-6">
              <form class="" action="" method="post">
                <div class="text-center">
                  <label for="numUsuario">Numero de Usuario</label><input type="number" max="100" class="form-control" min="1" name="numUsuario" value="1">
                </div>
                <div class="text-center">
                  <label for="nombreUsuario">Nombre Usuario</label><input type="text" class="form-control" name="nombreUsuario"  />
                </div>
                <div class="text-center">
                  <label for="contrasena">Contraseña</label><input type="password" class="form-control" name="contrasena"/>
                </div>
                <div class="text-center">
                  <label for="numEmpleado">Número de Empleado</label><input type="text" class="form-control" name="numEmpleado"/>
                </div>
                <div class="text-center">
                  <label for="perfilUsuario">Perfil Usuario</label><input type="text" class="form-control" name="perfilUsuario"/>
                </div><br>
                <input type="submit" class="button form-control btn-primary" name="enviar" value="Registrar">
              </form>
            </div>
            <!-- aquí termina la mitad de la columna-->
            <div class="col-md-6">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>
        <!--aquí termina la fila-->
      </div>
      <!-- aquí termina el tab de usuario-->
      <!--Aquí empieza el tab de acerca de-->
      <div class="tab-pane fade" id="acercaDe">
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
      </div>
  </div>
  <!-- importar los scripts desde la ruta www/js y los js del admin-->
  <?php include '../scriptsPiePag.php';?>
  <script type="text/javascript" src="../../js/admin.js"></script>

</body>
</html>
