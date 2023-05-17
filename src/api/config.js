import { API_URL } from "constants/api";
import axios from "axios";

export const HTTPClient = axios.create({
    baseURL: API_URL,
});
