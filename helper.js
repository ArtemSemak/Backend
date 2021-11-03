import fs from "fs";

async function writeIntoFile(todos) {
  todos = JSON.stringify(todos);
  fs.writeFile("ToDos.json", todos, () => {});
}

function readFromFile(path, func) {
  fs.readFile(path, "utf8", (err, content) => {
    if (content === "") {
        func([]);
        return;
      }
    try {
      let todos = JSON.parse(content);
      func(todos);
    } catch (e) {
      throw new Error("Something went wrong")
    }
  });
}

export { writeIntoFile, readFromFile };
