import express from 'express';
import {currentUser} from "../../common";

const router = express.Router();

router.get('/api/v1/auth/currentuser', currentUser, (req, res) => {
    return res.send({currentUser: req.currentUser || null});
});

export {router as currentUserRouter};
