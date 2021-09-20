const express = require("express");
const router = express.Router();
const subjectController = require("../controller/subject.controller");

router.post("/create", subjectController.createSubject);
router.get("/get/all", subjectController.getAllSubject);
router.post("/get", subjectController.getSubjectById);
router.post('/professor/get', subjectController.getAllSubjectByProfessor)
router.post('/alternateprofessor/get', subjectController.getAllSubjectByAlternateProfessor)

module.exports = router;
