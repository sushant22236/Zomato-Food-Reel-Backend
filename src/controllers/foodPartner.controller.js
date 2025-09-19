import foodPartner from "../models/foodPartner.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import { config } from "../config/env.js";

export const registerFoodPartner = async (req, res) => {
    const {name, email, password, contactName, phone, address} = req.body;

    if(!name || !email || !password || !contactName || !phone || !address){
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    try {

        const existingFoodPartner = await foodPartner.findOne({ email });

        if(existingFoodPartner){
            return res.status(400).json({success: false, message: "Food Partner already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const FoodPartner = new foodPartner({
            name,
            email,
            password: hashedPassword,
            contactName,
            phone,
            address
        });

        await FoodPartner.save();

        const token = jwt.sign({ 
            id: FoodPartner._id }, 
            config.Jwt_secret, 
            { expiresIn: "1d" }
        );

        res.cookie("token", token);

        return res.status(201).json({success: true, message: "Food Partner registered successfully",  
            foodPartner:{ 
                id: FoodPartner._id,
                name: FoodPartner.name, 
                email: FoodPartner.email,
                contactName: FoodPartner.contactName,
                phone: FoodPartner.phone,
                address: FoodPartner.address
            }, 
        });
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const loginFoodPartner = async (req, res) => {
    
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    try {
        const existingFoodPartner = await foodPartner.findOne({ email });

        if(!existingFoodPartner){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, existingFoodPartner.password);

        if(!isMatch){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        const token = jwt.sign({ id: existingFoodPartner._id }, config.Jwt_secret, { expiresIn: "1d" });

        res.cookie("token", token);

        return res.status(200).json({success: true, message: "Food Partner logged in successfully",
            foodPartner:{
                id: existingFoodPartner._id,
                name: existingFoodPartner.name,
                email: existingFoodPartner.email
            },
        });
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}


export const logoutFoodPartner = (req, res) => {
    res.clearCookie("token");   
    return res.status(200).json({success: true, message: "Food Partner logged out successfully"});
}