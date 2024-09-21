const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String,  
    required: true  
  },
  gender: {
    type: String,    
    enum: ['หญิง', 'ชาย'], // Updated to match the gender options in Thai
    required: true,  // Field is required
},
  weight: {
    type: Number,    
    required: true, 
  },
  height: {
    type: Number,    
    required: true, 
  },
  bmi: {
    type: Number,   
    required: true,  
  },
  bmiStatus: {
    type: String,   
    enum: [
      'น้ำหนักต่ำกว่าเกณฑ์', 
      'น้ำหนักสมส่วน', 
      'น้ำหนักเกินมาตรฐาน', 
      'น้ำหนักอยู่ในเกณฑ์อ้วน', 
      'น้ำหนักอยู่ในเกณฑ์อ้วนมาก'
    ], 
    required: true,  
  }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;