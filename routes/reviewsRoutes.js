const express = require("express");
const reviewsModel = require("../models/Reviews");
const { default: mongoose } = require("mongoose");
const router3 = express.Router();

//COURSES
router3.get("/", async (req, res) => {
  try {
    const Reviews = await reviewsModel.find();
    if (Reviews.length === 0) {
      res.status(400).json({
        success: false,
        msg: "No hay Reviews",
      });
    } else {
      res.status(200).json({
        success: true,
        data: Reviews,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error Interno en el servidor ${error.message}`,
    });
  }
});

router3.get("/:id", async (req, res) => {
  try {
    //VALIDAR ID MONMGO
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        msg: `Id invalido`,
      });
    } else {
      const Reviews = await reviewsModel.findById(req.params.id);
      if (!Reviews) {
        res.status(400).json({
          success: false,
          msg: `NO EXISTE EL Reviews ${req.params.id}`,
        });
      } else {
        //si si existe
        res.status(200).json({
          success: true,
          data: Reviews,
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

router3.post("/", async (req, res) => {
  //Add a new bootcamp
  try {
    const newReviews = await reviewsModel.create(req.body);
    res.status(201).json({
      success: true,
      data: newReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `${error.message}`,
    });
  }
});

router3.put("/:id", async (req, res) => {
  try {
    //VALIDAR ID MONMGO
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        msg: `Id invalido`,
      });
    } else {
      const editreview = await reviewsModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!editreview) {
        res.status(400).json({
          success: false,
          msg: `EL Reviews no existe ${req.params.id}`,
        });
      } else {
        res.status(200).json({
          success: true,
          data: editreview,
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

router3.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    //VALIDAR ID MONMGO
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        msg: `Id invalido`,
      });
    } else {
      const borrar = await reviewsModel.findByIdAndDelete(req.params.id);
      if (!borrar) {
        res.status(400).json({
          success: false,
          msg: `EL Reviews no existe ${req.params.id}`,
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
module.exports = router3;

//URI
