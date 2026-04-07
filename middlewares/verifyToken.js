import appError from "../utils/appError.js";
import jwt from 'jsonwebtoken';
import httpStatus from "../utils/httpStatus.js";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["Authorization"] || req.headers["authorization"]
    if (!authHeader) {
        const error = appError.create("No Authorization Headers Provided", 401, httpStatus.ERROR)
        return next(error)
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
        const error = appError.create("Invalid token format", 401, httpStatus.ERROR)
        return next(error)
    }
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedPayload) {
        const error = appError.create("Invalid token", 401, httpStatus.ERROR)
        return next(error)
    }
    req.user = decodedPayload
    next()
}

export default verifyToken