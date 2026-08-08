require('dotenv').config();
const app=require("./app");
const connectDB=require("./db/db");

connectDB();
const PORT=process.env.PORT ||5000;
app.listern(PORT,()=>{
    console.log("server is running");
})
    
