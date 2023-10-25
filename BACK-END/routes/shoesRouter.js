import express from 'express';

import {
    add,
    allShoes,
    oneShoe,
    deleteShoe,
    updateShoe,
    addLike
} from '../controllers/shoesController.js';

const router = express.Router();

router.post("/add", add);

router.get("/all", allShoes);

router.get("/show/:id", oneShoe);

router.delete("/delete/:id", deleteShoe);

router.put("/update/:id", updateShoe);

router.post("/like/:id", addLike);

export default router;