import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../API/Books";
import { fetchCategories } from "../API/Categories";
import { fetchPublishers } from "../API/Publishers";

export const Add = () => {
    const navigate = useNavigate();
    const [ formData, setFormData] = useState({
        title: "",
        category: "",
        author: "",
        publisher: "",
        year: "",
        page: "",
        description: "",
        imageLink: "",
    })
    const [ loading, setLoading ] = useState(false);
    const [ categories, setCategories ] = useState([]);
    const [ publishers, setPublishers ] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const catData = await fetchCategories(); // response: { categories: [...] }
            const pubData = await fetchPublishers(); // response: { publishers: [...] }
            setCategories(catData.categories);
            setPublishers(pubData.publishers);
        };
        loadData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addBook(formData);
            alert("Buku berhasil ditambahkan!");
            navigate("/books");
        } catch (error) {
            alert("Gagal menambah buku. Cek konsol.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="font-semibold text-2xl pb-4">Add New Book</h1>
            <form action="" className="flex flex-col gap-2 max-w-[480px]">
                <div className="flex flex-col">
                    <label className="text-sm">Title</label>
                    <input 
                        type="text" 
                        name="title"
                        value={formData.title}
                        placeholder="Title..."
                        required
                        className="py-2 px-4 shadow-sm rounded-sm"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm">Author</label>
                    <input 
                        type="text" 
                        name="author"
                        value={formData.author}
                        placeholder="Author..."
                        required
                        className="py-2 px-4 shadow-sm rounded-sm"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm">Year</label>
                    <input 
                        type="number" 
                        name="year"
                        value={formData.year}
                        placeholder="Year..."
                        required
                        className="py-2 px-4 shadow-sm rounded-sm"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm">Page</label>
                    <input 
                        type="number" 
                        name="page"
                        value={formData.page}
                        placeholder="Page..."
                        required
                        className="py-2 px-4 shadow-sm rounded-sm"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm">Description</label>
                    <input 
                        type="text" 
                        name="description"
                        value={formData.description}
                        placeholder="Description..."
                        required
                        className="py-2 px-4 shadow-sm rounded-sm"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm">Image Link</label>
                    <input 
                        type="text" 
                        name="imageLink"
                        value={formData.imageLink}
                        placeholder="Image Link..."
                        required
                        className="py-2 px-4 shadow-sm rounded-sm"
                        onChange={handleChange}
                        />
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-blue-900 text-white py-2 px-4 rounded-3xl"
                >
                    Submit
                </button>
            </form>
        </>
    )
}

//<div className="flex flex-col">
//    <label className="text-sm">Category</label>
//    <select 
//        name="category"
//        value={formData.category}
//        onChange={handleChange}
//    >
//        {categories?.map((cat) => {
//            <select key={cat._id} value={cat.category}>
//                {cat.name}
//            </select>
//        })}
//    </select>
//</div>