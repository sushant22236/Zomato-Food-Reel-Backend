import foodPartnerModel from "../models/foodPartner.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import userModel from "../models/user.model.js";

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

export  const authenticateUser = async (req, res, next) => {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({success: false, message: "please login first"});
    }

    try {

        const decoded = jwt.verify(token, config.Jwt_secret);

        console.log(decoded);

        const user = await userModel.findById(decoded.id);

        console.log(user);

        if(!user){
            return res.status(401).json({success: false, message: "not getting user"});
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({success: false, message: "Unauthorized"});
    }
}
