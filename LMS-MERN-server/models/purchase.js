import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course',
        required : true 
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true 
    },
    
    amount : {
        type : Number,
        required : true 
    },

    status : {
        type : String ,
        enum : ['pending','failed','success'],
        default : 'pending'
    }
    
} , {timestamps : true})

export const Purchase = mongoose.model('Purchase',purchaseSchema)