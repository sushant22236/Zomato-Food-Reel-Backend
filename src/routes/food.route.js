import express from 'express';
import { authenticateFoodPartner, authenticateUser } from '../middlewares/auth.middleware.js';
import { createFood, getAllFoods } from '../controllers/food.controller.js';
import { getFoodPartnerById } from '../controllers/getFoodPartnerById.js';

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


export default router;


