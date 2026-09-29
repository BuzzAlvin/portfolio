import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"

import corsOptions from "./config/corsOptions.js"
import {logger, logEvent} from "./middleware/logger.js"
import connectDB from "./config/dbConnect.js"
import userRoutes from "./routes/userRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import publicProjectRoutes from "./routes/publicProjectRoutes.js"
import errorHandler from "./middleware/errorHandler.js"


const app = express()

app.set("trust proxy", 1);

const PORT = process.env.PORT || 3000


//DB connection
connectDB()

app.use(cors(corsOptions))

app.use(cookieParser())

app.use(express.json())

app.use('/', publicProjectRoutes)
app.use('/admin/users', userRoutes)
app.use('/admin/projects', projectRoutes)
app.use('/admin/auth', authRoutes)

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}) 

mongoose.connection.on('error', (err) => {
    console.log(err);
    logEvent(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})