const Book = require("../models/bookSchema");

async function fetchAll(req,res){
    try{
        const books = await Book.find({});
        res.status(200).json({
            success:true,
            data:books
        })
    }
    catch(e){
        res.status(400).json({
            success:false,
            data :[]
        })
    }
}

async function fetchByGenre(req,res){
    const {genre} = req.query;

    try{
        const books  = await Book.find({genre});
        return res.status(200).json({
            success:true,
            data:books
        })
    }
    catch(e){
        res.status(500).json({ message: 'Error fetching books' });
    }
}

module.exports = {fetchAll,fetchByGenre};