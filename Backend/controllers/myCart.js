const User = require("../models/userSchema")

async function MyCart(req,res){
    const userId = req.userId;
    
    try{
        const user = await User.findById(userId).populate("cart");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No user found",
                cart: []
            })
        }
        return res.status(200).json({
            success:true,
            message:"Your cart is ready!",
            cart:user.cart
        })
    }
    catch(e){
        console.log(e.message)
        return res.status(400).json({
            success:false,
            message:"Internal server error",
            cart:[]
        }) 
    }
}

module.exports = MyCart;