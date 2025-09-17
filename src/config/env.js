import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT || 4000,
    mongoUri: process.env.MONGO_URI || " ",
    Jwt_secret: process.env.JWT_SECRET || " "

}