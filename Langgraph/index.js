import express  from "express"
import dotenv from "dotenv"
import { ChatGroq } from "@langchain/groq"
import { Annotation, MemorySaver, MessagesAnnotation, StateGraph } from "@langchain/langgraph"
import { ToolNode } from "@langchain/langgraph/prebuilt"
import { TavilySearch } from "@langchain/tavily"


dotenv.config()

const PORT = 5000
const app = express()

app.use(express.json())




// Tools
const tool = new TavilySearch({
  maxResults: 5,
  topic: "general",
});


const tools = [tool]
const toolNode = new ToolNode(tools)


// LLM
const llm = new ChatGroq({
    model:"openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: 500,
    maxRetries: 2,
}).bindTools(tools)

const checkPointer = new MemorySaver()



// Langgraph

// State
// const State = Annotation.Root({
//     prompt:Annotation,
//     aiMsg:Annotation
// })


// Call LLM function for the agent
const callLLM = async(state)=>{
    console.log("state:",state)
    const response = await llm.invoke([
        {
        role: "system",
        content: `You are Jarvis AI assistant

Use conversation memory first.

Only use tools when the answer requires
external real-time information like:
weather, news, web search, stock prices etc.

Do NOT call tools for simple conversation,
memory-based questions, greetings,
or personal context`,
        },
        ...state.messages
    ])

    return {messages:[response]}
} 



const shouldContinue = (state) => {
    const lastMessage = state.messages[state.messages.length - 1];

    if (lastMessage.tool_calls?.length > 0) {
        return "tools";
    }

    return "__end__";
};

// Agent Node
const graph = new StateGraph(MessagesAnnotation)
.addEdge("__start__","agent")
.addNode("agent",callLLM)
.addConditionalEdges("agent",shouldContinue)
.addEdge("tools","agent")
.addNode("tools",toolNode)
.compile({checkpointer:checkPointer})



app.post("/ai", async (req, res) => {
    try {
        const { input } = req.body;

        const response = await graph.invoke({messages:[
            {
                role:"user",
                content:input
            }
        ]},{
            configurable:{thread_id:"user123"}
        })
        console.log(response)
        res.status(200).json({
            ai: response.messages[response.messages.length-1].content
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