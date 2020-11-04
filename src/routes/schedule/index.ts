import express, { Request, Response } from 'express';
import { Retailer } from "../../models/retailer";
import { Schedule } from "../../models/schedule";
import { DocumentQuery, FilterQuery, Schema } from "mongoose";

const router = express.Router();

interface Query {
    $and: FilterQuery<Schema>[];
}

router.get('/api/v1/schedules', async (req: Request, res: Response) => {
    const { date, executive_id, retailer_name } = req.query;
    let query: Query = {
        $and: []
    };

    if (executive_id) {
        query.$and.push({
            executive_id:
            {
                $eq: executive_id as String
            }
        })
    }
    if (retailer_name) {
        query.$and.push({
            retailer_name:
            {
                $eq: retailer_name
            }
        });
    }
    if (date) {
        const inputDate: Date = new Date(Date.parse(date as string));
        const dateStartTime = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), 0, 0, 0, 0);
        const dateEndTime = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), 23, 59, 59, 999);
        query.$and.push({
            in_time: {
                $gt: dateStartTime
            }
        });
        query.$and.push({
            out_time:
            {
                $lte: dateEndTime
            }
        });
    }
    let a = {}
    if (query.$and.length != 0) {
        a = query;
    } else {
        a = Schedule.find()
    }
    Schedule.find(
        a
        , function (
            err,
            result
        ) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
})

export { router as indexScheduleRouter }