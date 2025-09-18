import express from 'express';
import { authenticateFoodPartner } from '../middlewares/auth.middleware.js';
import { createFood } from '../controllers/food.controller.js';

import multer from 'multer';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/add-food', 
    authenticateFoodPartner, 
    upload.single('video'), 
    createFood
);
export default router;


