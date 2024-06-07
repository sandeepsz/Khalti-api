const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(express.json());
app.use(cors());

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/khalti-pay", async (req, res) => {
  const payload = req.body;
  try {
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key9d453f0c8c8d4a64aed21415d990a6ad`,
        },
      }
    );
    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Something went wrong",
      error: error.message,
    });
  }
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listining on ${PORT} `));
