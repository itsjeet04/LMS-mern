import User from "../../models/user.model.js";

export const getUserData = async(req,res) => {
    try {
        const userId = req.auth.userId 
        const user = await User.findById(userId)

        if(!user){
           return res.json({success : false , message : "user not found"})
        }

        res.json({success : true , user})

    } catch (error) {
        console.error(error)
        res.json({success: false , message :  error.message})
    }
}