import express from 'express';
import { authenticateFoodPartner, authenticateUser } from '../middlewares/auth.middleware.js';
import { createFood, getAllFoods } from '../controllers/food.controller.js';
import { getFoodPartnerById } from '../controllers/getFoodPartnerById.js';
import { likeFood } from '../controllers/likeFood.controller.js';
import { savedFood } from '../controllers/likeFood.controller.js';

import multer from 'multer';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/add-food', 
    upload.single('video'), 
    authenticateFoodPartner, 
    createFood
);

router.get('/get-food', authenticateUser, getAllFoods)

router.get('/food-partner/:id', authenticateFoodPartner, getFoodPartnerById);

router.post('/like', authenticateUser, likeFood);

router.post('/save', authenticateUser, savedFood);

export default router;


