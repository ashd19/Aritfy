import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        console.log(token);
        
        if (!token) {
            return res.status(401).clearCookie('token').json({
                message: 'Authentication required. Please log in.',
                success: false
            });
        }

        let decoded;
        decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.id) {
            return res.status(401).clearCookie('token').json({
                message: 'Invalid token. Please log in again.',
                success: false
            });
        }

        req.id = decoded.id;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export default isAuthenticated;