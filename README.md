# Mintberry

<p align="center">
<img src="https://user-images.githubusercontent.com/37419225/96831362-53ee6a80-1413-11eb-802d-6d63c9a565b8.png" width="200px%" height="200px"></img> 
</p>
 
Aplicación ToDoList demo realizada con el objetivo de practicar y aprender nuevas tecnologías. 

## Características
### Frontend
Desarrollado en Node JS con React JS como framework.
- Manejo de estado con Redux.
- Bulma como framework CSS.
- Manejo de fechas con Moment.js
- Manejo de formularios con Formik y Yup.
- Comunicación con el backend mediante cliente Axios.
- Internacionalización inglés/español con i18next.
- Autenticación mediante JWT tokens.

### Backend
Desarrollado en Node JS con Express como framework.
- Base de datos MySQL, y Postgres para los tests.
- Utiliza Sequelize como ORM y para migraciones.
- Implementa arquitectura SOA (eso intenta)
- Validación de requerimientos con Yup.
- Internacionalización inglés/español con i18next.
- Autenticación mediante JWT tokens.

### Instrucciones
Al finalizar la instalación podrás acceder a la aplicación desde cualquier navegador con la url  http://localhost:3031/ o http://tuipprivada:3031/

#### Docker Compose
Instalar Docker Compose: https://docs.docker.com/compose/install/

##### Paso 1: Construir containers
`docker-compose build`

Si quieres poder acceder a la app desde otro dispositivo de la red (reemplazar IP_PRIVADA por su valor real):

`docker-compose build --build-arg HOST_URL=IP_PRIVADA`

Ejemplo: `docker-compose build --build-arg HOST_URL=192.168.0.226`

En linux, puedes automatizar el comando anterior:

`docker-compose build --build-arg HOST_URL=$(hostname -I | cut -f1 -d " ") `

##### Paso 2: Ejecutar containers
`docker-compose up`

Para correrlos en segundo plano:

`docker-compose up -d`



