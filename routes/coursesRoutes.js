const express = require("express");
const coursesModel = require("../models/CoursesModel");
const { default: mongoose } = require("mongoose");
const router2 = express.Router();

//COURSES
router2.get("/", async (req, res) => {
  try {
    const courses = await coursesModel.find();
    if (courses.length === 0) {
      res.status(400).json({
        success: false,
        msg: "No hay Courses",
      });
    } else {
      res.status(200).json({
        success: true,
        data: courses,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error Interno en el servidor ${error.message}`,
    });
  }
});

router2.get("/:id", async (req, res) => {
  try {
    //VALIDAR ID MONMGO
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        msg: `Id invalido`,
      });
    } else {
      const courses = await coursesModel.findById(req.params.id);
      if (!courses) {
        res.status(400).json({
          success: false,
          msg: `NO EXISTE EL Curso ${req.params.id}`,
        });
      } else {
        //si si existe
        res.status(200).json({
          success: true,
          data: courses,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error Interno en el servidor ${error.message}`,
    });
  }
});

router2.post("/", async (req, res) => {
  //Add a new bootcamp
  try {
    const newcourse = await coursesModel.create(req.body);
    res.status(201).json({
      success: true,
      data: newcourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `${error.message}`,
    });
  }
});

router2.put("/:id", async (req, res) => {
  try {
    //VALIDAR ID MONMGO
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        msg: `Id invalido`,
      });
    } else {
      const editcourse = await coursesModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!editcourse) {
        res.status(400).json({
          success: false,
          msg: `EL Curso no existe ${req.params.id}`,
        });
      } else {
        res.status(200).json({
          success: true,
          data: editcourse,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `${error.message}`,
    });
  }
});

router2.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    //VALIDAR ID MONMGO
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        msg: `Id invalido`,
      });
    } else {
      const borrar = await coursesModel.findByIdAndDelete(req.params.id);
      if (!borrar) {
        res.status(400).json({
          success: false,
          msg: `El curso no existe ${req.params.id}`,
        });
      } else {
        res.status(200).json({
          success: true,
          data: borrar,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `${error.message}`,
    });
  }
});
module.exports = router2;

//URI
