const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes');
const { Migrate } = require('./models/model');
const app = express();
const port = process.env.PORT || 3001;
require('dotenv').config()

// Swagger options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'A simple CRUD API application made with Express and documented with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.js'], // Adjust path to match your API endpoint files
};

const swaggerSpec = swaggerJSDoc(options);

app.use(bodyParser.json());
app.use(cors())
// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Main route
app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: "Hello to my server"
    }).end();
});

// Use router
app.use('/api/v1',router ); // Ensure the correct path for the router

app.listen(port, () => {
    Migrate()
    console.log(`Server is running on: http://localhost:${port}/`);
});