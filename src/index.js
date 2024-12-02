//Elementos importados
import cors from 'cors';//Importar cors para su implementacion en el front sin declarar variables
import express from 'express';//Servidor de la api-rest
import morgan from 'morgan';//Mostrar por consola las solicitudes los clientes
import { router } from './routes.js';

const app = express();

//Puerto
app.set('port', 3000);

app.use(morgan('dev'));//Solicitudes de los clientes
app.use(cors());
app.use(express.json());//Interpretar los datos que se envian
app.use(router);

app.listen(app.get('port'), () =>{//Definir una funcion con paso de parametros al metodo listen
    console.log(`Server on port ${app.get('port')}`);//Mostrar por consola que el puerto se va a estar escuchando por el puerto 3000
});