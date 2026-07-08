import express from 'express'
import router from './router/routerAutch.js'
import dotenv from 'dotenv'

const app = express()
app.use(express.json())

app.use('/', router)

const port = process.env.PORT
app.listen(port|| 3000, ()=>{
    console.log(
        `Server rodando na port ${port}`
    )
})