import { Backend_URL } from "@/lib/constants";
import axios from "axios";  

 
export const classroom = async (user: string) => { 
    try {
        const res = await axios.get(Backend_URL + `/class-room/${user}`);
        return res.data;
    } catch (error) {
        console.error("Error during authentication", error);
        return null;
    }
};


// import { Backend_URL } from "@/lib/constants";
// import axios from "axios";
// import { console } from "inspector";
// import { getSession } from "next-auth/react";

// // ฟังก์ชันสำหรับการใช้ใน API Route หรือ Middleware
// export const classroom = async (user: string) => {
//     // ดึงข้อมูล session จาก request
//     const session = await getSession(); // ไม่ต้องระบุ req เนื่องจาก getSession จะดึงข้อมูลจาก context อัตโนมัติ

//     // ตรวจสอบว่า session มีค่า หากไม่มีแสดงข้อผิดพลาด
//     if (!session) {
//         throw new Error("Unauthorized");
//     }

//     // ใช้ token ที่ได้จาก session
//     const token = session.backendTokens.accessToken;

//     try {
//         // ส่ง request ไปยัง API พร้อมกับ Bearer Token
//         const res = await axios.get(Backend_URL + `/class-room/${user}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`  // ส่ง Bearer Token ที่ได้จาก session
//             }
//         });
//         console.log(token)
//         return res.data; // ส่งข้อมูลที่ได้รับกลับ
//     } catch (error) {
//         console.error("Error during authentication", error);
//         return null;
//     }
// };
