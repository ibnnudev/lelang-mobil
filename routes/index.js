const router = require("express").Router();

// -- Import Routes
const carRouter = require("./car");
const userRouter = require("./user");

// -- Use Routes
router.use("/cars", carRouter);
router.use("/users", userRouter);

module.exports = router;
