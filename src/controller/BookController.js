//Usuamos un pool para generar un pool de conexiones paralelas
import {pool} from '../data/database.js'

class BookController{

    //GET
    async getAll(req, res){
        try{
        //query a la base de datos
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);//Enviar nuestra respuesta en json al cliente
        }catch(error){
            res.status(500).json({"Error": "Ocurrio un erro al cargar los libros."});
        }
    }

    //GET{id}
    async getOne(req, res){
        try{
            const book = req.body;
            const id = parseInt(book.id);
            //query a la base de datos
            const [result] =  await pool.query(`SELECT * FROM libros WHERE id=(?)`, [id]);
        if( result[0] != undefined){
            res.json(result);
        }else{
            res.json({"Error": "No se a encontrado un libro con el id especifico"});
        }
        }catch(e){
        console.log(e);
        res.status(500).json({"Error": "Ocurrio un erro al buscar el libro."});
        }
    }

    //POST
    async add(req, res){
        try{
        const book = req.body;//Recibir los datos que coloque el cliente en el body y guardarlo en la constante
        //query a la base de datos
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, url,añopublicacion, isbn) VALUES (?, ?, ?, ?, ?, ?)`, [book.nombre, book.autor, book.categoria, book.url,book.añopublicacion, book.isbn]);
        res.json({"Id insertado": result.insertId});
        }catch(error){
            console.error(error);
            res.status(500).json({"Error": "Hubo un error al añadir el libro, compruebe los campos requeridos."});
        }
    }

    //DELETE{ISBN}
    async deleteISBN(req, res){
        try{
        const book = req.body;
        //query a la base de datos
        const [result] = await pool.query(`DELETE FROM libros WHERE isbn=(?)`, [book.isbn]);
        if(result.affectedRows > 0){
        res.json({"Registros eliminado": result.affectedRows});
        }else{
            res.status(404).json({"Error": `No se ecnotró ningún libro con el ISBN ${book.isbn}`})
        }
        }catch(e){
            console.log(e);
            res.status(500).json({"Error": "Ocurrio un error al eliminar el libro"});
        }
    }

    //DELETE{id}
    async deleteID(req, res){
        try{
        const book = req.body;
        //query a la base de datos
        const [result] = await pool.query(`DELETE FROM libros WHERE id=(?)`, [book.id]);
        if(result.affectedRows > 0){
            res.json({"Registros eliminado": result.affectedRows});
        }else{
            res.status(404).json({"Error": `No se ecnotró ningún libro con el id ${book.id}`})
        }
    }catch(error){
        res.status(500).json({"Error": "Ocurrio un error al eliminar el libro"});
    }
    }

    //PUT
    async update(req, res){
        try{
        const book = req.body;
        //query a la base de datos
        const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), url=(?),añopublicacion=(?), isbn=(?) WHERE id=(?)`, [book.nombre, book.autor, book.categoria, book.url,book.añopublicacion, book.isbn, book.id]);
        if(result.changedRows === 0){
            throw new Error('No se encontró un libro con el ID proporcionado o los datos proporcionados ya existen.')
        }
        res.json({"Registros actualizados": result.changedRows});
        }catch(error){
            console.error(error);
                res.status(500).json({"Error": 'Hubo un error al actualizar el libro, compruebe los campos requeridos.' });
        }
    }
}

//Exportar el controllador
export const book = new BookController();