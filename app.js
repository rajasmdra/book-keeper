const express = require("express");
const db = require("./database");

const app = express();
const port = 3000;

app.use(express.json());

app.get('/books', (req, res) => {
    const books = db.prepare('SELECT * FROM books').all();
    res.status(200).json({ books: books })
})

app.get('/books/:id', (req, res) => {
    const { id }  = req.params;

    const book = db.prepare('SELECT * FROM books WHERE id = ?').get(id);
    const notes = db.prepare('SELECT content FROM notes WHERE book_id = ?').all(id);

    res.status(200).json({
        book: book,
        notes: notes 
    });
})

app.post('/books', (req, res) => {
    const { title, author, year } = req.body;

    const insert = db.prepare('INSERT INTO books (title, author, year) VALUES (?, ?, ?)');
    const result = insert.run(title, author, year);

    res.status(201).json({ booksId: result.lastInsertRowid })
})

app.post('/books/:id/notes', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const insert = db.prepare('INSERT INTO notes (book_id, content) VALUES (?, ?)')
})

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    
    const deleteBook = db.prepare('DELETE FROM books WHERE id = ?');
    const result = deleteBook.run(id);
    
    res.status(200).json({ deletedBookId: id });
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})