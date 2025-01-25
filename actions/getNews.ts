"use server";

import RSSParser from "rss-parser";

interface NewsItem {
  heading: string;
  subHeading: string;
  link: string;
}

const parser = new RSSParser();

export async function fetchTechNews() {
  // Replace these with the feeds you want to use
  const feeds = ["https://techcrunch.com/feed/"];

  const articles: NewsItem[] = [];

  for (const feedURL of feeds) {
    const feed = await parser.parseURL(feedURL);
    articles.push(
      ...feed.items.map((item) => ({
        heading: item.title || "No title",
        link: item.link || "No link",
        subHeading: item.contentSnippet
          ? item.contentSnippet.substring(0, 15)
          : item.content
          ? item.content.substring(0, 15)
          : "No content",
      }))
    );
  }
  return JSON.parse(JSON.stringify(articles.splice(0, 5)));
}
