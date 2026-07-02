const mongoose = require("mongoose");
const user = require("./user.model");

const tasksSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const tasksModel = mongoose.model("tasks", tasksSchema);

module.exports = tasksModel;
