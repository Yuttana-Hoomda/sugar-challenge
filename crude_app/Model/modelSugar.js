const mongoose = require('mongoose');
// Define the schema
const userSchema = new mongoose.Schema({
name: { 
        type: String,  
        required: true  
    },
gender: {
    type: String,    
    enum: ['Male', 'Female'], 
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
    enum: ['Underweight', 'Normal', 'Overweight', 'Obese'], 
    required: true,  
  }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
