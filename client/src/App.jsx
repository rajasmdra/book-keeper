import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data.books);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  
  return (
    <div className='bg-blue-900 h-screen flex justify-center items-center p-10'>
      {loading && <div><p>Loading...</p></div>}
      {books.length === 0 && !loading ? (
        <p>Empty</p>
      ) : (
        <div className='w-full flex flex-col gap-4'>
          <h1 className='text-white font-bold text-3xl'>Book Keeper</h1>
          <ul className='flex flex-col gap-2 w-full'>
            {books.map((book) => (
              <li key={book._id} className='bg-white px-4 py-2 rounded-md w-full flex justify-between'>
                <div>
                  <p className='font-semibold text-xl'>{book.title}</p>
                  <p className='text-sm'>{book.author} - {book.year}</p>
                </div>
                <button className='text-white bg-red-600 px-4 py-2 self-end rounded-md cursor-pointer'>Delete</button>
              </li>
            ))}
          </ul>
          <button className='text-white bg-blue-600 px-8 py-2 self-end rounded-md cursor-pointer'>Add</button>
        </div>
      )}
    </div>
  )
}

export default App;
