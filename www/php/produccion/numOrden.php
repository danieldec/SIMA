<?php
  include '../conexion/conexion.php';
  if(!isset($_SESSION)){
    session_start();
  }
  $GLOBALS['idParcial']="";
  $GLOBALS['parcialNumParte']="";
  // $numParteParcial;
  // $idParcial;
  if ($_SERVER['REQUEST_METHOD']=="POST") {
    //buscamos parcial para recuperarlo
    if (isset($_POST['pParNumParte'])) {
      $parcialNumParte=$_POST['pParNumParte'];
      $consulta="select * from parcial where num_parte_num_parte = '$parcialNumParte'";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        echo "Error: ".mysqli_error($conexion);
        return;
      }
      if ($resultado->num_rows<=0) {
        echo 0;
        return;
      }
      while ($fila=$resultado->fetch_array()) {
        $GLOBALS['idParcial']=$fila['idparcial'];
        $GLOBALS['parcialNumParte']=$fila['num_parte_num_parte'];
        echo $fila['cantidad'];
        //echo $fila['cantidad'].$fila['idparcial'].$fila['localizacion'];
      }
    }//fin del if Parcial
    if (isset($_POST['pVNumOrden'])) {
      $num_orden=$_POST['pVNumOrden'];
      $num_parte=$_POST['pVNumParte'];
      $cantidad_Req=$_POST['pVCantidadReq'];
      $fecha_Num_Orden=$_POST['pVFechaNumOrden'];
      $id_usuario=$_POST['pVNumUsuario'];
      $consulta="insert into num_orden (idnum_orden, num_parte, cantidad, fecha, usuarios_idusuario, fecha_generada) value('$num_orden','$num_parte','$cantidad_Req','$fecha_Num_Orden','$id_usuario',CURRENT_TIMESTAMP)";
      // $consulta2="select DISTINCT num_parte_num_parte, idparcial from parcial WHERE idparcial='".$num_parteParcial."' and num_parte_num_parte = '".$idParcial."'";
      // $resultado=$conexion->query($consulta2);
      // if (!$resultado) {
      //   echo "error: ".mysqli_error($conexion)." ". mysqli_errno($conexion);
      //   return;
      // }
      // $fila=$resultado->num_rows;
      // echo $fila;
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        echo "error: ".mysqli_error($conexion);
        return;
      }
      echo "Registro Exitoso";
    }//fin del if de numero de orden
    if (isset($_POST['pFechaInicial'])) {
      $fechaInicial=$_POST['pFechaInicial'];
      $fechaFinal=$_POST['pFechaFinal'];
      $consulta="select num_orden.idnum_orden,num_orden.num_parte,num_orden.cantidad,num_orden.fecha, num_orden.fecha_generada from num_orden WHERE num_orden.fecha BETWEEN '$fechaInicial' and '$fechaFinal' ORDER BY num_orden.fecha_generada DESC";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        echo "Error".mysqli_error($conexion);
        return;
      }
      echo "<table class='table table-bordered table-responsive table-condensed table-reflow' id='tablaNoOrden'>
        <caption>Número de Orden</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Folio</th>
            <th>Número de parte</th>
            <th><abbr title='Requerimiento'>REQ</abbr></th>
            <th>Fecha_Requerimiento</th>
            <th>Fecha_Hora_Generada</th>
          </tr>
        </thead>";
        $contador=0;
        while($fila=$resultado->fetch_array()){
          $contador+=1;
          echo "<tr><td>$contador</td>";
          echo "<td>".$fila['idnum_orden']."</td>";
          echo "<td>".$fila['num_parte']."</td>";
          echo "<td>".$fila['cantidad']."</td>";
          $fecha=$fila['fecha'];
          $fechaFormat=date("d-m-Y",strtotime($fecha));
          echo "<td>".$fechaFormat."</td>";
          $fecha=$fila['fecha_generada'];
          $fechaFormat=date("l d-m-Y H:i:sA ",strtotime($fecha));
          echo "<td>".$fechaFormat."</td></tr>";
        }//fin del while
    }//fin del if Fecha
  }//fin del if del $_POST es igual a post
  //busqueda de numero de partes por .Ajax
  if (isset($_POST['pPalabraC'])) {
    $busqueda=$_POST['pPalabraC'];
    $consulta="select num_parte from num_parte where num_parte like '%$busqueda%'order by num_parte limit 5";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Error:".mysqli_error($conexion);
    }else{
      while ($fila=$resultado->fetch_array()) {
        $numParte=str_replace($_POST['pPalabraC'],"<b>".$_POST['pPalabraC']."</b>",$fila['num_parte']);
        echo '<li onclick="set_item(\''.str_replace("'", "\'", $fila['num_parte']).'\')">'.$numParte.'</li>';
      }
    }
    mysqli_free_result($resultado);
    mysqli_close($conexion);
  }
  if (isset($_POST['pNumOrdenMax'])) {
    $consulta="select MAX(idnum_orden) as id from num_orden";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Error:".mysqli_error($conexion);
      return;
    }
    $fila=$resultado->fetch_array();
    echo $fila['id'];
    mysqli_free_result($resultado);
    mysqli_close($conexion);
  }
 ?>
