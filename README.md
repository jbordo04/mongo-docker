# MongoDB

Todos los comandos posibles:

`npm run mongo` Ejecuta las consulta noSQL de mongoose.

`npm run eslint` Ejecuta eslint.

## Estructura de MongoDB

MongoDb es una base de datos noSQL( no relacional), que permite almacenar los datos de manera muy dinámica como si objetos fuesen mediante colleciones y los datos, llamados documentos.

En este ejercicios, hemos utilizado mongoose, un ODM, de MongoDB que nos permite mediantes sus métodos acceder de manera sencilla a MongoDB.

.[!IMPORTANT].
Tener la url de conexion, yo puse la propia de un cluster de mongoDBAtlas, se puede utilizar la de localhost que te de MongoDb Compass.

Mediante la siguiente foto, tenemos que crear las posibles datos que pudiera haver:

!['foto'](Imagen1PHP.jpg)

## Docker

Por que utilizar docker? Docker es una plataforma de código abierto que nos permitirá ejecutar una app sin la necesidad de tener que instalar ninguna app, mediante imágenes y contenedores.

Guarda la imagen que contiene la config de mongo y desde donde nos conectaremos:

```sh
docker pull mongo
```

Comando para arrancar nuestras imagenes en diferentes contenedores y que queden conectados:

````sh
docker compose up -d
```

````
