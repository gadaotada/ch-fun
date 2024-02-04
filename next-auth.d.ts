import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            name: string;
            avatar: string;
       }  & DefaultSession
    }

    interface User extends DefaultUser {
        id: number;
        name: string;
        avatar: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: number;
        name: string;
        avatar:string;
    }
    
};