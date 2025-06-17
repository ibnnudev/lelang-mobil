const router = require("express").Router();
const transactionController = require("../controllers/transaction");

router
  .route("/")
  .get(transactionController.getAll)
  .post(transactionController.initiateTransaction);

router.route("/:id").get(transactionController.getById);

router.patch("/:id/success", transactionController.markPaymentSuccessful);
router.patch("/:id/fail", transactionController.markPaymentFailed);

module.exports = router;
