import User from '../models/userModel.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import httpStatus from '../utils/httpStatus.js';
import appError from '../utils/appError.js';
import bcryptjs from 'bcryptjs';
import generateJWT from '../utils/generateJWT.js';


export const loginUser = asyncWrapper(
    async (req, res, next) => {
        const { email, password } = req.body
        if (!email || !password) {
            const error = appError.create("Email and Password are required", 404, httpStatus.FAIL)
            return next(error)
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            const error = appError.create("No account exist with this email address", 404, httpStatus.FAIL)
            return next(error)
        }
        const isAuthentic = await bcryptjs.compare(password, user.password)
        if (!isAuthentic) {
            const error = appError.create("Email or password is incorrect", 404, httpStatus.FAIL)
            return next(error)
        }
        const token = await generateJWT({ email: user.email, id: user._id, role: user.role })
        user.token = token;
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({
            status: httpStatus.SUCCESS,
            data: { user: userWithoutPassword }
        })
    }
)

export const registerUser = asyncWrapper(
    async (req, res, next) => {
        const {
            firstName,
            lastName,
            age,
            email,
            password,
            role } = req.body
        if (!firstName || !lastName || !age || !email || !password) {
            const error = appError.create("Please enter the missing fields", 404, httpStatus.FAIL)
            return next(error)
        }
        const isDuplicated = await User.findOne({ email: email })
        if (isDuplicated) {
            const error = appError.create("User with this email already exist", 404, httpStatus.FAIL)
            return next(error)
        }
        const hashedPass = await bcryptjs.hash(password, 8)
        const newUser = await User.create({
            firstName,
            lastName,
            age,
            email,
            password: hashedPass,
            role,
        })
        const token = await generateJWT({ email: newUser.email, id: newUser._id, role: newUser.role })
        newUser.token = token
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json({
            status: httpStatus.SUCCESS,
            data: { user: userWithoutPassword }
        })
    }
)
