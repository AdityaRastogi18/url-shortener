const express = require("express");
const { URLShortner } = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await URLShortner.find({});
  res.cookie("test", "first cookie");
  return res.render("home", {
    urls: allUrls,
  });
});

module.exports = router;
