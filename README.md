
# Generador de Proyecto Base para Node.js y Express

Este proyecto es un generador de estructura inicial para aplicaciones **Node.js** con **Express**. Permite elegir el tipo de base de datos entre **MongoDB**, **MySQL** o **PostgreSQL**, y configura automáticamente los archivos necesarios según tu elección. También incluye autenticación básica, manejo de rutas y otras dependencias útiles para el desarrollo de un servidor backend.

## Características

- **Generación Automática**: Estructura de proyecto base generada con Plop.
- **Soporte para Bases de Datos**: Soporte para MongoDB, MySQL o PostgreSQL.
- **Autenticación**: Middleware para autenticación incluido.
- **Rutas Preconfiguradas**: Estructura básica para manejo de rutas.
- **Dependencias Comunes**: Configuración de dependencias esenciales para cualquier proyecto backend.

## Estructura del Proyecto

Una vez que ejecutes el generador, obtendrás la siguiente estructura de archivos:

```
NombreDelProyecto/
│
├── src/
│   ├── app.js                  # Configuración principal del servidor
│   ├── routes/
│   │   └── index.js             # Definición de rutas de la API
│   ├── controllers/
│   │   └── indexController.js   # Controlador para manejar la lógica de las rutas
│   ├── middleware/
│   │   └── auth.js              # Middleware para autenticación
│   ├── config/
│   │   └── config-{{dbType}}.js # Configuración de base de datos según tu elección
│   └── .env                     # Variables de entorno
│
└── README.md
```

## Instalación y Configuración

### Prerrequisitos

Antes de empezar, asegúrate de tener lo siguiente instalado:

- **Node.js** (versión 14 o superior)
- **npm** o **yarn**
- **Plop** instalado globalmente:
  
  ```bash
  npm install -g plop
  ```

### Uso del Generador

Sigue estos pasos para generar tu proyecto:

1. Ejecuta el siguiente comando para iniciar el generador:

    ```bash
    npx plop express-app
    ```

2. El asistente te pedirá los siguientes datos:
   - **Nombre del proyecto**: Ingrésalo en formato PascalCase.
   - **Tipo de base de datos**: Selecciona entre MongoDB, MySQL o PostgreSQL.

3. Navega al directorio del proyecto generado:

    ```bash
    cd NombreDelProyecto
    ```

4. Instala las dependencias necesarias con:

    ```bash
    npm install
    ```

5. Configura el archivo `.env` generado para tu proyecto, incluyendo las credenciales de la base de datos.

### Ejecutar el Proyecto

Para iniciar el servidor, ejecuta el siguiente comando:

```bash
npm start
```

Esto arrancará el servidor en el puerto especificado (por defecto, el puerto 3000).

## Dependencias Incluidas

Las siguientes dependencias se instalan automáticamente según tu elección de base de datos:

### Generales

- **express**: Framework web para Node.js.
- **colors**: Para agregar colores a los logs en la consola.
- **dotenv**: Manejo de variables de entorno.

### MongoDB

- **mongoose**: ODM para MongoDB.

### MySQL

- **mysql2**: Cliente MySQL.
- **sequelize**: ORM para bases de datos relacionales.

### PostgreSQL

- **pg**: Cliente PostgreSQL.
- **pg-hstore**: Manejador para JSON en PostgreSQL.
- **sequelize**: ORM para bases de datos relacionales.

## Archivos Principales

### `src/app.js`

Este archivo configura y arranca el servidor Express. Define las rutas, middleware y otros ajustes esenciales.

### `src/routes/index.js`

Aquí se definen las rutas principales de la aplicación. Puedes agregar más rutas según las necesidades del proyecto.

### `src/controllers/indexController.js`

Este archivo contiene la lógica que responde a las solicitudes en las rutas definidas.

### `src/middleware/auth.js`

Middleware para manejar la autenticación. Puedes personalizarlo para tus necesidades de autenticación.

### Configuraciones de Base de Datos

Dependiendo de la base de datos que selecciones, uno de los siguientes archivos será generado:

- **MongoDB**: `src/config/config-mongo.js`
- **MySQL**: `src/config/config-mysql.js`
- **PostgreSQL**: `src/config/config-postgres.js`

Configura estos archivos según las credenciales y parámetros de tu base de datos.

## Contribuciones

Si deseas mejorar este generador, ¡eres bienvenido a contribuir! Solo asegúrate de seguir las mejores prácticas para mantener el código claro y eficiente.

## Licencia

Este proyecto está licenciado bajo la MIT License.

---

¡Gracias por usar este generador de proyectos base para Node.js y Express! Esperamos que te ahorre tiempo y te ayude a crear aplicaciones backend rápidamente.
