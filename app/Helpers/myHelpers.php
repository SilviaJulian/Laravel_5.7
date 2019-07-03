<?php
/**
 * Ejemplo basico de funciones helpers
 */
function setActive($routeName)
{
    // valida si el nombre de la varible es igual al nombre de la ruta
    return request()->routeIS($routeName) ? 'active' : '';
}
