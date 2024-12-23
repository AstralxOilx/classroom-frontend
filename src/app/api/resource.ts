import { Backend_URL } from "@/lib/constants";
import axios from "axios"; 

export const resource = async (resource: string) => {
    try {
        const res = await axios.get(Backend_URL + `/resource/${resource}`);
        return res.data;
    } catch (error) {
        console.error("Error during authentication", error);
        return null;
    }
}