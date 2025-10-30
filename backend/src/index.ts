import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import cookieParser from "cookie-parser"
import path from "path"

dotenv.config()

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database:", process.env.MONGODB_CONNECTION_STRING))

const app = express()
const PORT = process.env.PORT || 8000

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
)

// app.get("/", (req, res) => {
//   res.json({ message: `Backend is running on port: ${PORT}` })
// })

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.get(".*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
