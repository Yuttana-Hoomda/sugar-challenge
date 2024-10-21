
import mongoose from "mongoose";

const DailySugarSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    menu: { type: String, required: true }, 
    quantities: { type: String, required: true }, 
    sweetLevel: { type: String, required: true }, 
    value: { type: Number, required: true }, 
    created_at: { type: Date, default: Date.now },  
});

const DailySugar = mongoose.models.DailySugar || mongoose.model("DailySugar", DailySugarSchema);
export default DailySugar;