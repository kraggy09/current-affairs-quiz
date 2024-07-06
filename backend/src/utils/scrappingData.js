import puppeteer from "puppeteer";
import { GoogleGenerativeAI } from "@google/generative-ai";

console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
let arr = [];

export async function scrapData() {
  // Launch a new browser instance
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const blockedResources = ["image", "stylesheet", "font"];
    if (blockedResources.includes(request.resourceType())) {
      request.abort();
    } else {
      request.continue();
    }
  });

  // Go to the target URL
  await page.goto(
    "https://www.drishtiias.com/current-affairs-news-analysis-editorials/news-analysis/05-07-2024",
    { waitUntil: "networkidle2" }
  );

  // Extract information using page.evaluate
  const data = await page.evaluate(() => {
    // Get all article details
    const articleDetails = document.querySelectorAll(".article-detail");

    // Extract innerHTML for each article detail
    const newsArray = Array.from(articleDetails).map(
      (article) => article.innerHTML
    );

    return newsArray;
  });

  for (let a of data) {
    getData(a);
  }
  // Close the browser
  await browser.close();
}

async function getData(data) {
  const prompt =
    `This is a news article. Analyze the content and provide a summary in JSON format. Include the following key-value pairs in the JSON:

  - title: The extracted title of the news article.
  - why_in_news: Briefly explain why this news is relevant (if mentioned in the article).
  - additional_info: A nested object containing further details:
      - event/topic: The main event or topic discussed in the article (e.g., Santhal Hul).
      - date: Any mentioned dates related to the event/topic.
      - location: Geographical locations mentioned in the article (if relevant).
      - people: Key people involved (e.g., leaders, activists).
      - organizations: Organizations mentioned in the article (e.g., political parties).
      - causes: Reasons or factors behind the event/topic.
      - impacts: Consequences or outcomes of the event/topic.
      - other_details: Capture any other significant details not covered above.
Give it in such a way that i would be able to parse it into json without any error
` + data;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  //   console.log(text);
  text = text.substring(7, text.length - 4);

  let json = JSON.parse(text);
  arr.push[json];
  console.log(json);
}
console.log(arr);
