import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB();

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });

    } catch (error: any) {
        console.log("Error creating prompt: ", error.message);
        return new Response(JSON.stringify({ msg: error.message }), { status: 500 });
    }
}