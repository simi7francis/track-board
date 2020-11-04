import express, { Request, Response } from 'express';
import { body } from "express-validator";
import { RequestValidationError, validateRequest } from "../../common";
import { Schedule } from "../../models/schedule";
import { AlreadyBlocked } from "../../common/errors/already-blocked";
import { User } from '../../models/user';

const router = express.Router();

router.post(
    '/api/v1/schedules',
    [
        body('executive_id').not().isEmpty().withMessage('executive_id is required'),
        body('retailer_name').not().isEmpty().withMessage('retailer_name is required'),
        body('in_time').not().isEmpty().withMessage('in_time is required'),
        body('out_time').not().isEmpty().withMessage('out_time is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { executive_id, retailer_name, in_time, out_time } = req.body;
        const inTime: Date = new Date(in_time);
        const outTime: Date = new Date(out_time);
        if (
            inTime.getDay() != outTime.getDay() ||
            inTime.getMonth() != outTime.getMonth() ||
            inTime.getFullYear() != outTime.getFullYear()
        ) {
            throw new RequestValidationError([{
                msg: "Start time and end time should be same date",
                location: "body",
                param: "in_time,out_time",
                value: ""
            }])
        }
        if (await Schedule.count({
            "retailer_name": retailer_name,
            "in_time": { $gte: in_time },
            "out_time": { $gte: out_time }
        }) > 0) {
            throw new AlreadyBlocked("retailer visit is already planned");
        }
        const apple = await User.findOne({ userId: executive_id });

        const schedule = Schedule.build({
            executive_id, retailer_name, in_time, out_time
        })
        await schedule.save()
        res.status(201).send(schedule)
    });

export { router as createScheduleRouter };
