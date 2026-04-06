import jwt from 'jsonwebtoken';

export default async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
}