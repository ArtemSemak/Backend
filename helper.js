import fs from "fs";

function writeIntoFile(todos) {
  todos = JSON.stringify(todos);
    fs.writeFileSync("ToDos.json", todos);
  
}

function readFromFile(path, func) {
    fs.readFile(path, "utf8", (err, content) => {
        try{
        let todos = JSON.parse(content);
        func(todos)
        } catch(e) {
            func([])
        }
        
    })
    
}

export { writeIntoFile, readFromFile };
