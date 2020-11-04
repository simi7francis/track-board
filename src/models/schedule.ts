import mongoose from 'mongoose'

interface ScheduleAttrs {
    executive_id: string;
    retailer_name: string;
    in_time: Date;
    out_time: Date;
}

interface ScheduleDoc extends mongoose.Document {
    executive_id: string;
    retailer_name: string;
    in_time: Date;
    out_time: Date;
}

interface ScheduleModel extends mongoose.Model<ScheduleDoc> {
    build(attrs: ScheduleAttrs): ScheduleDoc;
}

const executiveScheduleSchema = new mongoose.Schema({
    executive_id: {
        type: String,
        required: true
    },
    retailer_name: {
        type: String,
        required: true
    },
    in_time: {
        type: Date,
        required: true
    },
    out_time: {
        type: Date,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
})

executiveScheduleSchema.statics.build = (attrs: ScheduleAttrs) => {
    return new Schedule(attrs)
};

const Schedule = mongoose.model<ScheduleDoc, ScheduleModel>('Schedule', executiveScheduleSchema)

export {Schedule}