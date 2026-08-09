const express=require("express");
const cors=require("cors");
const authRoutes=require("./routes/auth.routes")

const app=express();
app.use(express.json());

app.get('/',(req ,res)=>{
    res.send("smart civic issue Reporter API is running");
});
module.exports=app;
