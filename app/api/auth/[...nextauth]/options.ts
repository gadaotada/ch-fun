import CredentialsProvider from 'next-auth/providers/credentials';
import crypto from 'crypto';
import type { NextAuthOptions } from "next-auth";

import { getUser } from '../../../../lib/database/auth';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "text" }
            },
            async authorize(credentials) {
                // check if ts is retarded 
                if (!credentials?.email) return null;

                // its not retarded
                // hash the pass
                const salt = process.env.GLOBAL_SALT || 'a-default-salt'
                const hashedEmail = crypto.pbkdf2Sync(credentials?.email, salt, 10000, 64, 'sha256').toString('hex');
               
                const user = await getUser(hashedEmail);
                if (user) {
                    return {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    }
                } else {
                    return null
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 31 * 24 * 60 * 60, // 31 days
    },
    pages: {
        signIn: '/',
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                // ts is retarded -> confirmed try removing the 'as number'
                token.id = user.id as number;
                token.avatar = user.avatar as string;
            }
            return token;
        },
        async session({session, token}) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.avatar = token.avatar;
            
            return session;
        }
    }
}