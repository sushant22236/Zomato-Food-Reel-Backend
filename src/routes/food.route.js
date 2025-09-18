import express from 'express';
import { authenticateFoodPartner, authenticateUser } from '../middlewares/auth.middleware.js';
import { createFood, getAllFoods } from '../controllers/food.controller.js';

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


export default router;


