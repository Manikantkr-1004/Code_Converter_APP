const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 7700;
const OpenAI = require("openai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("You are on Code converter app")
})


app.post("/convert",async(req,res)=>{
    const {code, language} = req.body;

    const openai = new OpenAI({
        apiKey: process.env.APIKEY,
    });
    
    main();

    
    async function main() {
        let content = `Please convert the following code snippets into this ${language} language.\n Remember you don't have to debug or tell me anything about the code, you have to only convert the given code into ${language} language and give me that coverted code only as a response. \n here is my code \n ${code}`
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content }],
            model: 'gpt-3.5-turbo',
        });
        
        res.send(chatCompletion.choices[0].message.content);
    }
})

app.post("/debug",async(req,res)=>{
    const {code} = req.body;

    const openai = new OpenAI({
        apiKey: process.env.APIKEY,
    });
    
    main();

    
    async function main() {
        let content = `Please debug my given code and give me 100% corrected bug free code as a response as well as tell me like what things was wrong and what did you improve.  \n here is my code \n ${code}`
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content }],
            model: 'gpt-3.5-turbo',
        });
        
        res.send(chatCompletion.choices[0].message.content);
    }
})

app.post("/quality",async(req,res)=>{
    const {code} = req.body;

    const openai = new OpenAI({
        apiKey: process.env.APIKEY,
    });
    
    main();

    
    async function main() {
        let content = `Please provide a code quality assessment for the given code. Consider the following parameters:\n1. Code Consistency: Evaluate the code for consistent coding style, naming conventions, and formatting.\n2. Code Performance: Assess the code for efficient algorithms, optimized data structures, and overall performance considerations.\n3. Code Documentation: Review the code for appropriate comments, inline documentation, and clear explanations of complex logic.\n4. Error Handling: Examine the code for proper error handling and graceful error recovery mechanisms.\n5. Code Testability: Evaluate the code for ease of unit testing, mocking, and overall testability.\n6. Code Modularity: Assess the code for modular design, separation of concerns, and reusability of components.\n7. Code Complexity: Analyze the code for excessive complexity, convoluted logic, and potential code smells.\n8. Code Duplication: Identify any code duplication and assess its impact on maintainability and readability.\n9. Code Readability: Evaluate the code for readability, clarity, and adherence to coding best practices.\nPlease provide a summary of the code quality assessment and a report showing the percentage-wise evaluation for each parameter mentioned above.\n here is my code \n ${code}`
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content }],
            model: 'gpt-3.5-turbo',
        });
        
        res.send(chatCompletion.choices[0].message.content);
    }
})



app.listen(PORT, ()=>{
    console.log("Server is running successfully.");
})