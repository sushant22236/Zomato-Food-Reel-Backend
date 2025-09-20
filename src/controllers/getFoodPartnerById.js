import foodPartnerModel from "../models/foodPartner.model.js";

export const getFoodPartnerById = async (req, res) => {

    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)

    if(!foodPartner){
        return res.status(404).json({success: false, message: "Food Partner not found"});
    }

    return res.status(200).json({
        success: true,
        message: "Food Partner fetched successfully",
        foodPartner
    });
}