import express, {Request, Response} from 'express';
import {body} from 'express-validator'
import jwt from "jsonwebtoken";
import {BadRequestError, validateRequest} from "../../common";
import {User} from "../../models/user";
import {Password} from "../../common/password";

const router = express.Router();

router.post('/api/v1/auth/signin', [
        body('userId')
            .notEmpty()
            .withMessage('You must supply an id'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')],
    validateRequest,
    async (req: Request, res: Response) => {
        const {userId, password} = req.body;
        const existingUser = await User.findOne({userId});
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials')
        }
        const passwordsMatch = await Password.compare(existingUser.password, password)
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials')
        }
        const userJwt = jwt.sign(
            {
                userId: existingUser.userId,
                id: existingUser.id,
                role: existingUser.role
            },
            process.env.JWT_KEY!
        );
        // Store it on session object
        req.session = {
            jwt: userJwt
        };
        res.status(200).send(existingUser);
    }
)
;

export {router as signinRouter};
