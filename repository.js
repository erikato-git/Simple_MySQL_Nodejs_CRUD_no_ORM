import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()


export async function getNotes(){
    const [result] = await pool.query("SELECT * FROM notes")
    return result
}

export async function getNote(id){
    const [result] = await pool.query(`SELECT * FROM notes WHERE id = ${id}`)
    return result
}

export async function createNote(title,contents){
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)`, [title,contents] )
    const id = result.insertId
    return getNote(id)
}

export async function deleteNote(id){
    const [result] = await pool.query(`
    DELETE FROM notes WHERE id = ?`, [id] )
    console.log(result)
    return getNote(id)
}



// const result = await getNotes()
// const result = await createNote("test-title","test-content")
// console.log(result)




