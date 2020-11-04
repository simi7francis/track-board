import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import jwt from 'jsonwebtoken';

import {BadRequestError, validateRequest} from "../../common";
import {User} from "../../models/user";

const router = express.Router();

router.post(
    '/api/v1/auth/signup',
    [
        body('userId')
            .not().isEmpty()
            .withMessage('id must be valid'),
        body('role')
            .not().isEmpty()
            .withMessage('id must be valid'),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const {userId, password, role} = req.body;

        const existingUser = await User.findOne({userId});

        if (existingUser) {
            throw new BadRequestError('id in use');
        }

        const user = User.build({userId, role, password});
        await user.save();

        const userJwt = jwt.sign(
            {
                userId: user.userId,
                id: user.id,
                role: user.role
            },
            process.env.JWT_KEY!
        );

        // Store it on session object
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
    }
);

export {router as signupRouter};
