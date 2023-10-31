import express from 'express';
import { verifyToken } from '../middlewares/auth.js';

import {
    signup,
    sign,
    updateAuth
} from '../controllers/authController.js';

const router = express.Router();

router.post("/signup", signup);

router.post('/login', sign);

router.put("/update/:id", updateAuth);

export default router