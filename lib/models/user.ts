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
})

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    bmi: { type: Number, required: true },
    currentSugar: { type: Number, required: true },
    beverageHistory: [BeverageHistorySchema],
    dailySugar: [DailySugarSchema],
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User
