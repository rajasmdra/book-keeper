const Database = require("better-sqlite3");
const db = new Database("books.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        year INTEGER
    )`
);

// db.exec(`
//     INSERT INTO books (title, author, year) VALUES
//         ('1984', 'George Orwell', '1948'),
//         ('Brane New World', 'Aldous Huxley', '1932'),
//         ('Fahrenheit 451', 'Rey Bradbury', '1953')
// `)

db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
    )`
)

// db.exec(`
//     INSERT INTO notes (book_id, content) VALUES 
//         (1, 'A chilling dystopian novel.'),
//         (1, 'Big Brother is watching you.'),
//         (2, 'A visionary novel about a future society.'),
//         (3, 'A powerful statement on censorship.')
// `)

module.exports = db