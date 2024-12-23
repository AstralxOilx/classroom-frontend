import { Backend_URL } from "@/lib/constants";
import axios from "axios";


export const userMemberData = async (user: string, classId: string) => {
    try {
        const res = await axios.post(Backend_URL + `/class-room/member`,{
            userId:user,
            id:classId,
        });
        return res.data;
    } catch (error) {
        console.error("Error during authentication", error);
        return null;
    }
};
