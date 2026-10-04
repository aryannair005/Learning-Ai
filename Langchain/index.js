import express  from "express"
import dotenv from "dotenv"
import { ChatGroq } from "@langchain/groq"


dotenv.config()

const PORT = 5000
const app = express()

app.use(express.json())



const llm = new ChatGroq({
    model:"openai/gpt-oss-120b",
    temperature: 0.7,
    maxTokens: 100,
    maxRetries: 2,
})


app.post("/ai", async (req, res) => {
    try {
        const { input } = req.body;

        const response = await llm.invoke([
            {
            role: "system",
            content: "You are a helpful assistant that translates Hindi to English. Translate the user sentence.",
            },
            { role: "user", content: input},
        ])

        res.status(200).json({
            ai: response.content
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