const router = require("express").Router();
const transactionController = require("../controllers/transaction");
const authenticate = require("../middlewares/auth");

router
  .route("/")
  .get(authenticate, transactionController.getAll)
  .post(authenticate, transactionController.initiateTransaction);

router.route("/:id").get(authenticate, transactionController.getById);

router.patch(
  "/:id/success",
  authenticate,
  transactionController.markPaymentSuccessful
);
router.patch(
  "/:id/fail",
  authenticate,
  transactionController.markPaymentFailed
);

module.exports = router;
