import { connectToDatabase } from "@utils/database";
import User from "@models/User";

export const GET = async (request, {params}) => {
    try{
        await connectToDatabase();
        const user = await User.findById(params.id);
        if (!user){
            return new Response(JSON.stringify({msg: "User not found"}), {status: 404});
        }
        return new Response(JSON.stringify(user), {status: 200});
    }
    catch(err){
        console.log(err);
        return new Response(JSON.stringify({msg: "Something went wrong"}), {status: 500});
    }
}