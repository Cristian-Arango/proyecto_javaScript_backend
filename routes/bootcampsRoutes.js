const express = require("express");
const bootcampModel = require("../models/bootcampModel");
const { default: mongoose } = require("mongoose");
const router = express.Router();

//URI
router.get("/", async (req, res) => {
  try {
    const bootcamps = await bootcampModel.find();
    if (bootcamps.length === 0) {
      res.status(400).json({
        success: false,
        msg: "No hay Bootcamps",
      });
    } else {
      res.status(200).json({
        success: true,
        data: bootcamps,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error Interno en el servidor ${error.message}`,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    //VALIDAR ID MONMGO
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        msg: `Id invalido`,
      });
    } else {
      const bootcamp = await bootcampModel.findById(req.params.id);
      if (!bootcamp) {
        res.status(400).json({
          success: false,
          msg: `NO EXISTE EL BOOTCAMP ${req.params.id}`,
        });
      } else {
        //si si existe
        res.status(200).json({
          success: true,
          data: bootcamp,
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

router.post("/", async (req, res) => {
  //Add a new bootcamp
    try {
        const newBootcamp = await bootcampModel.create(req.body);
        res.
        status(201).
        json({
            success: true,
            data: newBootcamp,
          });
    } catch (error) {
        res.status(500).json({
            success:false,
            msg:`${error.message}`
        })
    }








 
});

router.put("/:id", async (req, res) => {
try {
     //VALIDAR ID MONMGO
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({
          success: false,
          msg: `Id invalido`,
        });
      } else {
        const editBootcamp=await bootcampModel.findByIdAndUpdate(req.params.id,
            req.body,
            { new: true })
        if(!editBootcamp){
            res.status(400).json({
                success:false,
                msg:`EL bootcamp no existe ${req.params.id}`
            })
        }
        else{
            res.status(200).json({
                success:true,
                data: editBootcamp
            }
            )
        }



      }
} catch (error) {
    res.status(500).json({
        success:false,
        msg:`${error.message}`
    })
}


});

router.delete("/:id", async (req, res) => {


    const id=req.params.id

    try {
        //VALIDAR ID MONMGO
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
           res.status(400).json({
             success: false,
             msg: `Id invalido`,
           });
         } else {
           const borrar=await bootcampModel.findByIdAndDelete(req.params.id)
           if(!borrar){
               res.status(400).json({
                   success:false,
                   msg:`EL bootcamp no existe ${req.params.id}`
               })
           }
           else{
               res.status(200).json({
                   success:true,
                   data: borrar
               }
               )
           }
   
   
   
         }
   } catch (error) {
       res.status(500).json({
           success:false,
           msg:`${error.message}`
       })
   }
   
});

module.exports = router;
