const router = require("express").Router();
const carImageController = require("../controllers/carimage");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router
  .route("/")
  .get(auth, carImageController.getAll)
  .post(auth, upload.single("image"), carImageController.store);

router
  .route("/:id")
  .get(auth, carImageController.getById)
  .put(auth, upload.single("image"), carImageController.update)
  .delete(auth, carImageController.destroy);

router.get("/car/:carId", auth, carImageController.getByCarId);

module.exports = router;
