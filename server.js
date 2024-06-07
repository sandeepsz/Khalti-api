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
  const response = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    payload,
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRETE_KEY}`,
      },
    }
  );

  if (response) {
    res.json({
      success: true,
      data: response.data,
    });
  } else {
    res.json({
      success: false,
      msg: "something went wrong",
    });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listining on ${PORT} `));
