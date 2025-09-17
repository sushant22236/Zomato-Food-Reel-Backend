import foodPartnerModel from "../models/foodPartner.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const authenticateFoodPartner = async (req, res, next) => {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({success: false, message: "please login first"});
    }

    try {

        const decoded = jwt.verify(token, config.Jwt_secret);
        const foodPartner = await foodPartnerModel.findById(decoded.id);

        if(!foodPartner){
            return res.status(401).json({success: false, message: "Unauthorized"});
        }

        req.foodPartner = foodPartner;

        next();
        
    } catch (error) {
        return res.status(401).json({success: false, message: "Unauthorized"});
    }
}

