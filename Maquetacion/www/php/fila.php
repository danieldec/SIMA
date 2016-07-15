<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <?php
  include('conexion.php');
  if ($_SERVER["REQUEST_METHOD"]==="POST") {
    $fila=$_POST["fila"];
    $sql = "insert into "."fila_almacen (idfila_almacen) VALUES ('$fila')";
    $result=$conexionMysqli->query($sql);
    if (!$result) {
      echo "error descripción: ". mysqli_error($conexionMysqli);
      echo "<footer><h3>Registro no Realizado</h3></footer>";
    }else {
      echo "<footer><h3>Registro Exitoso</h3></footer>";
    }
  }
   ?>
   <link rel="stylesheet" href="../css/altas.css" media="screen" title="no title" charset="utf-8">
</head>
<body>
  <?php  include('menuMateriales.php');?>
    <form class="" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="post">
      <label>Ingrese Fila</label><input type="number" name="fila" value="1" min="1" required="">
      <label><input type="submit"></label>
    </form>
    <?php
    $sql='select * from fila_almacen';
    $result=$conexionMysqli->query($sql);
    if (!$result) {
      // printf("error de mensaje: %s\n",$mysqli->error());
      echo "error descripción: ". mysqli_error($conexionMysqli);
    }else {
        echo '<table>';
        echo '<caption>Filas en el almacen</caption>';
        echo "<thead><tr><th>Fila</th></tr></thead>";
        echo '<tbody>';
        while ($row=$result->fetch_array()) {
          echo "<tr><td>";
          echo $row['idfila_almacen'];
          echo "</tr></td>";
        }
        echo "</tbody>";
        echo "</table>";
    }
    mysqli_free_result($result);
    mysqli_close($conexionMysqli);
    ?>

  <script type="text/javascript" src="../js/altas.js"></script>
</body>

</html>

<?php /*$row=$result->fetch_assoc(); o
      $row=$result->fetch_array(); */?>
<!-- liberar el conjunto de resultados
   mysqli_free_result($resultado);
   cerrar la conexión mysqli_close($link);
  -->
