import { Backend_URL } from "@/lib/constants";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT> {
    try {
        const res = await fetch(Backend_URL + "/auth/refresh", {
            headers: {
                authorization: `Refresh ${token.backendTokens.refreshToken}`,
            },
        });

        if (!res.ok) throw new Error("Failed to refresh token");

        const response = await res.json(); 
        return {
            ...token,
            backendTokens: response,
        };
    } catch (error) {
        console.error("Error refreshing token:", error);
        return { ...token, error: "Refresh token failed" };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "email",
                },
                password: {
                    label: "Password",
                    type: "password"
                },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;
                const { email, password } = credentials;

                try {
                    const res = await axios.post(Backend_URL + "/auth/signin", {
                        email,
                        password,
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });

                    // ตรวจสอบสถานะการตอบกลับ ถ้าไม่ใช่ 200 หรือ 401
                    if (res.status === 401) {
                        console.log(res.statusText);
                        return res.statusText;
                    }
                    return res.data; // ส่งข้อมูล user ที่ได้รับจาก response
                } catch (error) {
                    console.error("Error during authentication", error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: "/",
    },
    callbacks: {
        async jwt({ token, user }) {

            if (user) return { ...token, ...user };

            if (new Date().getTime() < token.backendTokens.expiresIn) return token;

            return await refreshToken(token);

        },

        async session({ token, session }) {
            session.user = token.user;
            session.backendTokens = token.backendTokens;

            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };