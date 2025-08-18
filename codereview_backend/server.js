const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const { GoogleGenAI } = require("@google/genai");

const corsOptions = {
  // origin: "http://localhost:4200",
  origin: "https://code-review-tool-s9t3.onrender.com",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyparser.json());

const port = process.env.PORT || 3000; // Use the port provided by the host or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  // console.log(process.env.PORT);
});

app.post("/review", async (req, res) => {
  res.setHeader(
    `Access-Control-Allow-Origin`,
    `https://code-review-tool-s9t3.onrender.com`
    // `http://localhost:4200`
  );
  console.log(req.body);

  const response = {
    review: await getReview(req.body.code),
  };

  res.json(response);
});

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY || "AIzaSyBmdyQNFJKi23gAzzAehYuLpfpUo5cIUa0", // Ensure this environment variable is set
});

async function getReview(code) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: code,
    config: {
      systemInstruction:
        "You are an expert in reviewing other's code and you not do anything more or anthing less that that. The code can be provided in any language like javascript, java, c++, typescript, etc and can belong to any tech stack like angular, spring, springboot, react, etc; You should point out and highlight good coding practices if you find the provided code violating any. Remember to give the response as html, that I can render into a browser using code similar to this: document.querySelector('#review').innerHTML = response. If you find no violation say the code is perfect. You can use emojis. Font Family of all the text and code you generate should be jetbrains mono. You will not answer anything other than reviewing the code, just tell you are only built for reviewing the code if you get input other than code",
    },
  });
  //   console.log(response.text);
  return response.text;
}
