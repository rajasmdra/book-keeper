import React from "react";
import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <div className="bg-blue-900 h-full items-start px-4 py-8 flex flex-col gap-4 *:font-montserrat">
            <h1 className="text-white font-semibold text-2xl">Book Keeper</h1>
            <div className="
                flex flex-col
                *:text-white *:font-medium *:text-md
            ">
                <Link to="/">Home</Link>
                <Link to="/books">Books</Link>
            </div>
        </div>
    )
}