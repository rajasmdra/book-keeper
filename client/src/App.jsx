import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Elements/Navbar'
import './App.css'
import { Home } from './Page/Home';
import { Books } from './Page/Books';
import { Book } from './Page/Book';

function App() {
  return (
    <div className='w-screen h-screen flex'>
      <BrowserRouter>
        <Navbar />
        <div className='flex-1 p-8'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/books' element={<Books />}/>
            <Route path="/books/:id" element={<Book />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
