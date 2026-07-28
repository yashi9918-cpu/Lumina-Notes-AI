import axios from "axios";

const api = axios.create({
  baseURL: "https://lumina-notes-ai-backend.onrender.com",
});

export default api;