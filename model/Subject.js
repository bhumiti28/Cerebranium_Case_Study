const mongoose = require("mongoose");
const Professor = require("./Professor");

const SubjectModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      maxlength: 12,
      unique: true,
      trim: true,
    },
    professorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Professor,
      required: true,
    },
    alternateProfessorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Professor,
    },
    proficiency: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectModel);
