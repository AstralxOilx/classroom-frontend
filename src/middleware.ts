import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// กำหนด secret ของ NextAuth
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret });
    const { pathname } = req.nextUrl;

    // ถ้าผู้ใช้เข้าสู่ระบบแล้วและกำลังพยายามเข้าถึงหน้าล็อกอิน
    if (token && pathname === "/") {
        // ส่งกลับไปยังหน้า dashboard หรือหน้าอื่นๆ ที่ผู้ใช้สามารถเข้าถึงได้
        return NextResponse.redirect(new URL("/group", req.url));
    }

    // หากยังไม่ได้เข้าสู่ระบบและพยายามเข้าถึงหน้าอื่นๆ ที่ต้องการการล็อกอิน
    if (!token && pathname !== "/") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    
    
    // ถ้าผู้ใช้มี token และไม่ได้พยายามเข้าหน้า login หรือหน้าที่ไม่ถูกบล็อก
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/group/:path*", "/assignment/:path*", "/dashboard/:path*", "/notification/:path*"],
};
