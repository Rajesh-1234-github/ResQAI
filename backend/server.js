const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")

const reportRoutes = require("./routes/reportRoutes")

const app = express()

app.use(cors())
app.use(express.json())

// Static Folder for Uploaded Files
app.use("/uploads", express.static("uploads"))

mongoose.connect("mongodb://127.0.0.1:27017/resqai")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err))

app.use("/api", reportRoutes)

app.get("/", (req, res) => {
  res.send("ResQAI Backend Running Successfully")
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})