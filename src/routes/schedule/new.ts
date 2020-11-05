import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {RequestValidationError, validateRequest} from "../../common";
import {Schedule} from "../../models/schedule";
import {AlreadyBlocked} from "../../common/errors/already-blocked";

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
        const {executive_id, retailer_name, in_time, out_time} = req.body;
        const newInTime: Date = new Date(in_time);
        const newOutTime: Date = new Date(out_time);
        if (newInTime.valueOf() - newOutTime.valueOf() == 1) {
            throw new RequestValidationError([{
                msg: "Slot too tiny",
                location: "body",
                param: "in_time,out_time",
                value: ""
            }])
        }
        if (
            newInTime.getDay() != newOutTime.getDay() ||
            newInTime.getMonth() != newOutTime.getMonth() ||
            newInTime.getFullYear() != newOutTime.getFullYear()
        ) {
            throw new RequestValidationError([{
                msg: "Start time and end time should be same date",
                location: "body",
                param: "in_time,out_time",
                value: ""
            }])
        }
        const count = await Schedule.count({
            $and:
                [
                    {
                        "retailer_name":
                            {
                                $eq: retailer_name
                            }
                    },
                    {
                        $or:
                            [
                                {
                                    $and: [
                                        {
                                            "in_time":
                                                {
                                                    $gte: newInTime
                                                }
                                        },
                                        {
                                            "in_time":
                                                {
                                                    $lte: newOutTime
                                                }
                                        }
                                    ]
                                },
                                {
                                    $and: [
                                        {
                                            "out_time":
                                                {
                                                    $gte: newInTime
                                                }
                                        },
                                        {
                                            "out_time":
                                                {
                                                    $lte: newOutTime
                                                }
                                        }
                                    ]
                                }
                            ]
                    }
                ]
        });
        if (count > 0) {
            throw new AlreadyBlocked("retailer visit is already planned");
        }

        const schedule = Schedule.build({
            executive_id, retailer_name, in_time, out_time
        })
        await schedule.save()
        res.status(201).send(schedule)
    });

export {router as createScheduleRouter};
