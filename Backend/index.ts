import express from 'express';
import mysqldb from "./MySqlDb";
import newsRouter from "./Routers/NewsRouter";
import commentsRouter from "./Routers/commentsRouter";
import cors from "cors"
import multer from "multer";

const app = express();
const port = 8083;
const upload = multer();

app.use(cors());
app.use(upload.none());
app.use(express.json());

app.use('/news', newsRouter);
app.use('/comments', commentsRouter);




const run = async () => {
    try {
        await mysqldb.init();
        console.log('Connected');
        app.listen(port, () => {
            console.log(`Server started on ${port} port!`);
        });
    } catch (error) {
        console.error('Error connecting to the MySQL database:', error);
    }
};
run().catch(console.error);