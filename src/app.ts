import express, { type Application, type Request, type Response } from "express"
import { pool } from "./db"
import { userRoute } from "./modules/user/user.route"

const app: Application = express()
// export const port = config.port
// use middler for post method.
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.use('/api/users',userRoute)
app.get('/', (req: Request, res: Response) => {
  // res.send('Express Server')
  res.status(200).json({ 'message': 'Express Server', 'author': 'Next Level' })
});



export default app;

