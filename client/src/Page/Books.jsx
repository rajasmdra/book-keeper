import React, { useEffect, useState } from "react";
import { fetchBooks } from "../API/Books";
import { Link } from "react-router-dom";

export const Books = () => {
    const [ books, setBooks ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks();
                setBooks(data);
                setLoading(false);
            } catch (error) {
                setLoading(false)
            }
        };

        loadBooks();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold">Books</h1>
            <ul>
                {books.map((book) => (
                    <Link to={`/books/${book._id}`}>
                        <li key={book._id} className="shadow-md rounded-sm flex p-4 gap-2 items-center">
                            <img src={book.imagelink} width="80"/>
                            <div>
                                <p className="font-semibold text-2xl">{book.title}</p>
                                <p className="text-gray-600">{book.author}</p>
                                <p className="text-gray-600">{book.year}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}