
import express, { Request, Response, Express } from "express";
import appRouter from './routes';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('OK');
});

app.use(appRouter);

app.listen(port, () => { console.log(`Server started at http://localhost:${port}`) });