import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pubishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories');
        setCategories(response.data.categories);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/publishers');
        setPublishers(response.data.publishers);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      }
    }

    fetchPublishers();
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
              <li key={book._id} className='bg-white px-4 py-8 rounded-md w-full flex flex-col gap-4'>
                <div className='flex gap-4 items-center'>
                  <img src={book.imagelink} alt="" width="100px"/>
                  <div>
                    <p className='font-semibold text-xl'>{book.title}</p>
                    <p className='text-sm'>Author: {book.author}</p>
                    <p className='text-sm'>Publisher: {book.publisher_id?.publisher}</p>
                    <p className='text-sm'>Year: {book.year}</p>
                    <p className='text-sm'>Page: {book.page}</p>
                    <p className='text-sm'>Category: {book.category_id?.category}</p>
                  </div>
                </div>
                <div className='w-full'>
                  <h2 className='font-semibold'>Description</h2>
                  <p className='text-sm'>{book.description}</p>
                </div>
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
