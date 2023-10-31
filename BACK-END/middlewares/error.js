// Création d'une gestion d'erreur personalisée
export const createError = (status, message) => {
    // On crée une nouvelle instance d'erreur vide
    const error = new Error()
    // On définit le code d'état de l'erreur en fonction du parametre "status"
    error.status = status
    // On définit le message d'erreur en fonction du parametre "message"
    error.message = message
    // On renvoie l'instance d'erreur personnalisée
    return error
}