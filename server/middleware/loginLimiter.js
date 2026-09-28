import { rateLimit } from "express-rate-limit";
import { logEvent } from "./logger.js";

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // request duration (1-Min)
    max: 5, // limit each IP request to 5 request per minute
    message: {
        message: "Too many login attempts from this IP, please try again after 60 seconds"
    },
    handler: (req, res, next, options) => {
        logEvent(`Too many request ${options.message.message}\t${req.method}\t${req.header.origin}`, "errLog.log")
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false
})

export default loginLimiter
