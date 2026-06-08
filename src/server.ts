import { ParameterStatusMessage } from './../node_modules/pg-protocol/src/messages';
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
      email VARCHAR(20) UNIQUE NOT NULL,
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

app.get('/', (req: Request, res: Response) => {
  // res.send('Express Server')
  res.status(200).json({ 'message': 'Express Server', 'author': 'Next Level' })
});

// post method
app.post('/api/users', async (req: Request, res: Response) => {
  // console.log(req.body)
  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(`
    INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)
    RETURNING *
    `, [name, email, password, age])
    // console.log(result)
    res.status(201).json({
      success: true,
      message: "User Created Successfully!",
      data: result.rows[0],
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    })
  }
})

// get method (to get all the data at a time)
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users
      `)
    res.status(200).json({
      success: true,
      message: 'User Retrived Successfully',
      data: result.rows
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
})

// get method (specific id matched data shows)
app.get('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await pool.query(`
      SELECT * FROM users
      WHERE id = $1
      `, [id])
    // console.log(result)
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User Not Found!',
        data: {}
      })
    }
    res.status(200).json({
      success: true,
      message: 'User Retrived Successfully',
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
})

// put method
app.put('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, password, age, is_active } = req.body
  // console.log("ID: ", id)
  // console.log(name, password, age, is_active)
  try {
    const result = await pool.query(`
    UPDATE users SET name=$1,password=$2,age=$3,is_active=$4
    WHERE id=$5 RETURNING *
    `, [name, password, age, is_active, id])

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User Not Found!'
      })
    }
    // console.log(result)
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})