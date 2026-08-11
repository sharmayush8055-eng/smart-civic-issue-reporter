const issueModel=require("../models/issue");
async function createIssue(req,res){
    try{
        const{title,description,category,location}=req.body;
        const issue=await issueModel.create({
            title,
            description,
            category,
            location,
            reportedBy:req.userID
        });

    res.status(201).json({
    message:"issue recorded successfully",
    issue:issue
    });
}catch(err){
        res.status(500).josn({message:err.message}); 
    }
}


async function getIssue(req,res){
    try{
        const{title,description,category,location}=req.body;
res.status(201).json({
    message:"issue fetch successfully",
    issue:issue
});
}catch(err){
    res.status(500).json({messgae:err.message});
}
}

async function getIssueById(req,res){
    try{
        const issue=await issueModel.findById(req.params.id).populate('reportedBy','name email');

        if(!issue){
            return res.status(404).json({message:"issue not found"});
        }

    res.status(201).json({
    message:"issue fetched successfully",
    issue:issue
});    
}catch(err){
    res.status(500).json({message:err.message});
}
}

async function UupdateIssueStatus(req,res){
    try{
        const issue = await issueModel.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!issue) {
            return res.status(404).json({ message: "issue not found" });
        }
    res.status(200).json({
        message:"Issue updated",
        issue:issue,
    });

    }catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports={createIssue,getIssue,getIssueById,UupdateIssueStatus};
