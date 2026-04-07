import appError from "../utils/appError.js";
import httpStatus from "../utils/httpStatus.js";

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            const error = appError.create("User not authenticated", 401, httpStatus.ERROR)
            return next(error)
        }
        if (!allowedRoles.includes(req.user.role)) {
            const error = appError.create(
                `You do not have permission to access this resource`,
                403,
                httpStatus.ERROR
            )
            return next(error)
        }
        next()
    }
}

export default authorize