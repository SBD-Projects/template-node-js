import jwt from 'jsonwebtoken';

const secret = '1DaAQBUY7MFOcBZBgihDG2BBGfNdvA1qwMitmT2/xcs='; 

export const generateToken = (user: { id: number, email: string, phoneNumber: string }) => {
    return jwt.sign({ id: user.id, email: user.email, phoneNumber: user.phoneNumber }, secret, { expiresIn: '1h' });
};
