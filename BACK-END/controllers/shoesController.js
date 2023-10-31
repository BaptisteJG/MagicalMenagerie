import Model from "../models/Shoes.js";

// FONCTION
// Nouveau
export const add = async (req, res, next) => {
    try{
        await Model.create(req.body)
        res.status(201).json({
            message: 'Ajouté'
        })
    }
    catch(error){
        next(error)
    }
}

// Tout afficher
export const allShoes = async (req, res, next) => {
    try{
        const shoes = await Model.find()
        res.status(200).json(shoes)
    }
    catch(error){
        next(error)
    }
}

// Afficher une shoes
export const oneShoe = async (req, res, next) => {
    try{
        const oneShoe = await Model.findById(req.params.id)
        res.status(200).json(oneShoe)
    }
    catch(error){
        next(error)
    }
}

//Supprimer
export const deleteShoe = async (req, res, next) => {
    try{
        const shoe = await Model.findById(req.params.id);
        if (shoe){
            await Model.findByIdAndRemove(req.params.id)
            res.status(200).json({message:'Supprimé'})
        }
        else{
            return res.status(404).json({message:'Ressource non trouvée'})
        }
    }
    catch(error){
        next(error)
    }
}

// Modifier
export const updateShoe = async (req, res, next) => {
    const { id } = req.params;
    try{
        const shoe = await Model.findById(id);
        if (shoe){
            const updateShoe = await Model.findByIdAndUpdate(id, {$set: req.body}, {new:true})
            res.status(200).json(updateShoe)
        }
        else {
            return res.status(404).json({message:'Ressource non trouvée'})
        }
    }
    catch(error){
        next(error)
    }
}

// // Ajouter un like
// export const addLike = async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         const shoe = await Model.findById(id);
//         if (shoe) {
//             // Incrémenter le nombre de likes de 1
//             shoe.likes = shoe.likes + 1;
//             await shoe.save();
//             res.status(200).json({message: 'Like ajouté'});
//         }
//         else {
//             res.status(404).json({message: 'Ressource non trouvée'});
//         }
//     } catch (error) {
//         next(error);
//     }
// };

// Ajout de like
export const likeShoe = async (req, res, next) => {
    const { id } = req.params;
    try{
        const shoe = await Model.findById(id);
        if(shoe) {
            shoe.likes = shoe.likes +1;
            await shoe.save();
            res.status(200).json({
                likes: shoe.likes,
                message: 'Like ajouté'
            })
        }
        if(!shoe) res.status(404).json({message: 'Ressource non trouvé'})
    }
    catch(error){
        next(error)
    }
}

// Tri par like
export const allShoeLike = async (req, res, next) => {
    try{
        const shoes = await Model.find().sort({likes: -1})
        res.status(200).json(shoes)
    }
    catch(error){
        next(error)
    }
}