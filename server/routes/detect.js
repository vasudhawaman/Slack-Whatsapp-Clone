const express = require('express');
const router = express.Router();
const DetectLanguage = require('detectlanguage');
const detectlanguage = new DetectLanguage('ec0c97301141116fd5cb97645cdf6f8c');


router.post('/detect', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const data = await detectlanguage.detect(text);

    res.json(data);
  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;