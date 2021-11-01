import express from "express";
import fs from 'fs'

const router = express.Router()
const filePath = 'ToDos.json'

router.get('/', (req, res) => {
        let todos = []
        fs.readFile(filePath,"utf8", (err, content) => {
            if (content === ''){
                res.send([])
            } else {
                todos = JSON.parse(content)
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
            }
        });
    })

export default router