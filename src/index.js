import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import routes from './routes/index.routes.js'

const app = express(); 

config(); 

const PORT = process.env.SERVER_PORT || 3000; 

app.use(cors()); 
app.use(express.json()); 

app.use(routes)

app.listen(PORT, () => { 
    console.log(`Servidor corriendo en el puerto ${PORT}`); 
});
