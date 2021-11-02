import fs from "fs";

function writeIntoFile(todos) {
  todos = JSON.stringify(todos);
  try {
    fs.writeFileSync("ToDos.json", todos);
  } catch (e) {
    throw new Error("Something went wrong");
  }
}

export { writeIntoFile };
