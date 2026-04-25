import React, { useEffect, useState } from "react";
import { fetchBook } from "../API/Books";
import { useParams } from "react-router-dom";

export const Book = () => {
    const { id } = useParams();
    const [ book, setBook ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const loadBook = async () => {
            try {
                const data = await fetchBook(id);
                console.log("Data yang diterima:", data)
                setBook(data);
                setLoading(false);
            } catch (error) {
                setLoading(false)
            }
        };

        loadBook();
    }, [id]);


    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-4">
                <img src={book?.imagelink} alt="" width="120"/>
                <div className="flex flex-col justify-between flex-1">
                    <h1 className="text-3xl font-bold">{book?.title}</h1>
                    <div className="flex gap-4">
                        <table>
                            <tr>
                                <td className="pr-2">Author</td>
                                <td>: {book?.author}</td>
                            </tr>
                            <tr>
                                <td className="pr-2">Publisher</td>
                                <td>: {book?.publisher_id?.publisher}</td>
                            </tr>
                            <tr>
                                <td className="pr-2">Year</td>
                                <td>: {book?.year}</td>
                            </tr>
                            <tr>
                                <td className="pr-2">page</td>
                                <td>: {book?.page}</td>
                            </tr>
                            <tr>
                                <td className="pr-2">Category</td>
                                <td>: {book?.category_id?.category}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Description</h1>
                <p>{book?.description}</p>
            </div>
        </div>

    )
}