import express from "express";
import fs from 'fs'
const filePath = 'ToDos.json'
const router = express.Router()

router 
    .route('/:uuid')
    .delete(async (req, res) => {
        const uuid = req.params.uuid
        let todos = []
        fs.readFile(filePath, 'utf-8', (err, content) => {
            if (content === ''){
                res.status(404).send('Task not found')
            } else {
                todos = JSON.parse(content)
                const filteredTodos = todos.filter(todo => String(todo.uuid) !== uuid)
                if (filteredTodos.length === todos.length) {
                    res.status(404).send('Task not found')
                } else {
                    res.send(todos)
                    todos = JSON.stringify(todos)
                    fs.writeFileSync('ToDos.json', todos)
                }
            }
        })
        

        
        
    })
    .put((req, res) => {
        const uuid = req.params.uuid
        const name = req.body.name
        const done = req.body.done
        if (name === undefined || done === undefined || Object.keys(req.body).length > 2) {
            res.status(422).send('Invalid fields in request')
        } else {
            let todos = []
            fs.readFile(filePath, 'utf-8', (err, content) => {
                todos = JSON.parse(content)
                todos = todos.map(todo => {
                    if (String(todo.uuid) === uuid) {
                        todo.name = name
                        todo.done = done 
                    }
                    return todo
                })
                res.send(todos)
                todos = JSON.stringify(todos)
                fs.writeFileSync('ToDos.json', todos)
            })
        }
        

        

        
        
    })

router.post('/', (req, res) => {
    
    if (req.body.name === undefined || Object.keys(req.body).length > 1) {
        res.status(422).send('Invalid fields in request')
    } else {
        const now = new Date()
        const todoId = Number(now)
        const name = req.body.name
        const date = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`
        let todos = []
        const todo = {
            "uuid": todoId,
            "name": name,
            "done": false,
            "createdAt": date
        }

        fs.readFile(filePath, 'utf-8', (err, content) => {
            todos = JSON.parse(content)
            todos.push(todo)
            res.send(todo)
            todos = JSON.stringify(todos)
            fs.writeFileSync('ToDos.json', todos)
        })
    }

})

    export default router