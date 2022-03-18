import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import errromiddleware from './middleware/middleware';
import routes from './routes';
import config from './config';
// import db from './database';
// import { Client } from 'pg';

const app: express.Application = express();
const port = config.port || 3000;

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(helmet());


app.use('/api', routes);

app.get('/', function (req: Request, res: Response) {
    res.json({
        message: 'Hello World!',
    });
});


app.use(errromiddleware);

app.use((_req: Request, res: Response) => {
    res.status(404).json({
        message: 'You are lost',
    });
});


app.listen(3000, function () {
    console.log(`Server is starting on port: ${port}`)
});

export default app;