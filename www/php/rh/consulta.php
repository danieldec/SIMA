<?php
  if (!isset($_SESSION)) {
    session_start();
  }
  include '../conexion/conexion.php';

  if ($_SERVER['REQUEST_METHOD']==="POST") {
    $consulta="select * from empleados";
    $resultado=$conexion->query($consulta);
    if (!$resultado) {
      echo "Error descripción: " mysqli_error($conexion);
    }
  }










 ?>
 <div class="container-fluid">
   <div class="collapse col-md-12 text-center" id="listaEmpleados">
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
       <tr class="filaSeleccionada" id="fila">
         <td>1</td>
         <td><input type="text" class="form-control empleado" disabled value="d-2222"></td>
         <td><input type="text" class="form-control empleado" disabled value="daniel"></td>
         <td><input type="text" class="form-control empleado" disabled="enabled" value="del rio cruz"></td>
         <td><button class="btn btn-default form-control" id="modEmpleado"><span class="glyphicon glyphicon-pencil"></span> Modificar</button></td>
         <td><button class="btn btn-danger form-control" id="elimEmpleado"><span class="glyphicon glyphicon-trash"></span> Eliminar</button></td>
       </tr>
       <tr class="filaSeleccionada">
         <td>2</td>
         <td><input type="text" class="form-control empleado" disabled value="i-1111"></td>
         <td><input type="text" class="form-control empleado" disabled value="edgar"></td>
         <td><input type="text" class="form-control empleado" disabled="enabled" value="del rio cruz"></td>
         <td><button class="btn btn-default form-control" id="modEmpleado"><span class="glyphicon glyphicon-pencil"></span> Modificar</button></td>
         <td><button class="btn btn-danger form-control danger" id="elimEmpleado"><span class="glyphicon glyphicon-trash"></span> Eliminar</button></td>
       </tr>
     </tbody>
   </table>
   </div>
 </div>
 </div>
