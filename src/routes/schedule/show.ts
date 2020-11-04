import express, { Request, Response } from "express";
import { NotFoundError } from "../../common";
import { Schedule } from "../../models/schedule";

const router = express.Router();
router.get('/api/v1/schedules/:id', async (req: Request, res: Response) => {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
        throw new NotFoundError();
    }
    return res.send(schedule)
});
export { router as showScheduleRouter }