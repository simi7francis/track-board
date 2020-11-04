import express, {Request, Response} from 'express';
import {Retailer} from "../../models/retailer";
import {User} from "../../models/user";
import {Schedule} from "../../models/schedule";

const router = express.Router();

router.get('/api/v1/users', async (req: Request, res: Response) => {
    let role = req.query.role;
    let query = User.find();
    if (role)
        query = query.where('role').equals(role);
    const users = await User.find(query);
    res.send(users);
})

export {router as indexUserRouter}