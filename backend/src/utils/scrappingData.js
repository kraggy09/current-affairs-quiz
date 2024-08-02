import puppeteer from "puppeteer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import News from "../models/News.js";

console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
let arr = [];
let date = "30-07-2024";

export async function scrapData() {
  const browser = await puppeteer.launch({
    headless: false,
  });

  try {
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

    await page.goto(
      `https://www.drishtiias.com/current-affairs-news-analysis-editorials/news-analysis/${date}`,
      { waitUntil: "networkidle2" }
    );

    const data = await page.evaluate(() => {
      const articleDetails = document.querySelectorAll(".article-detail");
      const newsArray = Array.from(articleDetails).map(
        (article) => article.innerHTML
      );
      return newsArray;
    });

    for (let a of data) {
      await getData(a);
    }
  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    await browser.close();
  }
  arr.map(async (news) => {
    try {
      let newNews = await News.create({
        date: date,
        title: news.title,
        why_in_news: news.why_in_news,
        news_in_short: news.news_in_short,
        topic: news.topic,
      });
      console.log("Inserted news:", newNews.title);
    } catch (error) {
      console.error("Error inserting news:", error);
    }
  });
}

async function getData(data) {
  const prompt =
    `This is a news article. Analyze the content and provide a summary in JSON format. Include the following key-value pairs in the JSON:

  - title: The extracted title of the news article.
  - why_in_news: Briefly explain why this news is relevant (if mentioned in the article).
  - news_in_short
  -topic as ["International Relations",
  "Governance",
  "Art and Culture",
  "Environment",
  "Science and Technology Studies",
  "National Security",
  "Policy",
  "Agriculture",
  "Education",
  "Geography",
  "India",
  "Indian Polity",
  "Social Justice",
  "Economy",
  "Defence",
  "Judiciary"
]
Give it in such a way that i would be able to parse it into json without any error
` + data;

  let retries = 5;
  const backoff = 300;

  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = await response.text();
      text = text.substring(7, text.length - 4);
      let json = JSON.parse(text);
      arr.push(json);
      // console.log(json);
      break;
    } catch (error) {
      if (i < retries - 1 && error.status === 429) {
        await new Promise((resolve) =>
          setTimeout(resolve, backoff * Math.pow(2, i))
        );
      } else {
        console.error("Error fetching data:", error);
      }
    }
  }
}
