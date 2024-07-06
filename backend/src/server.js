import app from "./app.js";
import { scrapData } from "./utils/scrappingData.js";

app.get("/", (req, res) => {
  return res.status(200).json({
    msg: "Hello World!",
    success: true,
  });
});

const url = process.env.GEMINI_API_KEY;
console.log(url);

scrapData();
app.listen(5000, () => {
  console.log("App is running at 5000");
});
