import express, { type Application, type Request, type Response } from "express"
const app: Application = express()
const port = 5000

// use middler for post method.
app.use(express.json())

// get method
app.get('/', (req: Request, res: Response) => {
  // res.send('Express Server')
  res.status(200).json({ 'message': 'Express Server', 'author': 'Next Level' })
});

// post method
app.post('/', async (req: Request, res: Response) => {
  console.log(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})