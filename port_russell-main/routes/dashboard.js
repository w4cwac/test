var express = require("express");
var router = express.Router();

//Service
const authService = require("../service/authService");
const userService = require("../service/userService");
const catwayServices = require("../service/catwaysService");
const reservationSevice = require("../service/reservationService");
//Middelwares
const private = require("../middelwares/private");

//Route dashboard
/**
 * @swagger
 * /dashboard:
 *  get:
 *    summary: Page du tableau de bord
 *    tags: [Dashboard]
 *    responses:
 *      200:
 *      description: Affiche le dashboard
 */
router.get("/", authService.getDashboard);

/**
 * @swagger
 * /dashboard/user/{id}:
 *   put:
 *     summary: Met à jour un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
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
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/user/:id", private, userService.updateUserById);
/**
 * @swagger
 * /dashboard/delete-profile/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/delete-profile/:id", private, userService.deleteUserById);

//Route catway
/**
 * @swagger
 * /dashboard/catways:
 *   get:
 *     summary: Liste tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste des catways
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Catway'
 *       500:
 *         description: Erreur serveur
 */
router.get("/catways", catwayServices.listCatways); //Route Liste des catways
/**
 * @swagger
 * /dashboard/catways:
 *   post:
 *     summary: Créer un catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       201:
 *         description: Catway créé avec succès
 *       400:
 *         description: Catway existe deja
 *       500:
 *         description: Erreur serveur
 */
router.post("/catways", private, catwayServices.addCatway);

/**
 * @swagger
 * /dashboard/catways/{id}:
 *   get:
 *     summary: Detail du catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du catway
 *     responses:
 *       200:
 *         description: Detail du catway
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Catway'
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/catways/:id", catwayServices.detailCatway);
/**
 * @swagger
 * /dashboard/catways/{id}:
 *   patch:
 *     summary: Met à jour partiellement un catway par ID
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       200:
 *         description: Catway mis à jour avec succès
 *       404:
 *         description: Catway non trouvé
 *       500: 
 *         description: Erreur service
 */
router.patch("/catways/:id", catwayServices.updateCatwayById);
/**
 * @swagger
 * /dashboard/catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du catway
 *     responses:
 *       200:
 *         description: Catway supprimé avec succès
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/catways/:id", private, catwayServices.deleteCatway);

//Route reservation
/**
 * @swagger
 * /dashboard/reservations:
 *   get:
 *     summary: Liste de toutes les reservation
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Liste des reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Erreur serveur
 */
router.get("/reservations", private, reservationSevice.listeReservations);

/**
 * @swagger
 * /dashboard/catways/{id}/reservations:
 *   post:
 *     summary: Crée une réservation pour un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       404:
 *         description: Réservation non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.post("/catways/:id/reservations", private, reservationSevice.createReservation);
/**
 * @swagger
 * /dashboard/catways/{id}/reservations:
 *   get:
 *     summary: Liste des reservations pour un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Liste des reservation pour un catway par rapport à son ID
 *       404:
 *         description: Réservation non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/catways/:id/reservations", private, reservationSevice.listReservationsByCatway);
/**
 * @swagger
 * /dashboard/catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Liste d'une reservation pour un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Liste d'une reservation pour un catway par rapport à son ID
 *       404:
 *         description: Réservation non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/catways/:id/reservations/:idReservation",private,reservationSevice.getReservationById);
/**
 * @swagger
 * /dashboard/catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprime une reservation 
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Suppression de la reservation par rapport à son ID
 *       404:
 *         description: Réservation non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/catways/:id/reservations/:idReservation",private,reservationSevice.deleteReservation);

module.exports = router;
