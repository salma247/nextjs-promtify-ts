import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (req: Request) => {
    const query = req.url.split("?")[1].split("=")[1];
    
    if (!query) {
        return new Response(JSON.stringify({ msg: "No query provided" }), {
            status: 400,
        });
    }

    try {
        await connectToDB();
        query.replace("%20", " ");
        const prompts = await Prompt.find({
            $or: [
                { user: { $regex: query, $options: "i" } },
                { tag: { $regex: query, $options: "i" } },
            ],
        }).populate("creator");
        
        return new Response(JSON.stringify(prompts), { status: 200 });

    } catch (error: any) {
        console.log("Error getting prompts: ", error.message);
        return new Response(JSON.stringify({ msg: error.message }), { status: 500 });
    }
};