const assert = require("assert");
const catwayService = require("../service/catwaysService");
const mongoose = require("mongoose");
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

// Test de la route POST /dashboard/catways
describe("POST /dashboard/catways", function () {
  it("function addCatway", async function () {
    const req = {
      body: {
        catwayNumber: 4,
        type: "court",
        catwayState: "bon etat",
      },
    };
    const res = {
      status: function (code) {
        console.log("Status code:", code);
        assert.strictEqual(code, 201);
        return this;
      },
      json: function (data) {
        assert.strictEqual(data, { message: "Objet enregistré !" });
      },
      redirect: function (view) {
        assert.strictEqual(view, "/dashboard/catways");
      },
    };
    await catwayService.addCatway(req, res);
  });
});

describe("GET /dashboard/catways", function () {
  it("function listCatways", async function () {
    const req = {};
    const res = {
      status: function (code) {
        assert.strictEqual(code, 200);
        return this;
      },
      render: function (view, options) {
        assert.strictEqual(view, "catways");
        assert(Array.isArray(options.catways));
      },
    };
    await catwayService.listCatways(req, res);
  });
});

describe("GET /dashboard/catways/:id", function () {
  it("function detailCatway", async function () {
    const req = {
      query: { catwayNumber: 3 },
    };
    const res = {
      status: function (code) {
        assert.strictEqual(code, 200);
        return this;
      },
      json: function (data) {
        assert.strictEqual(typeof data.catway, "object");
      },
      render: function (view, options) {
        assert.strictEqual(view, "catwayDetail");
        assert.strictEqual(typeof options.catway, "object");
      },
    };
    await catwayService.detailCatway(req, res);
  });
});

describe("PATCH /dashboard/catways/:id", function () {
  it("function updateCatwayById", async function () {
    // Requête de mise à jour simulée
    const req = {
      params: { id: "66992d8c96f49b7146e95449" }, // ID du catway à mettre à jour
      body: { catwayState: "mauvais état" }, // Nouvel état du catway
    };
    const res = {
      status: function (code) {
        assert.strictEqual(code, 302);
        return this;
      },
      redirect: function (view) {
        assert.strictEqual(view, "/dashboard");
      },
    };
    await catwayService.updateCatwayById(req, res);
  });
});

describe("DELETE /dashboard/catways/:id", function () {
  it("function deleteCatway", async function () {
    const req = {
      body: { catwayNumber: 4 },
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
    await catwayService.deleteCatway(req, res);
  });
});
