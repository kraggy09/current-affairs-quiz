import mongoose from "mongoose";
import moment from "moment-timezone";

const currentDate = moment().tz("Asia/Kolkata").format("MM-DD-YYYY");
console.log(currentDate);

let newsSchema = mongoose.Schema({
  date: {
    type: String,
    default: currentDate,
  },
  title: {
    type: String,
    required: true,
  },
  why_in_news: {
    type: String,
    required: true,
  },
  news_in_short: {
    type: String,
    required: true,
  },
  topic: [
    {
      type: String,
      required: true,
    },
  ],
});

export default mongoose.model("News", newsSchema);
