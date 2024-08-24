import express from "express";
import mysqldb from "../MySqlDb";
import {Comment, NewsCheckResult,} from "../Type";
import {ResultSetHeader} from "mysql2";
const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
    const newsId = req.query.news_id;

    if (newsId) {
        const result = await mysqldb.getConnection().query(
            'SELECT * FROM comments WHERE news_id = ?',
            [newsId]
        );
        const Comments = result[0] as Comment[]
        return res.send(Comments);
    }

    const result = await mysqldb.getConnection().query(
        'SELECT * FROM comments'
    );
    const Comments = result[0] as Comment[]
    return res.send(Comments);
});

commentsRouter.post('/',async (req, res) => {
    const { news_id, author, text } = req.body;

    if (!news_id || !text) {
        return res.status(400).send({ error: 'Required fields are missing' });
    }

    const [newsId] = await mysqldb.getConnection().query(
        'SELECT id FROM news WHERE id = ?',
        [news_id]
    );

    if ((newsId as NewsCheckResult).length === 0) {
        return res.status(404).send({ error: 'there is not such id ' });
    }


    const InsertResult = await mysqldb.getConnection().query(
        'INSERT INTO comments (news_id , author , text) VALUES (? , ? , ?)',
        [news_id, author || 'Anonymous', text],
    );

    const resultHeader = InsertResult[0] as ResultSetHeader;
    const getNewResult = await mysqldb.getConnection().query(
        'SELECT * FROM comments WHERE id = ?',
        [resultHeader.insertId]
    );
    const news = getNewResult[0] as Comment[];
    return res.send(news[0]);
});

commentsRouter.delete('/:id', async (req, res) => {
    const commentId = parseInt(req.params.id);

    if (isNaN(commentId)) {
        return res.status(400).send({ error: 'you need to write number.' });
    }

        const deleteResult = await mysqldb.getConnection().query(
            'DELETE FROM comments WHERE id = ?',
            [commentId]
        );
        const Comments = deleteResult[0]

        const resultHeader = Comments as ResultSetHeader;
        if (resultHeader.affectedRows === 0) {
            return res.status(404).send({ error: 'Comment not found.' });
        }
        return res.send({ message: 'Comment deleted successfully.' });
});

export default commentsRouter