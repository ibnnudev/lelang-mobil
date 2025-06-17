const router = require("express").Router();
const bidController = require("../controllers/bid");

router.route("/").get(bidController.getAll).post(bidController.store);

router
  .route("/:id")
  .get(bidController.getById)
  .put(bidController.update)
  .delete(bidController.retracted);

router.get("/:auction_id", bidController.getByAuctionId);

module.exports = router;
