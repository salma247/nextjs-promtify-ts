import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();

        const prompts = await Prompt.findById(params.id).populate("creator");

        if (!prompts) return new Response(JSON.stringify({ msg: "Prompt not found" }), { status: 404 });

        return new Response(JSON.stringify(prompts), { status: 200 });

    } catch (error: any) {
        console.log("Error getting prompts: ", error.message);
        return new Response(JSON.stringify({ msg: error.message }), { status: 500 });
    }
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const {prompt, tag} = await req.json();
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) return new Response(JSON.stringify({ msg: "Prompt not found" }), { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag.toString().split(",").map((tag: string) => tag.trim());

        await existingPrompt.save();

        return new Response(JSON.stringify(prompt), { status: 200 });

    } catch (error: any) {
        console.log("Fail to Update the prompt: ", error.message);
        return new Response(JSON.stringify({ msg: error.message }), { status: 500 });
    }
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response(JSON.stringify({ msg: "Prompt deleted" }), { status: 200 });

    } catch (error: any) {
        console.log("Fail to delete the prompt: ", error.message);
        return new Response(JSON.stringify({ msg: error.message }), { status: 500 });
    }
}