// Importación de módulos de Node.js
const { execSync } = require('child_process'); // Permite ejecutar comandos en la terminal
const fs = require('fs'); // Permite manejar archivos del sistema

module.exports = function (plop) {
    /**
     * Acción personalizada para ejecutar comandos en la terminal.
     * 
     * Se utiliza para ejecutar comandos de configuración del proyecto como:
     * - `npm init -y`: Inicializar un nuevo proyecto con package.json.
     * - `npm install`: Instalar dependencias necesarias.
     * 
     * @param {object} answers - Respuestas ingresadas por el usuario.
     * @param {object} config - Configuración del comando a ejecutar.
     * @param {string} config.command - Comando que se ejecutará en la terminal.
     * @param {string} config.path - Ruta donde se ejecutará el comando.
     * @returns {string} Mensaje indicando el comando ejecutado.
     */
    plop.setActionType('executeShell', function (answers, config) {
        try {
            execSync(config.command, { stdio: 'inherit', cwd: config.path }); // Ejecuta el comando en la ruta del proyecto
            return `Ejecutado: ${config.command}`;
        } catch (error) {
            throw new Error(`Error al ejecutar: ${config.command}\n${error.message}`);
        }
    });

    /**
     * Generador de proyectos Node.js con Express y soporte para bases de datos.
     * 
     * Este generador permite:
     * - Crear una estructura base para un backend en Node.js.
     * - Instalar dependencias esenciales.
     * - Configurar la base de datos elegida por el usuario.
     */
    plop.setGenerator('express-app', {
        description: 'Genera una estructura inicial para un proyecto con Node.js y Express',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Nombre del proyecto (en PascalCase):',
            },
            {
                type: 'list',
                name: 'dbType',
                message: '¿Qué tipo de base de datos usarás?',
                choices: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLServer']
            },
        ],
        actions: function (data) {
            let projectPath = `./${data.name}`; // Ruta donde se creará el proyecto

            let actions = [
                /**
                 * Creación de la estructura de archivos base:
                 * - Rutas (routes/)
                 * - Controladores (controllers/)
                 * - Middleware (middleware/)
                 * - Configuración (.env)
                 */
                { type: 'add', path: '{{pascalCase name}}/src/routes/index.js', templateFile: 'plop-templates/routes.hbs' },
                { type: 'add', path: '{{pascalCase name}}/src/controllers/indexController.js', templateFile: 'plop-templates/controllers.hbs' },
                { type: 'add', path: '{{pascalCase name}}/src/middleware/auth.js', templateFile: 'plop-templates/middleware.hbs' },

                // Agregar archivo .gitignore para ignorar node_modules y archivos sensibles
                { type: 'add', path: '{{pascalCase name}}/.gitignore', template: 'node_modules/\n.env' },

                // Inicializar npm y crear package.json
                { type: 'executeShell', command: 'npm init -y', path: projectPath },

                // Modificar package.json para agregar scripts de inicio y desarrollo
                {
                    type: 'modify',
                    path: '{{pascalCase name}}/package.json',
                    pattern: '"scripts": {',
                    template: `"scripts": {\n    "start": "node src/app.js",\n    "dev": "nodemon src/app.js",`
                },

                // Instalación de dependencias esenciales
                {
                    type: 'executeShell',
                    command: 'npm install express dotenv colors cors helmet morgan bcryptjs jsonwebtoken',
                    path: projectPath
                },

                // Instalación de nodemon como dependencia de desarrollo para recarga automática
                {
                    type: 'executeShell',
                    command: 'npm install --save-dev nodemon',
                    path: projectPath
                }
            ];

            /**
             * Instalación de dependencias y configuración según la base de datos elegida.
             * Se agregan los paquetes, archivos de configuración y variables de entorno correspondientes.
             */
            if (data.dbType === 'MongoDB') {
                actions.push(
                    // Archivo de configuración para MongoDB
                    { type: 'add', path: '{{pascalCase name}}/src/config/config-mongo.js', templateFile: 'plop-templates/templates-config/config-mongo.hbs' },

                    // Instalación de Mongoose para MongoDB
                    { type: 'executeShell', command: 'npm install mongoose', path: projectPath },

                    // Generación de app.js específico para MongoDB
                    { type: 'add', path: '{{pascalCase name}}/src/app.js', templateFile: 'plop-templates/templates-app/app-mongo.hbs' },

                    // Archivo .env personalizado para MongoDB
                    { type: 'add', path: '{{pascalCase name}}/.env', templateFile: 'plop-templates/templates-env/env-mongo.hbs' }
                );
            }

            if (data.dbType === 'MySQL') {
                actions.push(
                    // Archivo de configuración para MySQL
                    { type: 'add', path: '{{pascalCase name}}/src/config/config-mysql.js', templateFile: 'plop-templates/templates-config/config-mysql.hbs' },

                    // Instalación de MySQL2 y Sequelize para MySQL
                    { type: 'executeShell', command: 'npm install mysql2 sequelize', path: projectPath },

                    // Generación de app.js específico para MySQL
                    { type: 'add', path: '{{pascalCase name}}/src/app.js', templateFile: 'plop-templates/templates-app/app-mysql.hbs' },

                    // Archivo .env personalizado para MySQL
                    { type: 'add', path: '{{pascalCase name}}/.env', templateFile: 'plop-templates/templates-env/env-mysql.hbs' }
                );
            }

            if (data.dbType === 'PostgreSQL') {
                actions.push(
                    // Archivo de configuración para PostgreSQL
                    { type: 'add', path: '{{pascalCase name}}/src/config/config-postgres.js', templateFile: 'plop-templates/templates-config/config-postgres.hbs' },

                    // Instalación de pg y Sequelize para PostgreSQL
                    { type: 'executeShell', command: 'npm install pg pg-hstore sequelize', path: projectPath },

                    // Generación de app.js específico para PostgreSQL
                    { type: 'add', path: '{{pascalCase name}}/src/app.js', templateFile: 'plop-templates/templates-app/app-postgres.hbs' },

                    // Archivo .env personalizado para PostgreSQL
                    { type: 'add', path: '{{pascalCase name}}/.env', templateFile: 'plop-templates/templates-env/env-postgres.hbs' }
                );
            }

            if (data.dbType === 'SQLServer') {
                actions.push(
                    // Archivo de configuración para SQL Server
                    { type: 'add', path: '{{pascalCase name}}/src/config/config-sqlserver.js', templateFile: 'plop-templates/templates-config/config-sqlserver.hbs' },

                    // Instalación de pg y Sequelize para SQL Server
                    { type: 'executeShell', command: 'npm install mssql', path: projectPath },

                    // Generación de app.js específico para SQL Server
                    { type: 'add', path: '{{pascalCase name}}/src/app.js', templateFile: 'plop-templates/templates-app/app-sqlserver.hbs' },

                    // Archivo .env personalizado para SQL Server
                    { type: 'add', path: '{{pascalCase name}}/.env', templateFile: 'plop-templates/templates-env/env-sqlserver.hbs' }
                );
            }
            return actions;
        }
    });
};
