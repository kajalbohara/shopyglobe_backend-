import mongoose from "mongoose"
//register
const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
}, { timestamps: true });



export const User = mongoose.model("User", userSchema);
//login

const loginuserSchema = new mongoose.Schema( {
    
    email : {
        type:String,
        required: true,
    },
    password :{
        type:String,
        required: true,
    }
    
})
export const loginUser = mongoose.model("loginUser", loginuserSchema);
