import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { generateToken } from '../../utils/jwt';
import {isValidEmail, isValidPassword} from "./validators";

export const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, dateOfBirth, phoneNumber } = req.body;
    const userRepository = getRepository(User);

    // Validate email and password
    if (!isValidEmail(email)) {
        return res.status(400).send('Invalid email format');
    }

    if (!isValidPassword(password)) {
        return res.status(400).send('Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userRepository.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dateOfBirth,
            phoneNumber,
        });

        await userRepository.save(user);

        const token = generateToken({ id: user.id, email: user.email, phoneNumber: user.phoneNumber });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).send('Error creating user');
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userRepository = getRepository(User);

    try {
        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).send('Invalid email or password');
        }

        const token = generateToken({ id: user.id, email: user.email, phoneNumber: user.phoneNumber });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
};
