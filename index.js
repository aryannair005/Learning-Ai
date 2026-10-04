import express  from "express"


const PORT = 5000

const app = express()


app.get("/",(req,res)=>{
    res.json({message:"/ route"})
})

app.listen(PORT,()=>{
    console.log(`Server is listening to port:${PORT}`)
})