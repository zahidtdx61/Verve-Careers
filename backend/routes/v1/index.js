const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running!",
    data: {},
    error: {},
  });
});

router.use("/user", require("./user"));

module.exports = router;
