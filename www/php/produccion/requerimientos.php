<?php
  include '../conexion/conexion.php';
  if(!isset($_SESSION)){
    session_start();
  }
  if ($_SERVER['REQUEST_METHOD']=="POST"){
    if (isset($_POST['pFechaHoy'])&&isset($_POST['pReqNumOrden'])) {
      $fecha=date($_POST['pFechaHoy']);
      $fechaHoy=date('Y-m-d',strtotime($fecha));
      $fechaAyer=date('Y-m-d',strtotime($fecha."-1 day"));
      $fechaManana=date('Y-m-d',strtotime($fecha."+1 day"));
      $fechas= array('fechaHoy' => $fechaHoy,'fechaAyer'=>$fechaAyer,'fechaManana'=>$fechaManana );
      $arreglo=array('Validacion'=>'','Datos'=>'');
      $arreglo=tBodyReq($conexion,$fechas,$arreglo);
      echo json_encode($arreglo,JSON_UNESCAPED_UNICODE);
    }
  }
  function errorConsultaJSON($resultado,$conexion,$arreglo)
  {
    if (!$resultado){
      $arreglo['Validacion']="Error";
      $arreglo['Datos']="(".$conexion->errno.").".$conexion->error;
      $conexion->close();
      return $arreglo;
    }
  }
  function tBodyReq($conexion,$fechas,$arreglo)
  {
    $consulta="SELECT nm.idnum_orden, nm.num_parte, nm.fecha,nm.cantidad,nm.cantidad_realizada FROM num_orden nm, num_parte np WHERE nm.fecha BETWEEN '".$fechas['fechaAyer']."' AND '".$fechas['fechaManana']."' AND nm.num_parte=np.num_parte ORDER BY nm.fecha_generada DESC;";
    $resultado=$conexion->query($consulta);
    $arreglo=errorConsultaJSON($resultado,$conexion,$arreglo);
    if ($arreglo['Validacion']=="Error") {
      $arreglo['Validacion']="ErrorDB";
      $arreglo['Datos']=$arreglo['Datos']." Función tBodyReq";
      return $arreglo;
      exit();
    }
    $arreglo['Validacion']="Exito";
    $tbody="";
    $contador=1;
    while ($fila=$resultado->fetch_object()) {
      $tbody=$tbody."<tr>"."<td>".$contador."</td>";
      $tbody=$tbody."<td class='fechaReq'>".$fila->fecha."</td>";
      $tbody=$tbody."<td class='numOrdReq'>".$fila->idnum_orden."</td>";
      $tbody=$tbody."<td class='numParReq'>".$fila->num_parte."</td>";
      $tbody=$tbody."<td class='cantReq'>".$fila->cantidad."</td>";
      $tbody=$tbody."<td class='parReq'>"."0"."</td>";
      $tbody=$tbody."<td class='paPReq'>"."0"."</td>";
      $tbody=$tbody."<td class='cantReaReq'>".$fila->cantidad_realizada."</td>";
      $tbody=$tbody."<td class='balReq'>"."0"."</td>";
      $tbody=$tbody."<td class='porReq' style='width:30%'>".'<div class="progress"><div class="progress-bar progress-bar-success active progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:100%"></div></div>'."</td>"."</tr>";
      $contador++;
    }
    $arreglo['Datos']=$tbody;
    return $arreglo;
  }

?>
