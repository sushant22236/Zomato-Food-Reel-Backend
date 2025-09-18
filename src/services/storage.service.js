import ImageKit from "imagekit";
import {config} from "../config/env.js";

const imagekit = new ImageKit({
    publicKey : config.imageKit.publicKey,
    privateKey : config.imageKit.privateKey,
    urlEndpoint : config.imageKit.urlEndpoint
});

export const uploadImage = async (file, fileName) => {
    const result = await imagekit.upload({
        file : file,
        fileName : fileName
    });

    return result;
}