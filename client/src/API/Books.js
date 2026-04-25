import axios from "axios";
import { useEffect, useState } from "react";

export const fetchBooks = async () => {
    try {
        const response = await axios.get('http://localhost:3000/books');
        return response.data.books;
    } catch (error) {
        console.error("Gagal mengambil data buku:", error);
        throw error;
    }
}

export const fetchBook = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        return response.data.book;
    } catch (error) {
        console.error(`Gagal mengambil data buku dengan id ${id}`, error);
        throw error;
    }
}
