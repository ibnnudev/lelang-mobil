const router = require("express").Router();
const userController = require("../controllers/user");
const authenticate = require("../middlewares/auth");

router
  .route("/")
  .get(authenticate, userController.getAll)
  .post(authenticate, userController.store);
router
  .route("/:id")
  .get(authenticate, userController.getById)
  .put(authenticate, userController.update)
  .delete(authenticate, userController.destroy);

router.post("/login", userController.login);

module.exports = router;
