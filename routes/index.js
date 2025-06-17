const router = require("express").Router();

const carRouter = require("./car");
const userRouter = require("./user");
const auctionRouter = require("./auction");
const bidRouter = require("./bid");

router.use("/car", carRouter);
router.use("/user", userRouter);
router.use("/auction", auctionRouter);
router.use("/bid", bidRouter);

module.exports = router;
