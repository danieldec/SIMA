<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>SIMA</title>
  <?php include('php/hojasEstiloIndex.php'); ?>
</head>
<body>
  <nav class="navbar navbar-default" role="navigation">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-ex4-collapse">
        <span class="sr-only">Desplegar navegación</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="index.php" class="navbar-brand" id="aLogo"><img src="public/img/sima.jpg" alt="" id="imgLogo" class="img-thumbnail"/></a>
    </div>
    <div class="collapse navbar-collapse navbar-ex4-collapse text-center">
      <p class="navbar-text text-uppercase" id="pBV">Bienvenido a SIMA Solutions</p>
    </div>
  </nav>
  <br>
  <br>
  <br>
  <div class="container well col-md-8 col-md-offset-2">
    <form class="form-horizontal" method="post">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">Usuario</label>
        <div class="col-sm-10">
          <input type="text" class="form-control sesion" id="inputEmail3" placeholder="Usuario" required name="inUsuario">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">Contraseña</label>
        <div class="col-sm-10">
          <input type="password" class="form-control sesion" id="inputPassword3" placeholder="Contraseña" required name="inContra" id="inContra">
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-4 col-sm-6">
          <button type="submit" id="btnIniciarSesion"class="btn btn-default btn-lg btn-block form-control">Iniciar Sesión</button>
        </div>
      </div>
    </form>
  </div>
  <!-- Aquí Inicia los Scripts de la página web-->
  <?php include('php/scriptsPiePagIndex.php'); ?>
</body>
</html>
