import mongoose from 'mongoose'

interface RetailerAttrs {
    name: string;
}

interface RetailerDoc extends mongoose.Document {
    name: string;
}

interface RetailerModel extends mongoose.Model<RetailerDoc> {
    build(attrs: RetailerAttrs): RetailerDoc;
}

const retailerSchema = new mongoose.Schema({
    name: {
        type: String,
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

retailerSchema.statics.build = (attrs: RetailerAttrs) => {
    return new Retailer(attrs)
};

const Retailer = mongoose.model<RetailerDoc, RetailerModel>('Retailer', retailerSchema)

export {Retailer}