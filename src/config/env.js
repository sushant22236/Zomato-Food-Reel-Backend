import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT || 4000,
    mongoUri: process.env.MONGO_URI || " ",
    Jwt_secret: process.env.JWT_SECRET || " ",

    imageKit: {
        publicKey: process.env.IMAGE_KIT_PUBLIC_KEY || " ",
        privateKey: process.env.IMAGE_KIT_PRIVATE_KEY || " ",
        urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT || " "
    }

}