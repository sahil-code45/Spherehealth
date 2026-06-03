const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("AuthUser", AuthSchema);
