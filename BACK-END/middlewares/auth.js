import jwt from 'jsonwebtoken';
import { env } from "../config/index.js";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    // Récupère le jeton JWT à partir des cookie de la requete
    const token = req.cookie.access_token;

    // On vérifie si le jeton n'est pas présent
    // Si il n'est pas présent, renvoie une erreur 401 (accés refusé)
    if(!token) return next(createError(401, 'Accés refusé'))

    // On vérifie la validité du jeton en utilisant jwt.verify
    jwt.verify(token, env.token, (err, user) => {
        // Si il y a une erreur lors de la vérification
        if(err) {
            // Renvoie d'une erreur 403 (interdit) car le jeton n'est pas valide
            return next(createError(403, 'Token non valide'))
        }
        // Si la vérification est réussie on ajoute les info du user dans l'objet req
        req.user = user

        next();
    })

}