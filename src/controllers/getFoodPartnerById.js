import foodPartnerModel from "../models/foodPartner.model.js";
import foodModel from "../models/food.model.js";

export const getFoodPartnerById = async (req, res) => {

    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)

    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });

    if(!foodPartner){
        return res.status(404).json({success: false, message: "Food Partner not found"});
    }

    return res.status(200).json({
        success: true,
        message: "Food Partner fetched successfully",
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }
    });
}