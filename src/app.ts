import express, { type Application, type Request, type Response } from "express"
import { userRoute } from "./modules/user/user.route"
import { profileRoute } from "./modules/profile/profile.route"
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import CookieParser from "cookie-parser"
import cors from "cors"
import globalErrorHanlder from "./middleware/globalErrorHandler";

const app: Application = express();
// export const port = config.port

// use middler for post method.
app.use(CookieParser())
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
const corsOptions = {
  origin: 'http://localhost:5000',
}
app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
  // res.send('Express Server')
  res.status(200).json({ 'message': 'Express Server', 'author': 'Next Level' });
});


app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/auth', authRoute);


// Global Error Handling Middleware
app.use(globalErrorHanlder);


export default app;

