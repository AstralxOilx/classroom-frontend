import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            fname: string;
            lname: string;
            roleId: number;
            roleName: string;
            identification: string;
            profileImageUrl: string;
        };

        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        }
    }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: string;
            email: string;
            fname: string;
            lname: string;
            roleId: number;
            roleName: string;
            identification: string;
            profileImageUrl: string;
        };

        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        }
    }
}