import express, {Request, Response} from 'express'
import {body} from "express-validator";
import {NotFoundError, requireAuth, validateRequest} from "../../common";
import {Schedule} from "../../models/schedule";

const router = express.Router();
router.put(
    '/api/v1/schedules/:id',
    requireAuth,
    [
        body('executive_id').not().isEmpty().withMessage('executive_id is required'),
        body('retailer_id').not().isEmpty().withMessage('retailer_id is required'),
        body('in_time').not().isEmpty().withMessage('in_time is required'),
        body('out_time').not().isEmpty().withMessage('out_time is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule) {
            throw new NotFoundError();
        }
        schedule.set({
            executive_id: req.body.executive_id,
            retailer_id: req.body.retailer_id,
            in_time: req.body.in_time,
            out_time: req.body.out_time,
        })
        await schedule.save();
        res.send(schedule);
    })
export {router as updateScheduleRouter}