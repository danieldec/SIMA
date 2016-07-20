<?php if (!isset($_SESSION)) {
    session_start();
} ?>
<nav class="navbar navbar-default" role="navigation">
  <div class="navbar-header">
    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-ex4-collapse">
      <span class="sr-only">Desplegar navegación</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a href="<?php $_SERVER['PHP_SELF'] ?> " class="navbar-brand" id="aLogo"><img src="../../public/img/sima.jpg" alt="" id="imgLogo" class="img-thumbnail"/></a>
  </div>
  <div class="collapse navbar-collapse navbar-ex4-collapse text-center">
    <p class="navbar-text text-uppercase" id="pBV">Bienvenido a SIMA Solutions</p>
    <p class="navbar-text" id="pLogUsua">
      <span>
        <?php
          if ($_SESSION['logueado']) {
            echo $_SESSION['numUsuario'];
          }else{
            header("Location:../../");
            session_destroy();
            exit;
          }
         ?>
      </span>
      <a href="../cerrarSesion.php" id="aCerrarSesion">Cerrar Sesión</a>
    </p>
  </div>

</nav>
