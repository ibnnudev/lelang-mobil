const carImagesModel = require("../models/carimage");
const fs = require("fs");
const path = require("path");
const { saveImage, deleteImage } = require("../helpers/image");
const { sequelize } = require("../config/database");

const FOLDER_TO_SAVE = "car";

const getAll = async () => {
  try {
    const result = await carImagesModel.findAll({
      where: {
        deleted_at: null,
      },
    });
    return result;
  } catch (error) {
    console.error("Error fetching car images:", error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const result = await carImagesModel.findOne({
      where: {
        id,
        deleted_at: null,
      },
    });
    if (!result) {
      throw new Error(`Car image with ID ${id} not found`);
    }
    return result;
  } catch (error) {
    console.error("Error fetching car image by ID:", error);
    throw error;
  }
};

const getByCarId = async (car_id) => {
  try {
    const result = await carImagesModel.findAll({
      where: {
        car_id: car_id,
        deleted_at: null,
      },
    });
    if (!result || result.length === 0) {
      throw new Error(`No images found for car ID: ${car_id}`);
    }
    return result;
  } catch (error) {
    console.error("Error fetching car images by car ID:", error);
    throw error;
  }
};

const store = async (payload, image) => {
  let dbtrx;
  let cloudinaryData;

  const { car_id, isThumbnail } = payload;

  if (!image) throw new Error("Image file is required");
  if (!car_id) throw new Error("Car ID is required");

  try {
    dbtrx = await sequelize.transaction();
    cloudinaryData = await saveImage(image);
    const carImage = await carImagesModel.create(
      {
        car_id: car_id,
        image_url: cloudinaryData.url,
        public_id: cloudinaryData.public_id,
        is_thumbnail: isThumbnail || false,
      },
      { transaction: dbtrx }
    );
    await dbtrx.commit();
    return carImage;
  } catch (error) {
    if (dbtrx) await dbtrx.rollback();
    if (cloudinaryData && cloudinaryData.public_id)
      await deleteImage(cloudinaryData.public_id);
    console.error("Error storing car image:", error);
    throw error;
  }
};

const update = async (id, payload, image) => {
  let dbtrx;
  let newCloudinaryData;
  let oldPublicIdToDelete;

  const { car_id, isThumbnail } = payload;
  if (!id) throw new Error("ID is required");
  if (!car_id) throw new Error("Car ID is required");
  if (!image) throw new Error("Image file is required");

  try {
    dbtrx = await sequelize.transaction();
    const updatedData = {};
    const carImage = await carImagesModel.findByPk(id, {
      transaction: dbtrx,
    });
    if (!carImage) throw new Error("Car image not found");
    if (image) {
      newCloudinaryData = await saveImage(image);
      oldPublicIdToDelete = carImage.public_id;
      updatedData.image_url = newCloudinaryData.url;
      updatedData.public_id = newCloudinaryData.public_id;
    } else {
      updatedData.image_url = carImage.image_url;
      updatedData.public_id = carImage.public_id;
    }

    if (car_id !== undefined) updatedData.car_id = car_id;
    if (isThumbnail !== undefined) updatedData.is_thumbnail = isThumbnail;
    updatedData.updated_at = new Date();

    await carImagesModel.update(
      updatedData,
      {
        where: { id },
      },
      { transaction: dbtrx }
    );
    await dbtrx.commit();

    if (
      oldPublicIdToDelete &&
      oldPublicIdToDelete !== newCloudinaryData?.public_id
    ) {
      await deleteImage(oldPublicIdToDelete);
    }

    return carImage;
  } catch (error) {
    if (dbtrx) await dbtrx.rollback();
    if (newCloudinaryData && newCloudinaryData.public_id) {
      await deleteImage(newCloudinaryData.public_id);
    }

    console.error("Error updating car image:", error);
    throw error;
  }
};

const destroy = async (id) => {
  let dbtrx;
  let publicIdToDelete;

  if (!id) throw new Error("ID is required");

  try {
    dbtrx = await sequelize.transaction();
    const carImage = await carImagesModel.findByPk(id, {
      transaction: dbtrx,
    });
    if (!carImage) throw new Error("Car image not found");

    publicIdToDelete = carImage.public_id;

    await carImagesModel.destroy({
      where: { id },
      transaction: dbtrx,
    });
    await dbtrx.commit();

    if (publicIdToDelete) {
      await deleteImage(publicIdToDelete);
    }

    return { message: `Car image with ID ${id} deleted successfully` };
  } catch (error) {
    if (dbtrx) await dbtrx.rollback();
    if (publicIdToDelete) {
      await deleteImage(publicIdToDelete);
    }
    console.error("Error deleting car image:", error);
    throw error;
  }
};

module.exports = {
  getAll,
  getById,
  getByCarId,
  store,
  update,
  destroy,
};
