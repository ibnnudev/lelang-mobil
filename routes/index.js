const router = require("express").Router();

const carRouter = require("./car");
const userRouter = require("./user");
const auctionRouter = require("./auction");
const bidRouter = require("./bid");
const transactionRouter = require("./transaction");
const carImageRouter = require("./carimage");

router.use("/car", carRouter);
router.use("/user", userRouter);
router.use("/auction", auctionRouter);
router.use("/bid", bidRouter);
router.use("/transaction", transactionRouter);
router.use("/car-image", carImageRouter);

module.exports = router;
