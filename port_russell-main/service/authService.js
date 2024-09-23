const User = require("../models/user");
const Catway = require("../models/catways");
const Reservation = require("../models/reservation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Partie Register

/**
 * Création d'un utilisateur
 * @param {object} req - Objet de la requete http
 * @param {object} res - Objet de la reponse http
 * @returns - Utilisateur créé
 */

exports.postRegister = async (req, res) => {
  try {
    //recupération des champs dans le corp de la requete
    const { email, password, username } = req.body;

    //Verification dans la base de donné de l'existance d'un email identique
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json("User already exists");
    }

    user = new User({ email, username, password });
    //sauvegarde du nouveau user
    await user.save();
    console.log(user);
    //redirection pour authentification
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/dashboard");
  }
};

//Partie Login
/**
 *  Envoye des idantifants de connexion
 * @param {object} req - Objet de la requete http
 * @param {object} res - Objet de la response http
 * @returns - connexion au dashboard
 */

exports.postLogin = async (req, res) => {
  //Recupération des champs dans le corp de la requete
  const { email, password } = req.body;
  //Verification dans la base de donné de l'existance de l'user par rapport au mail
  try {
    const user = await User.findOne({ email });
    //Si l'email est n'est pas trouver dans la base de donné retour un message d'erreur d'identification
    if (!user) {
      return res.status(400).json({ message: "Email Invalid !" });
    }

    //si email trouver compare les password haché
    const isMatch = await bcrypt.compare(password, user.password);
    //Si le password est different retourne un message d'erreur
    if (!isMatch) {
      return res.status(400).json({ message: "Password Invalid !" });
    }

    //Création d'un token avec JWT avec expiration au bout de 4h
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "4h" });
    res.cookie("token", token, { httpOnly: true });
    console.log(token);
    //Redirection au dashboard
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

//Partie dashboard

exports.getDashboard = async (req, res) => {
  //recupération du token dans les cookies
  const token = req.cookies.token;
  //si le token est different retourne a la page d'accueil
  if (!token) {
    return res.redirect("/");
  }
  try {
    //Verification et docodage du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Récupérer les informations de l'utilisateur à partir de la base de données
    const user = await User.findById(decoded.userId).select("-password");

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
           // Récupérer tous les catways pour les afficher dans le tableau de bord
           const catways = await Catway.find();

    //Si décodage reussi envoie sur la page dashbord
    res.render("dashboard", {user, catways});
    console.log("User ID:", decoded.userId);
  } catch (error) {
    res.clearCookie("token");
    res.redirect("/login");
    console.log(error);
  }
};