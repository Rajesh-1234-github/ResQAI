const express = require("express")
const router = express.Router()

const multer = require("multer")
const path = require("path")

const Report = require("../models/Report")

// Storage Config
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }

})

const upload = multer({ storage })

// Submit Report
router.post(
  "/report",
  upload.single("file"),
  async (req, res) => {

    try {

      const {
        name,
        disaster,
        severity,
        location,
        lat,
        lng,
        description
      } = req.body

      const newReport = new Report({
        name,
        disaster,
        severity,
        location,
        lat,
        lng,
        description,
        file: req.file ? req.file.path : ""
      })

      await newReport.save()

      res.status(201).json({
        message: "Report Saved Successfully"
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message: "Server Error"
      })

    }

  }
)

// Get Reports
router.get("/reports", async (req, res) => {

  try {

    const reports = await Report.find().sort({ createdAt: -1 })

    res.status(200).json(reports)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Error fetching reports"
    })

  }

})

module.exports = router