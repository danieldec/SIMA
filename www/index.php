<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>SIMA</title>
  <?php include'php/hojasEstiloIndex.php';?>
</head>
<body>
  <?php include 'php/navIndex.php';?>
  <br>
  <br>
  <br>
  <div class="container well col-md-8 col-md-offset-2">
    <form class="form-horizontal" id="loginForm" action="login.php" method="post">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">Usuario</label>
        <div class="col-sm-10">
          <input type="text" class="form-control sesion" id="inUsuario" placeholder="Usuario" required name="inUsuario" autofocus >
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">Contraseña</label>
        <div class="col-sm-10">
          <input type="password" class="form-control sesion" placeholder="***" required name="inContra" id="inContra">
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-4 col-sm-6">
          <button type="submit" id="btnIniciarSesion"class="btn btn-default btn-lg btn-block form-control">Iniciar Sesión</button>
        </div>
      </div>
    </form>
    <div class="" id="tipoAlerta">
    </div>

  </div>
  <!-- Aquí Inicia los Scripts de la página web-->
  <?php include('php/scriptsPiePagIndex.php'); ?>
</body>
</html>
