import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

async function isAdminEmail(email){
    await mongooseConnect();
    return !! (await Admin.findOne({email:email}));
}
export const isAdminRequest = async (req, res) => {
    try {
        const session = await getServerSession(req, res, authOptions);
        if (!(await isAdminEmail(session?.user?.email))) {
            res.status(401).json({ error: 'Not an admin' });
            return;
        }
        // Continue processing if user is an admin
    } catch (error) {
        console.error('isAdminRequest error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
          }),
    ],
    adapter: MongoDBAdapter(clientPromise),
}

export default NextAuth(authOptions);

