import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        })
    ],
})