import express, { json } from 'express'
import fs from 'fs'
import path from 'path'
import { nextTick } from 'process'
import morgan from 'morgan'
// import api from './routes/api.js'

const __dirname = path.resolve()
const PORT = 3000
const app = express()
const jsonParser = express.json()
const filePath = 'ToDos.json'
app.use(express.json())
app.use(morgan());

app

    .route('/api/todos')
    .get((req) => {req.xxx = 123; next()}, (req, res) => {
        console.log(req.xxx);
        const data = fs.readFileSync(filePath,"utf8");
        let todos = JSON.parse(data)
        console.log(req.query)
        
        if (req.query.filterBy === 'done') {
            todos = todos.filter(todo => todo.done === true)
        }
        if (req.query.filterBy === 'undone') {
            todos = todos.filter(todo => todo.done === false)
        }

        if (req.query.order === 'asc') {
            todos.sort((a, b) => a.id - b.id)
        }
        if (req.query.order === 'desc') {
            todos.sort((a, b) => b.id - a.id)
        }
        
        res.send(todos);
    })
    .post((req, res) => {
        if (req.body.name === undefined) return res.sendStatus(400)
        console.log(req.body.name)

        const now = new Date()
        const todoId = Number(now)
        const name = req.body.name
        const date = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`

        const todo = {
            "id": todoId,
            "name": name,
            "done": false,
            "createdAt": date
        }

        let data = fs.readFileSync(filePath, 'utf-8')
        let todos = JSON.parse(data)
        

        todos.push(todo)
        data = JSON.stringify(todos)

        fs.writeFileSync('ToDos.json', data)
        res.send(todo)
    })


app 
    .route('/api/todos/:id')
    .delete((req, res) => {
        const id = req.params.id
        let data = fs.readFileSync(filePath, 'utf-8')
        let todos = JSON.parse(data)

        todos = todos.filter(todo => String(todo.id) !== id)
        
        data = JSON.stringify(todos)
        fs.writeFileSync('ToDos.json', data)
        res.send(todos)
    })
    .put((req, res) => {
        const id = req.params.id
        const name = req.body.name
        const done = req.body.done
        let data = fs.readFileSync(filePath, 'utf-8')
        let todos = JSON.parse(data)

        todos = todos.map(todo => {
            if (String(todo.id) === id) {
                todo.name = name
                todo.done = done 
            }
            return todo
        })

        data = JSON.stringify(todos)
        fs.writeFileSync('ToDos.json', data)
        res.send(todos)
    })

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})
