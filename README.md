# ProyectoFinal-Backend-avanzado

El proyecto final de curso consistirá en construir una API para un “clon” de la red
social Twitter.
En la misma, se deberá dar soporte para lectura, escritura, edición y borrado
(CRUD) de:<br>
● Usuarios.<br>
● Tweets.<br>
La API, además, brindará un sistema de autenticación.

Tendremos endpoints para lectura, escritura, edición y borrado de ambas
colecciones.

En el caso de los tweets, además, se deberá brindar soporte para buscarlos por
texto, filtrarlos por autor, ordenarlos por fecha y paginarlos.
En caso de los autores, se deberá poder buscarlos por texto.

Tanto los esquemas de tweets como de usuarios deberán ofrecer validaciones
para todos sus campos.
A su vez, los endpoints deberán requerir autenticación según corresponda.
Tener especial atención a las validaciones de autoría: Un usuario sólo puede
escribir tweets asociados a sí mismo, y así para todos los casos que corresponda.
