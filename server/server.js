
import express from 'express'
import routes from '../routes/routes.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT|| 9090;

app.use(express.static('./public'))
app.use(bodyParser.json());
app.use(cors())
app.use('/', routes)

app.listen(PORT, ()=>console.log(`ouvindo a porta http://localhost:${PORT}`))