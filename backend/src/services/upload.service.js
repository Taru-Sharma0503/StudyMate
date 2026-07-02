const cloudinary = require("../config/cloudinary");

async function uploadToCloudinary(filePath, mimetype, options = {}) {
  const isImage = mimetype.startsWith("image/");
  const isVideo = mimetype.startsWith("video/");

  const resource_type = isImage || isVideo ? "image" : "raw";

  return await cloudinary.uploader.upload(filePath, {
    resource_type,
    type: "upload",
    access_mode: "public",
    ...options,
  });
}

module.exports = uploadToCloudinary;
