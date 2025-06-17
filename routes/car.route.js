const router = require("express").Router();
const carController = require("../controllers/car.controller");

router.route("/").get(carController.getAll).post(carController.store);
router
  .route("/:id")
  .get(carController.getById)
  .put(carController.update)
  .delete(carController.destroy);

module.exports = router;
