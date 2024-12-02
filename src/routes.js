import { Router } from 'express';
import { book } from './controller/BookController.js';//la constante del contrallador

export const router = Router();

router.get('/books', book.getAll);//Ruta en donde se encuentran los libros
router.get('/bookID', book.getOne);//Consultar id
router.post('/addBook', book.add);//Ruta para agregar un libro
router.put('/updateBook', book.update);//Ruta para actualizar un libro
router.delete('/deleteBookISBN', book.deleteISBN);//Ruta para eliminar un libro por id
router.delete('/deleteBookID', book.deleteID);//Ruta para eliminar un libro por ISBN