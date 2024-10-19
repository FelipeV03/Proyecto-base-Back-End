module.exports = function (plop) {
    // Generador para crear la estructura base del proyecto
    plop.setGenerator('express-app', {
        description: 'Genera una estructura inicial para un proyecto con Node.js y Express',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Project Name (in PascalCase):',
            },
            {
                type: 'list',
                name: 'dbType',
                message: '¿Qué tipo de base de datos usarás?',
                choices: ['MongoDB', 'MySQL', 'PostgreSQL']
            },
        ],
        actions: function(data) {
            let actions = [
                {
                    type: 'add',
                    path: '{{pascalCase name}}/src/routes/index.js',
                    templateFile: 'plop-templates/routes.hbs'
                },
                {
                    type: 'add',
                    path: '{{pascalCase name}}/src/controllers/indexController.js',
                    templateFile: 'plop-templates/controllers.hbs'
                },
                {
                    type: 'add',
                    path: '{{pascalCase name}}/src/middleware/auth.js',
                    templateFile: 'plop-templates/middleware.hbs'
                },
                {
                    type: 'add',
                    path: '{{pascalCase name}}/src/app.js',
                    templateFile: 'plop-templates/app.hbs'
                },
                {
                    type: 'add',
                    path: '{{pascalCase name}}/src/.env',
                    templateFile: 'plop-templates/env.hbs'
                }
            ];

            // Agregamos las configuraciones de base de datos según la elección del usuario
            if (data.dbType === 'MongoDB') {
                actions.push({
                    type: 'add',
                    path: '{{pascalCase name}}/src/config/config-mongo.js',
                    templateFile: 'plop-templates/config-mongo.hbs'
                });
            }

            if (data.dbType === 'MySQL') {
                actions.push({
                    type: 'add',
                    path: '{{pascalCase name}}/src/config/config-mysql.js',
                    templateFile: 'plop-templates/config-mysql.hbs'
                });
            }

            if (data.dbType === 'PostgreSQL') {
                actions.push({
                    type: 'add',
                    path: '{{pascalCase name}}/src/config/config-postgres.js',
                    templateFile: 'plop-templates/config-postgres.hbs'
                });
            }

            return actions;
        }
    });
};
