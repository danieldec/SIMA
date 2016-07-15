<?php include('link.php') ?>
<nav class="navbar navbar-default" role="navigation">
  <div class="container-fluid">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-ex4-collapse">
        <span class="sr-only">Desplegar navegación</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="menuMateriales.php" class="navbar-brand" id="aLogo"><img src="../public/img/sima.jpg" alt="" id="imgLogo" class="img-thumbnail"/></a>
    </div>
    <div class="collapse navbar-collapse navbar-ex4-collapse text-center">
      <ul class="nav navbar-nav">
        <!--class="active" clase selecciona el li que esta activo-->
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Altas<b class="caret"></b>
          </a>
          <ul class="dropdown-menu">
            <li><a href="fila.php">Fila</a></li>
            <li><a href="#">Columna</a></li>
            <li><a href="#">Almacen</a></li>
            <!--<li class="divider"></li> separa la lista con una línea-->
            <li><a href="#">BOM</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Modificaciones<b class="caret"></b>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#">Fila</a></li>
            <li><a href="#">Columna</a></li>
            <li><a href="#">Almacen</a></li>
            <!--<li class="divider"></li> separa la lista con una línea-->
            <li><a href="#">BOM</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Bajas<b class="caret"></b>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#">Fila</a></li>
            <li><a href="#">Columna</a></li>
            <li><a href="#">Almacen</a></li>
            <!--<li class="divider"></li> separa la lista con una línea-->
            <li><a href="#">BOM</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
<?php include('scripts.php') ?>
