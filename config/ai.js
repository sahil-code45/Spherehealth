const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialization
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Latest Production-Ready Model
const model = genAI.getGenerativeModel({
   model: "gemini-2.0-flash",
  

});

module.exports = model;
