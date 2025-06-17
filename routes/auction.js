const router = require("express").Router();
const auctionController = require("../controllers/auction");
const authenticate = require("../middlewares/auth");

router
  .route("/")
  .get(authenticate, auctionController.getAll)
  .post(authenticate, auctionController.store);

router
  .route("/:id")
  .get(authenticate, auctionController.getById)
  .put(authenticate, auctionController.update)
  .delete(authenticate, auctionController.destroy);

module.exports = router;
