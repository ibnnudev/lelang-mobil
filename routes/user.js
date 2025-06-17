const router = require("express").Router();
const userController = require("../controllers/user");

router.route("/").get(userController.getAll).post(userController.store);

router
  .route("/:id")
  .get(userController.getById)
  .put(userController.update)
  .delete(userController.destroy);

module.exports = router;
