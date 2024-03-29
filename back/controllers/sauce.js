const Sauce = require('../models/sauce'); //on importe le thing
const fs = require('fs'); //nouvelle importation. Il s'agit du package fs de Node, fs (file system-système de fichiers) : donne accès aux fonctions pour modifier/supprimer le système de fichiers


exports.createSauce = (req, res, next) => { //lié à la route post
    const sauceObject = JSON.parse(req.body.sauce); //objet envoyé en json parse
    delete sauceObject._id; //on supprime dans cet objet le champ id car il sera généré automatiquement par notre base de donnée
    delete sauceObject._userId; //on supprime dans cet objet le champ userid qui correspond à la personne qui a créée l'objet car nous ne voulons pas faire confiance au client, on utilisera l'id venant du token d'authentification
    sauceObject.likes=0; //qund on crée une sauce, il démarre à 0 pour les likes au lieu undefined
    sauceObject.dislikes=0;
    const sauce = new Sauce({ //on créé notre objet sans les 2 champs supprimés
        ...sauceObject,
        userId: req.auth.userId, //on extrait les userid de l'objet requête grâce au middleware
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //on génère l'url de l'image
    });
  
    sauce.save() //on enregistre l'objet dans la base de donnée avec save
    .then(() => { res.status(201).json({message: 'Sauce enregistrée !'})})
    .catch(error => { res.status(400).json( { error })})
 };

  exports.modifySauce = (req, res, next) => {  //lié à la route put
    const sauceObject = req.file ? { //extraction de l'objet, on voit s'il y a un champ file
        ...JSON.parse(req.body.sauce), //s'il y a un champ file, on récupère l'objet en parsant la chaine de caractères, transforme un objet stringifié en Object JavaScript exploitable
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //on recrée l'url, besoin dereq.protocol  et de req.get('host'), connectés par  '://'  et suivis de req.file.filename, pour reconstruire l'URL complète du fichier enregistré
    } : { ...req.body }; //s'il n'y a pas d'objet transmis,on récupère l'objet directement dans le corps de la requête
  
    delete sauceObject._userId; // suppression d'userTId pour éviter que qq'un crée un objet à son nom puis le modifie pour le réassigner à quelqu'un d'autre
    Sauce.findOne({_id: req.params.id}) //on récupère l'objet dans la base de donnée 
        .then((sauce) => { 
            if (sauce.userId != req.auth.userId) { //pour vérifier si c'est bien l'utilisateur à qui appartient cet objet qui cherche à le modifier (est ce que userId de la base est différent de l'userId du token?)
                res.status(401).json({ message : 'Not authorized'}); //si c'est non, message négatif
            } else { //si c'est bon
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})  //mettre à jour notre enregistrement ave le filtre+quel objet+ce qu'est récup dans le corps de la fonction+ id paramètre de URL
                .then(() => res.status(200).json({message : 'Objet modifié!'})) // si c'est bon, message de succès
                .catch(error => res.status(401).json({ error })); //si non, on renvoie error
            }
      })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

 exports.deleteSauce= (req, res, next) => {
    Sauce.findOne({ _id: req.params.id}) //Nous utilisons l'ID reçue comme paramètre pour accéder au Thing correspondant dans la base de données
        .then(sauce => {
            if (sauce.userId != req.auth.userId) { //Nous vérifions si l’utilisateur qui a fait la requête de suppression est bien celui qui a créé le Thing
                res.status(401).json({message: 'Not authorized'}); //si c'est pas le cas on envoie un message d'erreur
            } else {
                const filename = sauce.imageUrl.split('/images/')[1]; //Nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier
                fs.unlink(`images/${filename}`, () => { //Nous utilisons ensuite la fonction unlink du package fs pour supprimer ce fichier, en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé
                    Sauce.deleteOne({_id: req.params.id}) //Dans le callback, nous implémentons la logique d'origine en supprimant le Thing de la base de données
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

   exports.getOneSauce = (req, res, next) => { //nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint, nous utilisons deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre
    Sauce.findOne({ _id: req.params.id }) //nous utilisons ensuite la méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête 
     .then(sauce => res.status(200).json(sauce)) //ce Thing est ensuite retourné dans une Promise et envoyé au front-end
      .catch(error => res.status(404).json({ error })); //si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée
  };

  exports.getAllSauces = (req, res, next) => {   //frontend va récupérer cette url
          Sauce.find() // utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau contenant tous les Things dans notre base de données
       .then(sauces => res.status(200).json(sauces)) //on récupère le tableau avec tous les things retournés par la base de donnée
    .catch(error => res.status(400).json({ error }));
    };

 
      exports.userLikeSauce = (req, res, next) => {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                 if (req.body.like === 1) {
                    //= je like
                    // je vérifie que l'utilisateur n'a pas déjà liké
                    let index = sauce.usersLiked.indexOf(req.body.userId)
                        //id pas présente
                    if (!index > -1) {
                        sauce.likes++;
                            sauce.usersLiked.push(req.body.userId);
                    }
                } else if (req.body.like === 0) {
                    //id présente = on annule le like 
                    let indexLike = sauce.usersLiked.indexOf(req.body.userId);
                    let indexDislike = sauce.usersDisliked.indexOf(req.body.userId);
                    if (indexLike > 0) { //la personne a liké
                         sauce.likes--;
                         sauce.usersLiked.splice(indexLike, 1);
                    }
                    else if (indexDislike > 0){ //la personne a disliké
                        sauce.dislikes-- ;
                        sauce.usersDisliked.splice(indexDislike, 1);
                    }
                } else if (req.body.like === -1) {
                    let index = sauce.usersDisliked.indexOf(req.body.userId);
                        //id pas présente
                    if (!index > -1) {
                        sauce.dislikes++;
                            sauce.usersDisliked.push(req.body.userId);
                    }
                    
                }
              
                Sauce.updateOne({ _id: req.params.id }, sauce)
                    .then(() => res.status(201).json({ message: 'like dislike ok' }))
                    .catch(error => res.status(500).json({ error }))
            });
    };
