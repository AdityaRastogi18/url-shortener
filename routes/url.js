const express = require("express");

const {
  handleNewShortURL,
  handleRedirectURL,
  handleAnalytics,
  handleDeleteURL,
} = require("../controllers/url");

const router = express.Router();

router.route("/").post(handleNewShortURL);
router.route("/:shortId").get(handleRedirectURL).delete(handleDeleteURL);
router.route("/analytics/:shortId").get(handleAnalytics);

module.exports = router;
