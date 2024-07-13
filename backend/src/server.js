import connection from "./db/dbConfig.js";
import app from "./app.js";
import { scrapData } from "./utils/scrappingData.js";
import moment from "moment-timezone";

// Get the current date as a string in MM-DD-YYYY format for a specific timezone
const currentDate = moment().tz("America/New_York").format("MM-DD-YYYY"); // Example timezone: 'America/New_York'
console.log(currentDate);

app.get("/", (req, res) => {
  return res.status(200).json({
    msg: "Hello World!",
    success: true,
  });
});

const url = process.env.GEMINI_API_KEY;

const mongo_url = process.env.MONGO_URI;

connection(mongo_url);
scrapData();
app.listen(8000, () => {
  console.log("App is running at 5000");
});
