import foodModel from "../models/food.model.js";
import { uploadImage } from "../services/storage.service.js";
import { v4 as uuidv4 } from 'uuid';

export const createFood = async (req, res) => {

    const fileUploadResult = await uploadImage(req.file.buffer, uuidv4() );

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    });

    return res.status(201).json({
        success: true,
        message: "Food item created successfully",
        food: foodItem
    });

}