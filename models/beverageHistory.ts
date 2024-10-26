import mongoose from "mongoose";

const BeverageHistorySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    beverageList: [{
        menu: { type: String, required: true },
        img: { type: String, required: true },
        value: { type: Number, required: true },
        quantities: { type: String, required: true },
        sweetLevel: { type: String, required: true },
        createAt: { type: String, required: true }
    }]
});

const BeverageHistory = mongoose.models.BeverageHistory || mongoose.model("BeverageHistory", BeverageHistorySchema);
export default BeverageHistory;