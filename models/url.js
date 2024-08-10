const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
      unique: true,
    },
    visitHistory: {
      type: [{ timestamp: String }],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const URLShortner = mongoose.model("URL", urlSchema);

module.exports = { URLShortner };
