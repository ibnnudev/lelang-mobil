const Car = require("../models/car");

const getAll = async () => {
  try {
    const cars = await Car.findAll();
    return cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const car = await Car.findByPk(id);
    if (!car) {
      throw new Error("Car not found");
    }
    return car;
  } catch (error) {
    console.error(`Error fetching car with ID ${id}:`, error);
    throw error;
  }
};

const store = async (carData) => {
  try {
    const car = await Car.create(carData);
    return car;
  } catch (error) {
    console.error("Error creating car:", error);
    throw error;
  }
};

const update = async (id, carData) => {
  const [affectedRows] = await Car.update(carData, {
    where: { id },
  });
  if (affectedRows === 0) {
    throw new Error("Car not found or no changes made");
  }
  const updatedCar = await Car.findByPk(id);
  if (!updatedCar) {
    throw new Error("Car not found after update");
  }
  return updatedCar;
};

const destroy = async (id) => {
  try {
    const car = await Car.destroy({
      where: { id },
    });
    if (!car) {
      throw new Error("Car not found or already deleted");
    }
    return { message: "Car deleted successfully" };
  } catch (error) {
    console.error(`Error deleting car with ID ${id}:`, error);
    throw error;
  }
};

const carRepository = {
  getAll,
  getById,
  store,
  update,
  destroy,
};

module.exports = carRepository;
