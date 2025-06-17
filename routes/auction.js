const router = require("express").Router();
const auctionController = require("../controllers/auction");

router.route("/").get(auctionController.getAll).post(auctionController.store);

router
  .route("/:id")
  .get(auctionController.getById)
  .put(auctionController.update)
  .delete(auctionController.destroy);

module.exports = router;
