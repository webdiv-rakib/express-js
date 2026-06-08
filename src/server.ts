import express, { type Application, type Request, type Response } from "express"
import { Pool } from "pg"

const app: Application = express()
const port = 5000

// use middler for post method.
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

// connection between project and neon database
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_C1oh6gTAGzRn@ep-twilight-dew-aog6yrcd-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20) NOT NULL,
      password VARCHAR(20) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      age INT,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `)
    console.log("Database Connected Successfully")
  } catch (error) {

  }
}
initDB();

// get method
app.get('/', (req: Request, res: Response) => {
  // res.send('Express Server')
  res.status(200).json({ 'message': 'Express Server', 'author': 'Next Level' })
});

// post method
app.post('/', async (req: Request, res: Response) => {
  // console.log(req.body)
  const { name, email, passowrd } = req.body;
  res.status(201).json({
    message: "Created",
    data: {
      name, email
    },
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})