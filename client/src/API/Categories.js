import axios from "axios";

export const fetchCategories = async () => {
    try {
        const response = await axios.get('http://localhost:3000/categories')
        return response.data.categories;
    } catch (error) {
        console.error("Gagal mengambil data kategori", error);
        throw error;
    }
}