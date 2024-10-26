import mongoose from "mongoose";

const DailySugarSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    dailySugar: [{
        date: { type: String, required: true }, 
        value: { type: Number, required: true },
    }]
});

const DailySugar = mongoose.models.DailySugar || mongoose.model("DailySugar", DailySugarSchema);
export default DailySugar;