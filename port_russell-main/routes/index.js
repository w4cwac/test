var express = require("express");
var router = express.Router();

const authService = require('../service/authService');
const private = require('../middelwares/private')
/**
 * @swagger
 * /:
 *  get:
 *    summary: Page d'acceuil
 *    tags: [Index]
 *    responses: 
 *      200:
 *      description: Affiche la page d'accueil
 */
router.get("/", function (req, res, next) {
  res.render("index");
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Enregistre un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 */
router.post("/register",private, authService.postRegister);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 */
router.post('/login',authService.postLogin)



module.exports = router;
