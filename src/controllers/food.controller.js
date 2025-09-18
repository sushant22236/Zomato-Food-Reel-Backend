import foodModel from "../models/food.model.js";
import { uploadImage } from "../services/storage.service.js";
import { v4 as uuidv4 } from 'uuid';

export const createFood = async (req, res) => {

    try {
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
    catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error"
       });
    }
}

export const getAllFoods = async (req, res) => {
    
    try {
        const foods = await foodModel.find({});
        return res.status(200).json({
            success: true,
            foods: foods
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Not got the foods"
        });
    }
}