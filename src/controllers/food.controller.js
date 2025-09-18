import foodModel from "../models/food.model.js";
import { uploadImage } from "../services/storage.service.js";

export const createFood = async (req, res) => {

    console.log(req.foodPartner);

    console.log(req.body);
    console.log(req.file);

    const fileUploadResult = await uploadImage(req.file.buffer );

    res.send("Food created");
}