import axios from "axios";

export const fetchPublishers = async () => {
    try {
        const response = await axios.get('http://localhost:3000/publishers')
        return response.data.publishers;
    } catch (error) {
        console.error("Gagal mengambil data ppenerbit", error);
        throw error;
    }
}