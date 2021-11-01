import express, { json } from 'express'
import apiTodos from './routes/api.todos.js'
import apiTodo from './routes/api.todo.js'

const PORT = 3000
const app = express()
const filePath = 'ToDos.json'
app.use(express.json())
app.use('/api/todo', apiTodo)
app.use('/api/todos', apiTodos)


    


app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})
