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
    if (isset($_POST['pVNumOrden'])&&isset($_POST['pVNumParte'])) {
      $num_orden=trim($_POST['pVNumOrden']);
      $num_parte=trim($_POST['pVNumParte']);
      $cantidad_Req=trim($_POST['pVCantidadReq']);
      $fecha_Num_Orden=trim($_POST['pVFechaNumOrden']);
      $id_usuario=trim($_POST['pVNumUsuario']);
      $datos = array();
      $consulta="SELECT nm.idnum_orden,nm.num_parte,nm.cantidad,nm.fecha,nm.fecha_generada,nm.usuarios_idusuario, CONCAT_WS(' ',e.nombre,e.apellidos)AS nombreU,nm.fecha AS fJS FROM num_orden AS nm
      INNER JOIN usuarios AS u ON u.idusuario=nm.usuarios_idusuario
      INNER JOIN empleados AS e ON e.idempleados=u.empleados_idempleados
      WHERE nm.idnum_orden='$num_orden';";
      $resultado=$conexion->query($consulta);
      if (!$resultado) {
        $datos['validacion']='error';
        $datos['datos']=$conexion->errno."($conexion->error)";
        echo json_encode($datos,JSON_UNESCAPED_UNICODE);
        exit();
      }
      if ($resultado->num_rows>0) {
        $datos['validacion']='error';
        $datos['datos']="Número de orden Duplicada";
        $tbody=tbodyNumOrdDup($resultado);
        $datos['datosnm']=$tbody;
      }else{
        $consulta="insert into num_orden (idnum_orden, num_parte, cantidad, fecha, usuarios_idusuario, fecha_generada) value('$num_orden','$num_parte','$cantidad_Req','$fecha_Num_Orden','$id_usuario',CURRENT_TIMESTAMP)";
        $resultado=$conexion->query($consulta);
        if (!$resultado) {
          $datos['validacion']='error';
          if ($conexion->errno==1452) {
            $datos['validacion']='error';
            $datos['numError']='1452';
            $datos['datos']="Número de parte invalido o no existe en la base de datos";
          }else{
            $datos['datos']=$conexion->errno."($conexion->error)";
          }
          echo json_encode($datos,JSON_UNESCAPED_UNICODE);
          exit();
        }
        $datos['validacion']="exito";
        $datos['datos']='Numéro de orden captura';
      }
      echo json_encode($datos,JSON_UNESCAPED_UNICODE);
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
    $consulta="SELECT num_parte FROM num_parte WHERE num_parte LIKE '%$busqueda%' AND estado = '1' order by num_parte limit 5";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Error:".mysqli_error($conexion);
    }else{
      while ($fila=$resultado->fetch_array()) {
        $numParte=str_replace($_POST['pPalabraC'],"<b>".$_POST['pPalabraC']."</b>",$fila['num_parte']);
        echo '<li onclick="set_item(\''.str_replace("'", "\'", $fila['num_parte']).'\')">'.$numParte.'</li>';
      }
    }
    //mysqli_free_result($resultado);
    //mysqli_close($conexion);
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
    //mysqli_free_result($resultado);
    //mysqli_close($conexion);
  }
  if (isset($_POST['numOrden'])&&isset($_POST['cargVen'])) {
    $numOrden = $_POST['numOrden'];
    $consulta="SELECT nm.idnum_orden,nm.num_parte,nm.cantidad,nm.fecha,nm.fecha_generada,nm.usuarios_idusuario, CONCAT_WS(' ',e.nombre,e.apellidos)AS nombreU,nm.fecha AS fJS FROM num_orden AS nm
    INNER JOIN usuarios AS u ON u.idusuario=nm.usuarios_idusuario
    INNER JOIN empleados AS e ON e.idempleados=u.empleados_idempleados
    WHERE nm.idnum_orden='$numOrden';";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      $datos['validacion']='error';
      $datos['datos']=$conexion->errno."($conexion->error)";
      echo json_encode($datos,JSON_UNESCAPED_UNICODE);
      exit();
    }
    $tbody=tbodyNumOrdDup($resultado);
    $datos['validacion']='exito';
    $datos['datos']=$tbody;
    echo json_encode($datos,JSON_UNESCAPED_UNICODE);
  }//fin del if
  //funciones del archivo numOrden.php
  function tbodyNumOrdDup($resultado)
  {
    $tbody="";
    while ($fila=$resultado->fetch_object()) {
      $tbody.='<form><tr><td class="idNOE"><input type="number" name="" value="'.$fila->idnum_orden.'" disabled/></td>';
      $tbody.='<td class="idNPE">'.selectNP($fila->num_parte).'</td>';
      $tbody.='<td class="cantiE"><input type="number" name="" value="'.$fila->cantidad.'" disabled></td>';
      $tbody.='<td class="fechaReqE"><div class="divFechRE"></div><input type="hidden" value="'.date('Y-n-j',strtotime($fila->fJS)).'"class="fechRaw"/></td>';
      $tbody.='<td class="fechaGenE">'.$fila->fecha_generada.'</td>';
      $tbody.='<td class="idUsuE">'.$fila->usuarios_idusuario.'</td>';
      $tbody.='<td class="nombreUE">'.$fila->nombreU.'</td>';
      $tbody.='<td class="nombreUE"><input type="button" value="Editar" class="inpBtnEdit btn btn-default"/><input type="button" value="Eliminar" class="inpBtnElim btn btn-danger"/></td></tr></form>';
    }
    return $tbody;
  }
  function selectNP($num_parte)
  {
    include '../conexion/conexion.php';
    $select="";
    $consulta="SELECT np.num_parte FROM num_parte AS np WHERE np.estado='1';";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      return $conexion->errno."($conexion->error)";
      exit();
    }
    $select="<select name='sNp' class='sNp' disabled>";
    while ($fila=$resultado->fetch_object()) {
      if ($fila->num_parte==$num_parte) {
        $select.="<option value='$fila->num_parte' selected>$fila->num_parte</option>";
      }else{
        $select.="<option value='$fila->num_parte'>$fila->num_parte</option>";
      }
    }
    $select.="</select>";
    return $select;
  }
 ?>
