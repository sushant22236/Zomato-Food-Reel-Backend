import express from 'express';
import { login, logout, register } from '../controllers/auth.controller.js';
import { registerFoodPartner, loginFoodPartner, logoutFoodPartner } from '../controllers/foodPartner.controller.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

router.post('/food-partner-register', registerFoodPartner)
router.post('/food-partner-login', loginFoodPartner)
router.post('/food-partner-logout', logoutFoodPartner)

export default router;
