import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";


export const register = async (req, res) => {

    const { fullName, email, password } = req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if(existingUser){
            return res.status(400).json({success: false, message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            fullName,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({ 
            id: user._id }, 
            config.Jwt_secret, 
            { expiresIn: "1d" }
        );

        res.cookie("token", token);

        return res.status(201).json({success: true, message: "User registered successfully",  
            user:{ 
                id: user._id,
                fullName: user.fullName, 
                email: user.email 
            }, 
        });


    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    try {
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(400).json({success: false, message: "User does not exist"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        const token = jwt.sign({ 
            id: user._id }, 
            config.Jwt_secret, 
            { expiresIn: "1d" }
        );

        res.cookie("token", token);

        return res.status(200).json({success: true, message: "User logged in successfully",
            user:{ 
                id: user._id,
                fullName: user.fullName, 
                email: user.email 
            }, 
        });
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}