const Notes = require("../models/notes.model");
const User = require("../models/user.model");
const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = require("../services/upload.service");
const fs = require("fs");

async function getNotes(req, res) {
  try {
    const user = req.user;
    const notes = await Notes.find({
      user,
    }).select("-user");
    if (notes.length == 0) {
      return res.status(404).json({
        message: "No notes found",
      });
    }
    return res.status(200).json({
      message: "Notes fetched successfully",
      notes,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function createNote(req, res) {
  try {
    const { title, description } = req.body;
    if (!req.file || title.trim() === "") {
      return res.status(400).json({
        message: "File and title are required",
      });
    }

    const safeTitle = title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");

    const response = await uploadToCloudinary(
      req.file.path,
      req.file.mimetype,
      {
        public_id: safeTitle,
      },
    );

    const note = await Notes.create({
      user: req.user,
      title,
      fileUrl: response.secure_url,
      publicId: response.public_id,
      description,
    });

    fs.unlink(req.file.path, (err) => {
      if (err) console.log("Failed to delete local file:", err);
      else console.log("Local file deleted");
    });

    return res.status(200).json({
      message: "Note created successfully",
      note: {
        _id: note._id,
        title: note.title,
        fileUrl: note.fileUrl,
        description: note.description,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function updateNote(req, res) {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    if (!req.file) {
      return res.status(400).json({
        message: "File is required",
      });
    }

    const note = await Notes.findOne({
      _id: id,
      user: req.user,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    const safeTitle = title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
    const response = await uploadToCloudinary(
      req.file.path,
      req.file.mimetype,
      {
        public_id: safeTitle,
      },
    );

    if (note.publicId) {
      await cloudinary.uploader.destroy(note.publicId);
    }

    note.title = title;
    note.fileUrl = response.secure_url;
    note.publicId = response.public_id;
    note.description = description;

    await note.save();

    fs.unlink(req.file.path, (err) => {
      if (err) console.log("Failed to delete local file:", err);
      else console.log("Local file deleted");
    });

    return res.status(200).json({
      message: "Note updated successfully",
      note: {
        _id: note._id,
        title: note.title,
        fileUrl: note.fileUrl,
        description: note.description,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function deleteNote(req, res) {
  try {
    const id = req.params.id;
    const note = await Notes.findOneAndDelete({ _id: id, user: req.user });
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    if (note.publicId) {
      await cloudinary.uploader.destroy(note.publicId);
    }

    return res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
