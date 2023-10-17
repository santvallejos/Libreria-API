//Usuamos un pool para generar un pool de conexiones paralelas
import {pool} from './database.js';

class libroController{
    //Traer los datos de la base de datos
    //async y await nos brindan que nuestas cosnultas sean asincronas 
    async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);//Enviar nuestra respuesta en json al cliente
    }

    //Creacion de datos
    async add(req, res){
        const libro = req.body;//Recibir los datos que coloque el cliente en el body y guardarlo en la constante
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, añopublicacion, isbn) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.isbn]);
        res.json({"Id insertado": result.insertId});
    }

    async delete(req, res){
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros WHERE id=(?)`, [libro.id]);
        res.json({"Registros eliminados": result.affectedRows});
    }

    async update(req, res){
        const libro = req.body;
        const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), añopublicacion=(?), isbn=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.isbn, libro.id]);
        res.json({"Registros actualizados": result.changedRows});
    }

    async getOne(req, res){
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
    }
}

//Exportar para que sea visible fuera de este archivo
export const libro = new libroController();