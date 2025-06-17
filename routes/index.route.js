const router = require("express").Router();

// -- Import Routes
const carRouter = require("./car.route");

// -- Use Routes
router.use("/cars", carRouter);

module.exports = router;
