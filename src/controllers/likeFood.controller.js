import likeModel from "../models/likes.model.js";
import foodModel from "../models/food.model.js";
import savedModel from "../models/save.model.js";

export const likeFood = async (req, res) => {

    const { foodId } = req.body;

    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        Food: foodId, 
        user: user._id 
    });

    if(isAlreadyLiked){
        await likeModel.deleteOne({
            user: user._id, 
            Food: foodId
            
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        });

        return res.status(200).json({
            success: true,
            message: "Food unliked successfully"
        });
    }

    const like = await likeModel.create({
        user: user._id,
        Food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    });

    return res.status(200).json({
        success: true,
        message: "Food liked successfully",
        like: like
    });

}

export const savedFood = async (req, res) => {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await savedModel.findOne({
        food: foodId,
        user: user._id
    });

    if (isAlreadySaved) {
        await savedModel.deleteOne({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        });

        return res.status(200).json({
            success: true,
            message: "Food unsaved successfully"
        });
    }

    const saved = await savedModel.create({
        user: user._id,
        food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    });

    return res.status(200).json({
        success: true,
        message: "Food saved successfully",
        saved: saved
    });
}

export const getSavedFoods = async (req, res) => {
    const user = req.user;

    try {
        const savedFoods = await savedModel.find({ user: user._id }).populate('food');

        if (!savedFoods || savedFoods.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No saved foods found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Saved foods retrieved successfully",
            savedFoods: savedFoods
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
