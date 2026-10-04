import express  from "express"
import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"


dotenv.config()

const PORT = 5000
const app = express()

app.use(express.json())


const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});

app.post("/ai", async (req, res) => {
    try {
        const { input } = req.body;

        const interaction = await ai.interactions.create({
            model: "gemini-3.8-flash",
            input,
            system_instruction: "You are an assistant named Jarvis."
        });

        res.status(200).json({
            ai: interaction.output_text
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/",(req,res)=>{
    res.json({message:"/ route"})
})

app.listen(PORT,()=>{
    console.log(`Server is listening to port:${PORT}`)
})