import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";
import User from "@models/User";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }){
            try{
                const user = await User.findOne({ email: session.user.email });
                session.user.id = user._id.toString();
                return session;
            }
            catch(err){
                console.log(err);
                return session;
            }
    
        },
    
        async signIn({ profile }) {
            try{
                await connectToDatabase();
                const user = await User.findOne({ email: profile.email });
                if (!user) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;
    
    
            }
            catch(err){
                console.log(err);
                return false;
            }
        }
    }
})

export{ handler as GET, handler as POST}
