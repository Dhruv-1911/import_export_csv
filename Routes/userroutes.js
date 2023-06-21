const express = require("express")
const router = express()
const userController = require("../controller/usercontroller");


const multer = require("multer")

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let uploads = multer({storage : storage}) 

router.post("/importuser",uploads.single("file"),userController.importuser)
router.get("/exportuser",userController.exportuser)

module.exports = router