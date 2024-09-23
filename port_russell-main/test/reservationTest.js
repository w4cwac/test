const assert = require("assert");
const reservationService = require("../service/reservationService");
const mongoose = require("mongoose");
const Catway = require("../models/catways");
const Reservation = require("../models/reservation");
require("dotenv").config();

// Avant les tests, connectez-vous à MongoDB
before(async function () {
  this.timeout(5000); // Augmentez le délai d'attente à 10 secondes pour la connexion à la base de données
  await mongoose.connect(process.env.MONGO_URI);
});

// Après les tests, déconnectez-vous de MongoDB
after(async function () {
  await mongoose.disconnect();
});

describe("POST dashboard/catways/:id/reservations", function () {
  it("function createReservation", async function () {
    const req = {
      body: {
        catwayNumber: 3,
        clientName: "Jean Garde",
        boatName: "Du bateau",
        checkIn: "2022-06-20T06:00:00Z",
        checkOut: "2022-08-27T06:00:00Z",
      },
    };
    const res = {
      status: function (code) {
        console.log("Status code:", code);
        assert.strictEqual(code, 201);
        return this;
      },
      json: function (data) {
        assert.strictEqual(data, { message: "Réservation enregistré !" });
      },
      redirect: function (view) {
        assert.strictEqual(view, "/dashboard");
      },
    };
    await reservationService.createReservation(req, res);
  });
});

describe("GET dashboard/catways/:id/reservations", function () {
  it("function listReservationsByCatway", async function () {
    const req = {
      query: { catwayNumber: 3 },
    };
    const res = {
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      render: function (view, options) {
        this.view = view;
        this.options = options;
      },
      json: function (data) {
        this.data = data;
      },
      send: function (err) {
        this.error = err;
      },
    };

    await reservationService.listReservationsByCatway(req, res);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.view, "reservationsCatway");
    assert(Array.isArray(res.options.reservations));
  });
});

describe("GET dashboard/catways/:id/reservations/:idReservation", function () {
  it("function getReservationById", async function () {
      // Récupérez les données de test créées pour les utiliser dans le test
      const catway = await Catway.findOne({ catwayNumber: 3 });
      const reservation = await Reservation.findOne({ catwayNumber: 3 });
  
      const req = {
        query: {
          catwayNumber: catway.catwayNumber,
          idReservation: reservation._id.toString(),
        },
      };
      const res = {
        statusCode: undefined,
        status: function (code) {
            assert.strictEqual(code, 200);
          return this;
        },
        render: function (view, options) {
            assert.strictEqual(view, "reservationDetail");
            assert.strictEqual(typeof options.catway, 'object');
            assert.strictEqual(typeof options.reservation, 'object');
        },
        json: function (data) {
          this.data = data;
        },
        send: function (err) {
          this.error = err;
        },
      };
  
      await reservationService.getReservationById(req, res);

  });
});

describe("DELETE dashboard/catways/:id/reservations/:idReservation", function () {
  it("function deleteReservation", async function () {
    const catway = await Catway.findOne({ catwayNumber: 3 });
    const newReservation = new Reservation({
      catwayNumber: catway.catwayNumber,
      clientName: "Delete Test Client",
      boatName: "Delete Test Boat",
      checkIn: new Date(),
      checkOut: new Date(),
    });
    await newReservation.save();

    const req = {
      body: {
        catwayNumber: catway.catwayNumber,
        idReservation: newReservation._id,
      },
    };
    const res = {
      status: function (code) {
        assert.strictEqual(code, 200);
        return this;
      },
      redirect: function (view) {
        assert.strictEqual(view, "/dashboard");
      },
    };

    await reservationService.deleteReservation(req, res);
  });
});
