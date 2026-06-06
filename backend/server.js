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

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err))

app.use("/api", reportRoutes)

app.get("/", (req, res) => {
  res.send("ResQAI Backend Running Successfully")
})

// Render provides PORT automatically
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})