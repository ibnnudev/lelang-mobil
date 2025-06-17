const router = require("express").Router();
const carController = require("../controllers/car");
const authenticate = require("../middlewares/auth");

router
  .route("/")
  .get(authenticate, carController.getAll)
  .post(authenticate, carController.store);

router
  .route("/:id")
  .get(authenticate, carController.getById)
  .put(authenticate, carController.update)
  .delete(authenticate, carController.destroy);

module.exports = router;
