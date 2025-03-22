# 🚀 Generador de Proyecto Base para Node.js y Express

Este proyecto es un generador de estructura inicial para aplicaciones **Node.js** con **Express**. Permite elegir el tipo de base de datos entre **MongoDB**, **MySQL** o **PostgreSQL**, y configura automáticamente los archivos necesarios según tu elección. También incluye autenticación básica, manejo de rutas y otras dependencias esenciales para el desarrollo de un servidor backend.  

## ✨ Características

✔ **Generación Automática**: Crea una estructura base de proyecto con **PlopJS**.  
✔ **Soporte para Bases de Datos**: Compatible con **MongoDB**, **MySQL** y **PostgreSQL**.  
✔ **Autenticación**: Incluye un middleware básico de autenticación.  
✔ **Rutas Preconfiguradas**: Estructura inicial para manejar rutas.  
✔ **Dependencias Esenciales**: Incluye las librerías más utilizadas en backend.  

## 📂 Estructura del Proyecto  

Una vez generado el proyecto, se creará la siguiente estructura de archivos:  

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
│   │   └── config-{{dbType}}.js # Configuración de base de datos según la elección
│   └── .env                     # Variables de entorno
│
└── README.md
```

## ⚙️ Instalación y Configuración  

### 📌 Prerrequisitos  

Antes de empezar, asegúrate de tener instalado:  

- **Node.js** (versión 14 o superior)  
- **npm** o **yarn**  
- **PlopJS** instalado globalmente:  

```bash
npm install -g plop
```

### 🛠 Uso del Generador  

Sigue estos pasos para generar tu proyecto:  

1️⃣ Ejecuta el siguiente comando para iniciar el generador:  

```bash
npx plop express-app
```

2️⃣ El asistente te pedirá los siguientes datos:  
   - **Nombre del proyecto**: Ingrésalo en formato PascalCase.  
   - **Tipo de base de datos**: Selecciona entre MongoDB, MySQL o PostgreSQL.  

3️⃣ Navega al directorio del proyecto generado:  

```bash
cd NombreDelProyecto
```

4️⃣ Configura el archivo `.env` generado con las credenciales de la base de datos.  

### 🚀 Ejecutar el Proyecto  

Para iniciar el servidor, usa el siguiente comando:  

```bash
npm run start
```

### 🔧 Ejecutar el Proyecto

Para iniciar el servidor en entorno de desarrollo, usa el siguiente comando:  

```bash
npm run dev
```

Esto arrancará el servidor en el puerto **3000** (por defecto).  

## 📦 Dependencias Incluidas  

### 📌 Generales  

- **express**: Framework web para Node.js.  
- **dotenv**: Manejo de variables de entorno.  
- **colors**: Agrega colores a los logs en consola.  
- **cors**: Permite peticiones desde otros dominios.  
- **helmet**: Añade seguridad a la API.  
- **morgan**: Registra las solicitudes HTTP.  
- **bcryptjs**: Cifrado de contraseñas.  
- **jsonwebtoken**: Manejo de tokens JWT para autenticación.  

### 🗄️ Dependencias por Base de Datos  

📌 **MongoDB**  
- **mongoose**: ODM para MongoDB.  

📌 **MySQL**  
- **mysql2**: Cliente para MySQL.  
- **sequelize**: ORM para bases de datos SQL.  

📌 **PostgreSQL**  
- **pg**: Cliente para PostgreSQL.  
- **pg-hstore**: Manejador para JSON en PostgreSQL.  
- **sequelize**: ORM para bases de datos SQL.  

## 📜 Archivos Principales  

📂 **src/app.js**  
Contiene la configuración principal del servidor Express, rutas y middlewares.  

📂 **src/routes/index.js**  
Define las rutas principales de la API.  

📂 **src/controllers/indexController.js**  
Contiene la lógica para manejar las solicitudes a las rutas.  

📂 **src/middleware/auth.js**  
Middleware para autenticación, se puede personalizar según el proyecto.  

📂 **Configuraciones de Base de Datos**  
Según la base de datos seleccionada, se generará uno de los siguientes archivos:  

- **MongoDB**: `src/config/config-mongo.js`  
- **MySQL**: `src/config/config-mysql.js`  
- **PostgreSQL**: `src/config/config-postgres.js`  

## 🤝 Contribuciones  

Si deseas mejorar este generador, ¡eres bienvenido a contribuir! Asegúrate de seguir buenas prácticas de desarrollo para mantener el código claro y eficiente.  

## 📄 Licencia  

Este proyecto está bajo la licencia **MIT**.  

---

✨ ¡Gracias por usar este generador de proyectos base para Node.js y Express! 🚀
