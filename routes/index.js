const router = require("express").Router();

// -- Import Routes
const carRouter = require("./car");
const userRouter = require("./user");
const auctionRouter = require("./auction");

// -- Use Routes
router.use("/cars", carRouter);
router.use("/users", userRouter);
router.use("/auctions", auctionRouter);

module.exports = router;
