import express from 'express';
import dotenv from 'dotenv';
import bodyParse from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

/*routes*/

/*configurations*/

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common")); 
app.use(bodyParse.urlencoded({ extended: false }));
app.use(cors());

/* routes */
app.get('/', (req, res) => {
    res.send('this is home route');
});

/* server */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);