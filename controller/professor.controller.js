const Professor = require("../model/Professor");
const crypto = require("crypto");
let professorController = {};

professorController.createProfessor = (req, res) => {
  try {
    const { name, email, password } = req.body;

    Professor.findOne({ email }).then((data) => {
      if (data) {
        return res.status(400).json({
          success: false,
          error: "email is already taken",
        });
      }

      let newprofessor = Professor({
        name,
        email,
        password,
      });

      newprofessor
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "Professor successfully created.",
          });
        })
        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: "Professor already confirmed.",
          });
        });
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Professor not created successfully",
    });
  }
};

professorController.getAllProfessor = async (req, res) => {
  try {
    professors = await Professor.find();

    return res.status(200).json({
      success: true,
      data: professors,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

professorController.getProfessorById = async (req, res) => {
  try {
    const { professorId } = req.body;
    if (professorId) {
      await Professor.findOne({ _id: professorId }).exec((err, data) => {
        if (err) {
          return res.status(400).json({
            success: false,
            error: "Getting data from db failed!",
          });
        }
        if (!data) {
          return res.status(400).json({
            success: false,
            error: "No professor found!",
          });
        }
        return res.status(200).json({
          success: true,
          data: data,
        });
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

professorController.updateProfessor = async (req, res) => {
  try {
    if (req.body._id) {
      Professor.findOne({ _id: req.body._id }, async (err, professor) => {
        if (err) {
          return res.status(400).json({
            success: false,
            err: "No professor found...",
          });
        }

        if (req.body.name) {
          professor.name = req.body.name;
        }
        if (req.body.email) {
          professor.email = req.body.email;
        }
        if (req.body.password) {
          professor.password = req.body.password;
        }

        const updatedData = await Professor.findOneAndUpdate(
          { _id: req.body._id },
          professor,
          { new: true },
          (err, professor) => {
            if (err) {
              return res.status(400).json({
                success: false,
                err: "No professor found...",
              });
            }
            return res.status(200).json({
              success: true,
              message: "Professor data successfully updated",
              data: professor,
            });
          }
        );
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Id cannot be empty!",
      });
    }
  } catch (error) {
    return res.status(404).json({ error: "Professor doesn't exist!" });
  }
};

professorController.deleteProfessor = async (req, res) => {
  try {
    const { professorId } = req.body;
    professor = await Professor.findOneAndRemove({
      _id: professorId,
    });
    return res.status(200).json({
      success: true,
      message: "Professor Removed",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = professorController;
