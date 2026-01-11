import mongoose from "mongoose";

const TodoSchema=new mongoose.Schema({
    title:{
        type:String,  
        trim:true, 
        maxlength:[100, "Title cannot exceed 100 Characters"],
    }, 
    description:{
          type:String,  
        trim:true, 
        maxlength:[500, "Title cannot exceed 100 Characters"],
    }, 
    completed:{
        type:Boolean, 
        default:false, 
    }, 
    priority:{
        type:String, 
        enum:["low", "medium", "high"], 
        default:"medium"
    }
}, {
    timestamps:true, 
})
export default mongoose.models.Todo||mongoose.model("Todo", TodoSchema)