import express, { type Application, type Request, type Response } from "express"
import { userRoute } from "./modules/user/user.route"
import { profileRoute } from "./modules/profile/profile.route"
import { authRoute } from "./modules/auth/auth.route";
import fs from "fs"

const app: Application = express();
// export const port = config.port
// use middler for post method.
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log('Method - URL - Time:', req.method, req.url, Date.now());
  const log = `
  \nMethod -> ${req.method} 
  \nTime -> ${Date.now()}
  \nURL -> ${req.url}\n
  `;
  //to  write log 
  fs.appendFile('logger.txt', log, (error) => {
    console.log(error)
  })
  next();
});

app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/auth', authRoute)

app.get('/', (req: Request, res: Response) => {
  // res.send('Express Server')
  res.status(200).json({ 'message': 'Express Server', 'author': 'Next Level' });
});

export default app;

