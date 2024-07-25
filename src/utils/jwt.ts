import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret_key';  // Use a secure secret key

export const generateToken = (user: { id: number, email: string, phoneNumber: string }) => {
    return jwt.sign({ id: user.id, email: user.email, phoneNumber: user.phoneNumber }, secret, { expiresIn: '1h' });
};
