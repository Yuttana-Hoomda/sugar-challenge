import mongoose from "mongoose";

const DailySugarSchema = new mongoose.Schema({
    date: { type: Date, required: true }, 
    value: { type: Number, required: true },
})

const BeverageHistorySchema = new mongoose.Schema({
    menu: {type: String, required: true},
    img: {type: String, required: true},
    value: { type: Number, required: true },
    quantities: {type: String, required: true},
    sweetLevel: {type: String, required: true},
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, default: 'ไม่ระบุ' },
    weight: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    bmi: { type: Number, default: 0 },
    currentSugar: { type: Number, default: 0 },
    beverageHistory: [BeverageHistorySchema],
    dailySugar: [BeverageHistorySchema],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;