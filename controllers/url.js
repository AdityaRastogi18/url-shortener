const ShortUniqueId = require("short-unique-id");
const { URLShortner } = require("../models/url");
const { URL } = require("url");

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

const handleNewShortURL = async (req, res) => {
  const { url } = req.body;

  if (!url || !isValidURL(url)) {
    return res.status(400).render("home", {
      error: "Must provide a valid URL!",
    });
  }

  const existingURL = await URLShortner.findOne({ redirectURL: url });
  if (existingURL) {
    return res.status(400).render("home", {
      error: "URL already exists",
    });
  }

  const uid = new ShortUniqueId();
  const shortId = uid.rnd();

  await URLShortner.create({
    shortId,
    redirectURL: url,
    visitHistory: [],
  });

  return res.render("home", {
    id: shortId,
  });
};

const handleRedirectURL = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URLShortner.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
};

const handleAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URLShortner.findOne({ shortId });
  res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

const handleDeleteURL = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URLShortner.findOneAndDelete({ shortId });
  res.status(200).json({ msg: "URL deleted Successfully!" });
};

module.exports = {
  handleNewShortURL,
  handleRedirectURL,
  handleAnalytics,
  handleDeleteURL,
};
