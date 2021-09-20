const Subject = require("../model/Subject");
const crypto = require("crypto");
let subjectController = {};

subjectController.createSubject = (req, res) => {
  try {
    const { name, code, professorId, alternateProfessorId, proficiency } =
      req.body;

    Subject.findOne({ code }).then((data) => {
      if (data) {
        return res.status(400).json({
          success: false,
          error: "Subject code is already taken",
        });
      }

      let newSubject = Subject({
        name,
        code,
        professorId,
        alternateProfessorId,
        proficiency,
      });

      newSubject
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "Subject successfully created.",
          });
        })
        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: "Subject already confirmed.",
          });
        });
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Subject not created successfully",
    });
  }
};

subjectController.getAllSubject = async (req, res) => {
  try {
    Subject.find()
      .populate("professorId", ["name"])
      .populate("alternateProfessorId", ["name"])
      .exec((err, subjects) => {
        if (err) {
          return res.status(400).json({
            success: false,
            error: "Getting data from db failed!",
          });
        }
        if (!subjects) {
          return res.status(400).json({
            success: false,
            error: "No subject found!",
          });
        }
        return res.status(200).json({
          success: true,
          data: subjects,
        });
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

subjectController.getSubjectById = async (req, res) => {
  try {
    const { subjectId } = req.body;
    if (subjectId) {
      await Subject.findOne({ _id: subjectId })
        .populate("professorId", ["name"])
        .populate("alternateProfessorId", ["name"])
        .exec((err, data) => {
          if (err) {
            return res.status(400).json({
              success: false,
              error: "Getting data from db failed!",
            });
          }
          if (!data) {
            return res.status(400).json({
              success: false,
              error: "No subject found!",
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

subjectController.getAllSubjectByProfessor = async (req, res) => {
  try {
    const { professorId } = req.body;
    if (professorId) {
      await Subject.find({ professorId: professorId })
        .populate("professorId", ["name"])
        .populate("alternateProfessorId", ["name"])
        .exec((err, data) => {
          if (err) {
            return res.status(400).json({
              success: false,
              error: "Getting data from db failed!",
            });
          }
          if (!data) {
            return res.status(400).json({
              success: false,
              error: "No subject found for particular professor!",
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

subjectController.getAllSubjectByAlternateProfessor = async (req, res) => {
  try {
    const { alternateProfessorId } = req.body;
    if (alternateProfessorId) {
      await Subject.find({ alternateProfessorId: alternateProfessorId })
        .populate("professorId", ["name"])
        .populate("alternateProfessorId", ["name"])
        .exec((err, data) => {
          if (err) {
            return res.status(400).json({
              success: false,
              error: "Getting data from db failed!",
            });
          }
          if (!data) {
            return res.status(400).json({
              success: false,
              error: "No subject found for particular alternate professor!",
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

subjectController.updateSubject = async (req, res) => {
  try {
    Subject.findOne({ _id: req.body._id }, async (err, subject) => {
      if (err) {
        return res.status(400).json({
          success: false,
          err: "No Subject found...",
        });
      }

      if (req.body.name) {
        subject.name = req.body.name;
      }
      if (req.body.code) {
        subject.code = req.body.code;
      }
      if (req.body.professor) {
        subject.professor = req.body.professor;
      }
      if (req.body.alternateProfessorId) {
        subject.alternateProfessorId = req.body.alternateProfessorId;
      }
      if (req.body.proficiency) {
        subject.proficiency = req.body.proficiency;
      }

      const updatedData = await Subject.findOneAndUpdate(
        { _id: req.body._id },
        subject,
        { new: true },
        (err, subject) => {
          if (err) {
            return res.status(400).json({
              success: false,
              err: "No subject found...",
            });
          }
          return res.status(200).json({
            success: true,
            message: "Subject data successfully updated",
            data: subject,
          });
        }
      );
    });
  } catch (error) {
    res.status(404);
    res.send({ error: "Subject doesn't exist!" });
  }
};

subjectController.deletesubject = async (req, res) => {
  try {
    const { subjectId } = req.body;
    subject = await Subject.findOneAndRemove({
      _id: subjectId,
    });
    return res.status(200).json({
      success: true,
      message: "Subject Removed",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = subjectController;
