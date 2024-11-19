const User = require("../models/userSchema")

async function addToCart(req,res){
    const userId = req.userId;
    const {bookId, added} = req.body;


    if(!bookId){
        return res.status(400).json(
            { success: false, message: "Book ID is required" });
    }

    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json(
                { success: false, message: "User not found!" });
        }
        //checking if book is already present
        if(!added){
            if (!user.cart.includes(bookId)) {
                user.cart.push(bookId);
                await user.save();
            }
            else{
                return res.status(400).json({
                    success:false,
                    message:"Book already in cart"
                })
            }
            return res.status(200).json(
                {   success: true,
                    message: "Book added to cart",
                    cartSize : user.cart.length
                }
            );
        }
        else{
            if (user.cart.includes(bookId)) {
                user.cart.pull(bookId);
                await user.save();
            }
            return res.status(200).json(
                { success: true,
                    message: "Book removed from cart",
                    cartSize : user.cart.length
                });
        }
    }
    catch(e){
        console.error(e);
        res.status(500).json(
            { success: false, message: "Server error" });

    }
}

module.exports = addToCart;