import mongoose from "mongoose";
import {app} from "./app";

const start = async () => {
    process.env.JWT_KEY = "jwt_key"
    process.env.MONGO_URI = "mongodb+srv://db_user:safe_password@cluster0.orcnk.mongodb.net/track-board?retryWrites=true&w=majority"

    // Generate JWT
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDb');
    } catch (err) {
        console.error(err);
    }
    app.listen(process.env.PORT || 8080, () => {
        console.log('Listening on port ' + process.env.PORT || 8080);
    });
};

start();
