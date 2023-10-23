const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')

//Routes dependencies
const bootcampsRoutes = require('./routes/bootcampsRoutes')
//Routes dependencies
const coursesRoutes = require('./routes/coursesRoutes')

//Objecto app
const app = express()

//Pairing routes
app.use('/bootcamps', bootcampsRoutes)
app.use('/courses', coursesRoutes)

//Configurar variables de entorno
dotenv.config(
    {
        path: './config/.env'
    }
)

//prueba de URL
app.get('/test', (request, response)=>{ //This is an endpoint
    response.send('Hello there!')
})

//ruta parametrizada
app.get('/test/:id', (request, response)=>{ //This is an endpoint
    response.send(`Parámetro enviado: ${request.params.id}`)
})

//Tomar variable - puerto del entorno
const port = process.env.PORT



//Servidor de Dev
app.listen(port, function(){
    console.log(`The server is being executed... ${port}`.bgMagenta.black.inverse)
})