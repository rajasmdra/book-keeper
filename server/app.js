require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("ERROR: Variabel MONGO_URI tidak ditemukan di file .env!");
    process.exit(1); // Matikan aplikasi jika URI tidak ada
}

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Failed to connect:", err));

// CREATE TABLE
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    year: Number
});
const Book = mongoose.model("Book", bookSchema);

const noteSchema = new mongoose.Schema({
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book"},
    content: String
})
const Note = mongoose.model("Note", noteSchema);

// GET ALL BOOKS
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ books: books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// GET BOOK BY ID
app.get('/books/:id', async (req, res) => {
    try {
        const { id }  = req.params;
        const book = await Book.findById(id);
        const notes = await Note.find({ book_id: id});
    
        res.status(200).json({ book, notes });
    } catch (error) {
        res.status(500).json({ error: "Format ID tidak valid atau buku tidak ditemukan" });
    }
})

// POST NEW BOOK
app.post('/books', async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const newBook = new Book({ title, author, year });
        const savedBook = await newBook.save();
    
        res.status(201).json({ bookId: savedBook._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// POST NEW NOTE
app.post('/books/:id/notes', async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
    
        const newNote = new Note({ book_id: id, content });
        const savedNote = await newNote.save();
    
        res.status(201).json({ noteId: savedNote._id});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// DELETE BOOK
app.delete('/books/:id',  async (req, res) => {
    try {
        const { id } = req.params;
        
        await Book.findByIdAndDelete(id);
        await Note.deleteMany({ book_id: id });
        
        res.status(200).json({ 
            message: "Buku dan catatannya berhasil dihapus", 
            deletedBookId: id 
        });
    } catch (error) {
        res,status(400).json({ error: error.message });
    }
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})