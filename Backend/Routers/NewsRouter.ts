import express from "express";
import mysqldb from "../MySqlDb";
import multer from 'multer';
import {New, NewMutation} from "../Type";
import {ResultSetHeader} from "mysql2";
const newsRouter = express.Router();
const upload = multer({ dest: 'uploads/' });
newsRouter.get('/', async (req, res) => {
    const result = await mysqldb.getConnection().query(
        'SELECT * FROM news'
    );
    const News = result[0] as New[]
    return res.send(News);
});

newsRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const result = await mysqldb.getConnection().query(
        'SELECT * FROM news WHERE id = ? ',
        [id]
    );
    const news = result[0] as New[]
    if (news.length ===  0) {
        return res.status(404).send({error:'sorry'})
    }
    return res.send(news);
});

newsRouter.post('/',upload.single('image'), async (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({ error: 'Required fields are missing' });
    }
    const Anew: NewMutation = {
        title:req.body.title,
        content:req.body.content,
        image: req.file ? req.file.path : null,
    }

    const InsertResult = await mysqldb.getConnection().query(
        'INSERT INTO news (title , content , image_url) VALUES (? , ? , ?)',
        [Anew.title, Anew.content, Anew.image],
    );

    const resultHeader = InsertResult[0] as ResultSetHeader;
    const getNewResult = await mysqldb.getConnection().query(
        'SELECT * FROM news WHERE id = ?',
        [resultHeader.insertId]
    );
    const news = getNewResult[0] as New[];
    return res.send(news[0]);
});

newsRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.status(400).send({ error: 'sorry,you need to choose number ' });
    }
        const connection = await mysqldb.getConnection();

    await connection.query(
        'DELETE FROM comments WHERE news_id = ?',
        [id]
    );

    const [result] = await connection.query(
        'DELETE FROM news WHERE id = ?',
        [id]
    );
    const resultHeader = result as ResultSetHeader;

    if (resultHeader.affectedRows === 0) {
        return res.status(404).send({ error: 'News not found' });
    }
    return res.send({ message: 'deleted successfully' });

});
export default newsRouter