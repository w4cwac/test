const Reservation = require("../models/reservation");
const Catway = require("../models/catways");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Créer une nouvelle réservation
/**
 * Création d'un reservation
 * @param {Object} req - Objet de la requete http
 * @param {Object} res - Objet de la reponse http
 * @return {Object} - Réservation créée
 */
exports.createReservation = async (req, res) => {
  const reservation = new Reservation({
    catwayNumber: req.body.catwayNumber,
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
  });

  try {
    const newReservation = await reservation.save();
    res.redirect("/dashboard");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lister les réservations pour un catway spécifique
/**
 * Liste des catways pour un catway spécifique
 * @param {Object} req - Objet de la requete http
 * @param {Object} res - Objet de la reponse http
 * @return {Object} - Liste des reservation pour un catway
 */
exports.listReservationsByCatway = async (req, res) => {
  try {
    //recupération de l'id dans la requete
    const catwayNumber = req.query;
    //Verification des catway par rapport a l'id enregistré
    const catway = await Catway.findOne(catwayNumber);
    if (!catway) {
      return res.status(404).json({ message: "Catway not found" });
    }

    const reservations = await Reservation.find({ catwayNumber: catway.catwayNumber });
    console.log(catway);
    res.status(200).render("reservationsCatway", { catway, reservations });
  } catch (err) {
    res.status(500).send(err);
  }
};



// Obtenir une réservation par ID
/**
 * Detaild e la reservation par rapport au catway et son id 
 * @param {Object} req - Objet de la requete http
 * @param {Object} res - Objet de la reponse http
 * @return {Object} - Detail de la reservation
 */
exports.getReservationById = async (req, res) => {
  try {
    const catwayNumber = req.query.catwayNumber;
    //Verification du catway par rapport au catwayNumber enregistré
    const catway = await Catway.findOne({catwayNumber});
    if (!catway) {
      return res.status(404).json({ message: "Catway not found" });
    }

    const idReservation = req.query.idReservation;
    // Vérification de la réservation par son ID
    const reservation = await Reservation.findById(idReservation);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    console.log('Catway:'+ catway, 'Reservation: ' + reservation);
    res.status(200).render('reservationDetail',{ reservation, catway });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Suppression de la reservation
 * @param {Object} req - Objet de la requete http
 * @param {Object} res - Objet de la reponse http
 * @return {Object} - reservation supprimée
 */
exports.deleteReservation = async (req, res) => {
  try {
    const catwayNumber = req.body.catwayNumber;
    //Verification du catway par rapport au catwayNumber enregistré
    const catway = await Catway.findOne({catwayNumber});
    if (!catway) {
      return res.status(404).json({ message: "Catway not found" });
    }
    console.log(catway)
    const idReservation = req.body.idReservation;
    // Vérification de la réservation par son ID
    const reservation = await Reservation.findByIdAndDelete(idReservation);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    console.log(reservation)
    console.log('Suppression ok', reservation)
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Liste des reservations
 * @param {Object} req - Objet de la requete http
 * @param {Object} res - Objet de la reponse http
 * @return {Object} - Liste des reservation
 */
exports.listeReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render("reservations", { reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
