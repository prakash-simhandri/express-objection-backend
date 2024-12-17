const express = require("express");
const router = express.Router();
const utmController = require("../../controllers/utmController");

// Define UTM routes

// Create a new UTM
router.post("/utm", utmController.createUTM);

// Get all UTMs
router.get("/utm", utmController.getAllUTMs);

// Get a UTM by ID
router.get("/utm/:id", utmController.getUTMById);

// Update a UTM by ID
router.put("/utm/:id", utmController.updateUTM);

// Delete a UTM by ID
router.delete("/utm/:id", utmController.deleteUTM);

module.exports = router;
