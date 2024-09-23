const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { schema } = require('../models/user');
const { format } = require('morgan');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.1.0',
        info: {
            title: 'Port de Plaisance de Russel API',
            version:'1.0.0',
            description:' API de gestion des reservations de catway pour le port de plaisance de Russel',
            servers: [{ url : 'http://localhost:3000'}]
        },
        components: {
            schemas:{
                Catway: {
                    type:'object',
                    properties:{
                        catwayNumber: {
                            type:'number'
                        },
                        type:{
                            type:'string',
                            enum:['long', 'court']
                        },
                        catwayState:{
                            type:'string'
                        }
                    }
                },
                Reservation: {
                    type:'object',
                    properties:{
                        catwayNumber: {
                            type:'number'
                        },
                        clientName:{
                            type:'string'
                        },
                        boatName:{
                            type:'string'
                        },
                        checkIn:{
                            type:'string',
                            format:'date-time'
                        }, 
                        checkOut:{
                            type:'string',
                            format:'date-time'
                        }
                    }
                }
            },
        },
        
        
    },
    apis: ['./routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerDocs
};