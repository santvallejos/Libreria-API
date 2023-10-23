import { Router } from 'express';
import { libro } from './controller.js';//la constante del contrallador

export const router = Router();

router.get('/libros', libro.getAll);//Ruta en donde se encuentran los libros
router.post('/libro', libro.add);//Ruta para agregar un libro
router.delete('/libro', libro.delete);//Ruta para eliminar un libro por id
router.delete('/libro', libro.delete);//Ruta para eliminar un libro por ISBN
router.put('/libro', libro.update);//Ruta para actualizar un libro
router.get('/libro', libro.getOne);//Consultar id