require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Failed to connect:", err));

// CREATE TABLE

const categorySchema = new mongoose.Schema({
    category: String
});
const Category = mongoose.model("Category", categorySchema);

const publisherSchema = new mongoose.Schema({
    publisher: String
});
const Publisher = mongoose.model("Publisher", publisherSchema);

const bookSchema = new mongoose.Schema({
    title: String,
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    author: String,
    publisher_id: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher"},
    year: Number,
    page: Number,
    description: String,
    imagelink: String
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
        const books = await Book.find().populate('category_id').populate('publisher_id');
        res.status(200).json({ books: books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// GET ALL CATEGORY
app.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// GET ALL PUBLISHER
app.get('/publishers', async (req, res) => {
    try {
        const publishers = await Publisher.find();
        res.status(200).json({ publishers });
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

// POST NEW CATEGORY
app.post('/categories', async (req, res) => {
    try {
        const { category } = req.body;
        const newCategory = new Category({ category });
        const savedCategory = await newCategory.save();
    
        res.status(201).json({ categoryId: savedCategory._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// POST NEW PUBLISHER
app.post('/publishers', async (req, res) => {
    try {
        const { publisher } = req.body;
        const newPublisher = new Publisher({ publisher });
        const savedPublisher = await newPublisher.save();
    
        res.status(201).json({ publisherId: savedPublisher._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// POST NEW BOOK
app.post('/books', async (req, res) => {
    try {
        const { title, category_id, author, publisher_id, year, page, description, imagelink } = req.body;
        const newBook = new Book({ title, category_id, author, publisher_id, year, page, description, imagelink });
        const savedBook = await newBook.save();
    
        res.status(201).json({ bookId: savedBook._id });
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
        res.status(400).json({ error: error.message });
    }
})

// DELETE CATEGORY
app.delete('/categories/:id',  async (req, res) => {
    try {
        const { id } = req.params;
        
        await Category.findByIdAndDelete(id);
        
        res.status(200).json({ 
            message: "Kategori dihapus", 
            deletedCategoryId: id 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// DELETE PUBLISHER
app.delete('/publishers/:id',  async (req, res) => {
    try {
        const { id } = req.params;
        
        await Publisher.findByIdAndDelete(id);
        
        res.status(200).json({ 
            message: "Penerbit dihapus", 
            deletedPublisherId: id 
        });
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

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})