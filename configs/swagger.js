import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "coperex API",
            version: "1.0.0",
            description: " Api robusta para gestion de ingegracion de socios y empresas para feria Interfer",
            contact:{
                name: "Joseph Ramirez",
                email: "jramirez-2023013@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/coperex/v1"
            }
        ]
    },
    apis:[
       
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}