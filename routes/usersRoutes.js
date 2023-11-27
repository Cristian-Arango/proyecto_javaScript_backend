const express = require("express");
const usersModel = require("../models/usersModel");
const { default: mongoose } = require("mongoose");
const router4 = express.Router();

//COURSES
router4.get("/", async (req, res) => {
  try {
    const users = await usersModel.find();
    if (users.length === 0) {
      res.status(400).json({
        success: false,
        msg: "No hay Users",
      });
    } else {
      res.status(200).json({
        success: true,
        data: users,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error Interno en el servidor ${error.message}`,
    });
  }
});

router4.get("/:id", async (req, res) => {
  try {
    //VALIDAR ID MONMGO
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        msg: `Id invalido`,
      });
    } else {
      const users = await usersModel.findById(req.params.id);
      if (!users) {
        res.status(400).json({
          success: false,
          msg: `NO EXISTE EL USER ${req.params.id}`,
        });
      } else {
        //si si existe
        res.status(200).json({
          success: true,
          data: users,
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

router4.post("/register", async (req, res) => {
  try {
    const user = await usersModel.create(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `${error.message}`,
    });
  }
});

router4.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    } else {
      const isMatch = await user.compararPassword(password);
      if (isMatch) {
        res.status(200).json({
          success: false,
          msg: "usuario logged",
        });
      } else {
        res.status(401).json({
          success: false,
          msg: "usuario no logget",
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

router4.put("/:id", async (req, res) => {
  try {
    //VALIDAR ID MONMGO
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        msg: `Id invalido`,
      });
    } else {
      const edituser = await usersModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!edituser) {
        res.status(400).json({
          success: false,
          msg: `EL USER no existe ${req.params.id}`,
        });
      } else {
        res.status(200).json({
          success: true,
          data: edituser,
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

router4.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    //VALIDAR ID MONMGO
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        msg: `Id invalido`,
      });
    } else {
      const borrar = await usersModel.findByIdAndDelete(req.params.id);
      if (!borrar) {
        res.status(400).json({
          success: false,
          msg: `EL USER no existe ${req.params.id}`,
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
module.exports = router4;

//URI
