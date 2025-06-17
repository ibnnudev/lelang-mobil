const router = require("express").Router();

// -- Import Routes
const carRouter = require("./car");
const userRouter = require("./user");
const auctionRouter = require("./auction");
const bidRouter = require("./bid");

// -- Use Routes
router.use("/car", carRouter);
router.use("/user", userRouter);
router.use("/auction", auctionRouter);
router.use("/bid", bidRouter);

module.exports = router;
