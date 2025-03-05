import express from 'express';
import dotenv from 'dotenv';
import bodyParse from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { authMiddleware } from './middleware/authMiddleware';
import tenantRoutes from './routes/tenantRoutes';
import managerRoutes from './routes/managerRoutes';

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
app.get('/',  (req, res) => {
    res.send('this is home route');
});
app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes);
app.use("/managers", authMiddleware(["manager"]), managerRoutes);
/* server */
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);