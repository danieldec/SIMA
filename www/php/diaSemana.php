<?php

  function diaSemana()
  {
    $today=date('l');
    if ($today=='Friday') {
        return 'VIERNES';
    }
    if ($today=="Saturday") {
        return "SÁBADO";
    }
    if ($today=="Sunday") {
        return "DOMINGO";
    }
    if ($today=="Monday") {
      return "LUNES";
    }
    if ($today=="Tuesday") {
      return "MARTES";
    }
    if ($today=="Wednesday") {
      return "MIÉRCOLES";
    }
    if ($today=="Thursday") {
      return "JUEVES";
    }
  }

?>
