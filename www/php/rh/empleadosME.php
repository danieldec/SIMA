<?php
  if (!isset($_SESSION)) {
    session_start();
  }
  include '../conexion/conexion.php';

  if ($_SERVER['REQUEST_METHOD']==="POST") {
    $consulta="select * from empleados";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Error descripción: ".mysqli_error($conexion);
      return;
    }
    else {
    }
  }

 ?>

   <table class="table table-bordered table-responsive table-condensed table-reflow" id="tablaEmpleados">
     <caption>Lista Empleados</caption>
     <thead>
       <tr>
         <th>#</th>
         <th>Número Empleado</th>
         <th>Nombre</th>
         <th>Apellido</th>
         <th>Modficar</th>
         <th>Eliminar</th>
       </tr>
     </thead>
     <tbody>
       <?php
       $contador=0;
       while ($fila=$resultado->fetch_array()) {
         $contador=$contador+1;
         echo "<tr><td>$contador</td>";
         echo "<td><input type='text' class='form-control' disabled value=".$fila['idempleados']."></td> ";
         echo "<td><input type='text' class='form-control' disabled value=".$fila['nombre']."></td> ";
         echo "<td><input type='text' class='form-control' disabled value=".$fila['apellidos']."></td> ";
         echo "<td><button class='btn btn-default form-control' id='modEmpleado'><span class='glyphicon glyphicon-penci'></span> Modificar</button></td>";
         echo "<td><button class='btn btn-danger form-control' id='elimEmpleado'><span class='glyphicon glyphicon-trash'></span> Eliminar</button></td></tr>";
       } ?>
     </tbody>
   </table>
