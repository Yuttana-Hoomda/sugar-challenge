import mongoose from "mongoose";

const DailySugarSchema = new mongoose.Schema({
    date: { type: Date, required: true }, 
    value: { type: Number, required: true },
})

module.exports = mongoose.model('DailySugar', DailySugarSchema);