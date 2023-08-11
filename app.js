import express from "express"
import { getNotes, getNote, createNote, deleteNote } from "./repository.js"

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())   // any json-object will be accpeted and passed to the 'req' e.g. in POST

app.get("/notes", async (req,res) => {
    const notes = await getNotes();
    res.send(notes)
})

app.get("/note/:id", async (req,res) => {
    const id = req.params.id;
    const result = await getNote(id);
    res.send(result)
})

app.post("/note", async (req,res) => {
    const { title, contents } = req.body;
    const result = await createNote(title,contents)
    res.status(201).send(result)
})

app.delete("/note/:id", async (req,res) => {
    const id = req.params.id;
    const result = await deleteNote(id)
    res.status(200).send(result)
})



// TODO: Middleware for Error-handling

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


