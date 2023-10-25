import express from 'express';
import { env } from './config/index.js';
import mongoose from "mongoose";

import cors from 'cors';

// ROUTES
import shoesRoutes from './routes/shoesRouter.js';

const app = express();

const PORT = process.env.PORT || 8080;

// DATABASE
mongoose   
    .connect(env.mongoURL)
    .then(() => console.log('Connexion à MongoDB réussi !'))
    .catch((error) => console.log(error));

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTER
app.use("/api/shoes", shoesRoutes);

// SERVER
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})