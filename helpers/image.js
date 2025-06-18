const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// console.log("Cloudinary configuration:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET ? "***" : "not set",
// });

const saveImage = async (file) => {
  if (!file || !file.buffer) {
    throw new Error("Image file is required");
  }
  if (!file.mimetype.startsWith("image/")) {
    throw new Error("Only image files are allowed!");
  }
  const dataUri = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64"
  )}`;
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
    folder: process.env.CLOUDINARY_FOLDER || "default_folder",
  };

  try {
    const result = await cloudinary.uploader.upload(dataUri, options);
    // console.log("Image uploaded successfully:", result);
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    // console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};

const deleteImage = async (publicId) => {
  if (!publicId) throw new Error("Public ID is required to delete an image");

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    // console.log("Image deleted successfully:", result);
    if (result.result !== "ok")
      // console.warn("Image deletion may not have been successful:", result);
      return result;
  } catch (error) {
    // console.error("Error deleting image from Cloudinary:", error);
    throw new Error("Failed to delete image");
  }
};

module.exports = {
  saveImage,
  deleteImage,
};
