import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import {currentUser, errorHandler, NotFoundError} from "./common";
import {signupRouter} from "./routes/auth/signup";
import {signinRouter} from "./routes/auth/signin";
import {signoutRouter} from "./routes/auth/signout";
import {currentUserRouter} from "./routes/auth/current-user";
import {showScheduleRouter} from "./routes/schedule/show";
import {createScheduleRouter} from "./routes/schedule/new";
import {updateScheduleRouter} from "./routes/schedule/update";
import {indexScheduleRouter} from "./routes/schedule";
import {indexUserRouter} from "./routes/auth";

var cors = require('cors')
const app = express();
app.use(cors())
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
);
app.use(currentUser)

app.use(indexUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(currentUserRouter)

app.use(showScheduleRouter)
app.use(createScheduleRouter);
app.use(updateScheduleRouter);
app.use(indexScheduleRouter);

app.all('*', async () => {
    throw new NotFoundError();
});
app.use(errorHandler);
export {app};