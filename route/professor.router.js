const express = require("express");
const router = express.Router();
const professorController = require("../controller/professor.controller");

router.post("/create", professorController.createProfessor);
router.get("/get/all", professorController.getAllProfessor);
router.post("/get", professorController.getProfessorById);
router.put("/update", professorController.updateProfessor);
router.delete("/delete", professorController.deleteProfessor);

module.exports = router;
