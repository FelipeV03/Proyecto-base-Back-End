// Importación de módulos de Node.js
const { execSync } = require('child_process'); // Permite ejecutar comandos en la terminal
const fs = require('fs'); // Permite manejar archivos del sistema

module.exports = function (plop) {
    /**
     * Acción personalizada para ejecutar comandos en la terminal.
     * 
     * Se utiliza en este generador para ejecutar comandos como:
     * - `npm init -y`: Inicializar un nuevo proyecto con package.json.
     * - `npm install`: Instalar dependencias necesarias.
     * 
     * @param {object} answers - Respuestas ingresadas por el usuario.
     * @param {object} config - Configuración del comando a ejecutar.
     * @param {string} config.command - El comando a ejecutar en la terminal.
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
     * Este generador crea la estructura base de un backend en Node.js, instala las
     * dependencias esenciales y configura la base de datos seleccionada por el usuario.
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
                choices: ['MongoDB', 'MySQL', 'PostgreSQL']
            },
        ],
        actions: function (data) {
            let projectPath = `./${data.name}`; // Define la ruta donde se creará el proyecto

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
                { type: 'add', path: '{{pascalCase name}}/src/app.js', templateFile: 'plop-templates/app.hbs' },
                { type: 'add', path: '{{pascalCase name}}/src/.env', templateFile: 'plop-templates/env.hbs' },

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
             * Instalación de dependencias específicas según la base de datos elegida.
             * Se agregan los paquetes necesarios para conectar y manejar cada tipo de base de datos.
             */
            if (data.dbType === 'MongoDB') {
                actions.push(
                    { type: 'add', path: '{{pascalCase name}}/src/config/config-mongo.js', templateFile: 'plop-templates/config-mongo.hbs' },
                    { type: 'executeShell', command: 'npm install mongoose', path: projectPath } // ORM para MongoDB
                );
            }

            if (data.dbType === 'MySQL') {
                actions.push(
                    { type: 'add', path: '{{pascalCase name}}/src/config/config-mysql.js', templateFile: 'plop-templates/config-mysql.hbs' },
                    { type: 'executeShell', command: 'npm install mysql2 sequelize', path: projectPath } // ORM para MySQL
                );
            }

            if (data.dbType === 'PostgreSQL') {
                actions.push(
                    { type: 'add', path: '{{pascalCase name}}/src/config/config-postgres.js', templateFile: 'plop-templates/config-postgres.hbs' },
                    { type: 'executeShell', command: 'npm install pg pg-hstore sequelize', path: projectPath } // ORM para PostgreSQL
                );
            }

            return actions;
        }
    });
};
