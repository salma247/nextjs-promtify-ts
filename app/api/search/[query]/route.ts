import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (req: Request, { params }: { params: { query: string } }) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({ tag: { $regex: params.query, $options: "i" } }).populate("creator");
        return new Response(JSON.stringify(prompts), { status: 200 });

    } catch (error: any) {
        console.log("Error getting prompts: ", error.message);
        return new Response(JSON.stringify({ msg: error.message }), { status: 500 });
    }
}