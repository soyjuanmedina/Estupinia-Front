# DondeLoVeo

Un proyecto OpenSource para buscar películas y series en diferents plataformas.

### Tutorial Crear proyecto Angular desde 0

ng new <NombreProyecto>

pregunta si queremos añadir router y el tipo de estilos (para nuestro proyecto he puesto Si y Sass)

Bueno, pues de este modo tan simple ya tenemos un proyecto nuevo

Luego he hecho algunas configuraciones más para darle la estructura que ya es a gusto de cada uno

Yo he metido en una carpeta (scss) los estilos
He personalizado en npm start para que use un proxy para que cuando tengamos el back no haya problemas de Cors
He creado un componente navbar (en la carpeta components)
He creado una componente home (en la carpeta pages)
Las paginas (lo que se va a ver en el router), las meto en la capeta pages y los componentes en components
Cuando creo los componentes elimino los test (archivos spec.ts) y los estilos, y en el archivo ts correspondiente elimino el enlace a esos estilos. También en ese archivo cambio el nombre por defecto que da al componente y el de la etiqueta.
He modificado el index para incluir el componente navbar y el router
En el router he puesto que la ruta vacia muestra la página home

 si teneis cualquier duda preguntadme.
