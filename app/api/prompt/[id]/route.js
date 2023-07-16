import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, {params}) => {
    try{
        await connectToDatabase();
        const prompt = await Prompt.findById(params.id).populate("creator");
        if(!prompt){
            return new Response(JSON.stringify({msg: "Prompt not found"}), {status: 404});
        }
        return new Response(JSON.stringify(prompt), {status: 200});
    }
    catch(err){
        console.log(err);
        return new Response(JSON.stringify({msg: "Something went wrong"}), {status: 500});
    }
}

export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json();
    try{
        await connectToDatabase();
        const existingprompt = await Prompt.findById(params.id);
        if(!existingprompt){
            return new Response(JSON.stringify({msg: "Prompt not found"}), {status: 404});
        }
        existingprompt.prompt = prompt;
        existingprompt.tag = tag;
        await existingprompt.save();
        return new Response(JSON.stringify({msg: "Prompt updated"}), {status: 200});
    }
    catch(err){
        console.log(err);
        return new Response(JSON.stringify({msg: "Something went wrong"}), {status: 500});
    }
}

export const DELETE = async (request, {params}) => {
    try{
        await connectToDatabase();
        const existingprompt = await Prompt.findByIdAndRemove(params.id);
        if(!existingprompt){
            return new Response(JSON.stringify({msg: "Prompt not found"}), {status: 404});
        }
        return new Response(JSON.stringify({msg: "Prompt deleted"}), {status: 200});
    }
    catch(err){
        console.log(err);
        return new Response(JSON.stringify({msg: "Something went wrong"}), {status: 500});
    }
}