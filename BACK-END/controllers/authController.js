// MODEL
import Model from "../models/Auth.js";

// PACKAGE
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from "../config/index.js";

// Fonction pour s'inscrire
export const signup = async (req, res, next) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await Model.create({
            ...req.body,
            password: hashedPassword
        })
        res.status(201).json({
            message: 'le user à été ajouté',
        })
    }
    catch(error){
        next(error)
    }
}

// Fonction pour la connexion
export const sign = async (req, res, next) => {
    try{
        const user = await Model.findOne({ email: req.body.email })
        if(user){
            const valid = await bcrypt.compare(req.body.password, user.password);
            if(valid){
                const token = jwt.sign({id: user.id}, process.env.TOKEN, {expiresIn: '24h'})
                const { password, ...others } = user._doc
                res.cookie('access_token', token, { httpOnly: true })
                    .status(200)
                    .json(others);
            }
            if(!valid) return res.status(400).json({message: 'Mot de passe incorrecte'});
        }
        if(!user) return res.status(404).json({message:'Email inconnue'});
    }
    catch(error){
        next(error)
    }
}

// Fonction pour la modification
export const updateAuth = async (req, res, next) => {
    const { id } = req.params;
    try{
        const auth = await Model.findById(id);
        if (auth){
            const updateAuth = await Model.findByIdAndUpdate(id, {$set: req.body}, {new:true})
            res.status(200).json(updateAuth)
        }
        else {
            return res.status(404).json({message:'Ressource non trouvée'})
        }
    }
    catch(error){
        next(error)
    }
}