import foodModel from "../models/food.model.js";

export const createFood = async (req, res) => {

    console.log(req.foodPartner);

    console.log(req.body);
    console.log(req.file);

    res.send("Food created");
}