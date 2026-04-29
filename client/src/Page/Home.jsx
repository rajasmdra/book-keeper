import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div className="w-full h-full flex justify-center items-center flex-col text-center gap-4">
            <h1 className="font-bold text-4xl">Book Keeper</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis molestiae consectetur, cumque ad iusto nulla.</p>
            <Link 
                to="/books" 
                className="bg-blue-900 text-white px-8 py-2 font-semibold rounded-3xl
                hover:bg-blue-800"
            >
                See Colections
            </Link>
        </div>
    )
}