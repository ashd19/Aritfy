import { Item } from "../models/item.model.js";

export const addItem = async (req, res) => {
    try {
        const id = req.id;
        const {title, category, price, condition, status} = req.body;
        if(!title || !category || !price || !condition || !status){
            return res.status(404).json({message: "Add inputs fully", success: false});
        }
        const item = await Item.create({
            title: title,
            sellerId: id,
            category: category,
            price: price,
            staus: status
        })
        return res.status(200).json({message: "Item added succesfully", success: true})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error"});
    }
}