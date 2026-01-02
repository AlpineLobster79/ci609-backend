const express = require("express");
const upload = require("../middleware/upload");
const controller = require("../controllers/sightings");

const router = express.Router();

router.get("/", controller.getAll);
router.post("/", upload.single("image"), controller.create);

module.exports = router;