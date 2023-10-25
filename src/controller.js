//Usuamos un pool para generar un pool de conexiones paralelas
import {pool} from './database.js';

class libroController{
    //Traer los datos de la base de datos
    //async y await nos brindan que nuestas cosnultas sean asincronas 
    async getAll(req, res){
        try{
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);//Enviar nuestra respuesta en json al cliente
    }catch(error){
        res.status(500).json({"Error": "Ocurrio un erro al cargar los libros."});
    }
    }

    //Consultar libro por id
    async getOne(req, res){
        try{
            const libro = req.body;
            const id = parseInt(libro.id);
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

    //Creacion de datos
    async add(req, res){
        try{
        const libro = req.body;//Recibir los datos que coloque el cliente en el body y guardarlo en la constante
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, añopublicacion, isbn) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.isbn]);
        res.json({"Id insertado": result.insertId});
    }catch(error){
        console.error(error);
        res.status(500).json({"Error": "Hubo un error al añadir el libro, compruebe los campos requeridos."});
    }
    }

    //ELiminar mediante isbn
    async deleteISBN(req, res){
        try{
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros WHERE isbn=(?)`, [libro.isbn]);
        if(result.affectedRows > 0){
        res.json({"Registros eliminado": result.affectedRows});
        }else{
            res.status(404).json({"Error": `No se ecnotró ningún libro con el ISBN ${libro.isbn}`})
        }
    }catch(e){
        console.log(e);
        res.status(500).json({"Error": "Ocurrio un error al eliminar el libro"});
    }
    }

    //Eliminar mediante id
    async deleteID(req, res){
        try{
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros WHERE id=(?)`, [libro.id]);
        if(result.affectedRows > 0){
            res.json({"Registros eliminado": result.affectedRows});
        }else{
            res.status(404).json({"Error": `No se ecnotró ningún libro con el id ${libro.id}`})
        }
    }catch(error){
        res.status(500).json({"Error": "Ocurrio un error al eliminar el libro"});
    }
    }

    //Actualizar libro
    async update(req, res){
        try{
        const libro = req.body;
        const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), añopublicacion=(?), isbn=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.isbn, libro.id]);
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

//Exportar para que sea visible fuera de este archivo
export const libro = new libroController();