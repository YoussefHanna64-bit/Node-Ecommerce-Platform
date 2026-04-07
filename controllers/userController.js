import User from '../models/userModel.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import httpStatus from '../utils/httpStatus.js';
import appError from '../utils/appError.js';

export const getAllUsers = asyncWrapper(
    async (req, res) => {
        const users = await User.find({}, { password: 0 });
        res.status(200).json({
            status: httpStatus.SUCCESS,
            data: {
                users
            }
        })
    }
)

export const getUserById = asyncWrapper(
    async (req, res, next) => {
        const user = await User.findById(req.params.id)
        if (!user) {
            return next(appError.create("User not found", 404, httpStatus.ERROR))
        }
        res.status(200).json({
            status: httpStatus.SUCCESS,
            data: { user }
        })
    }
)

export const updateUser = asyncWrapper(
    async (req, res, next) => {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' })
        if (!updatedUser) {
            return next(appError.create("User not found", 404, httpStatus.ERROR))
        }
        res.status(200).json({
            status: httpStatus.SUCCESS,
            data: { user: updatedUser },
        })
    }
)
export const deleteUser = asyncWrapper(
    async (req, res, next) => {
        const updatedUser = await User.findByIdAndDelete(req.params.id)
        if (!updatedUser) {
            return next(appError.create("User not found", 404, httpStatus.ERROR))
        }
        res.status(200).json({
            status: httpStatus.SUCCESS,
            data: null,
        })
    }
)