import type { BlogPost } from "../types";
import { useEffect } from "react";

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The History of Truth or Dare",
    content:
      "Truth or Dare is a classic party game that has been entertaining people for generations. Learn about its fascinating origins and how it evolved into the beloved truth or dare game for friends/couples we know today. Discover how people play truth or dare online in modern formats and how it's become one of the top party games online.",
    date: "2025-06-25",
    slug: "history-of-truth-or-dare",
  },
  {
    id: 2,
    title: "Top 10 Truth or Dare Questions for Family Fun",
    content:
      "Looking for family-friendly truth or dare questions? Here's our curated list of entertaining and safe questions that will keep everyone laughing while staying appropriate for all ages. Whether you're playing with kids or adults, these questions work great when you play truth or dare online or in person.",
    date: "2025-06-24",
    slug: "family-friendly-truth-or-dare",
  },
  {
    id: 3,
    title: "How to Make Truth or Dare More Exciting",
    content:
      "Discover creative ways to spice up your truth or dare game. From adding timers to incorporating hilarious and challenging dares, these tips will make your game nights unforgettable. Try the best truth or dare dares and explore how party games online can elevate your next gathering.",
    date: "2025-06-23",
    slug: "make-truth-or-dare-exciting",
  },
  {
    id: 4,
    title: "Top 50 Truth or Dare Questions",
    content:
      "Looking for the ultimate list of truth or dare questions? Whether you're hosting a party or playing with friends or your partner, these 50 top-rated questions will keep everyone entertained. From deep truths to hilarious dares, this list is perfect when you want to play truth or dare online or offline.",
    date: "2025-06-26",
    slug: "top-50-truth-or-dare-questions"
  },
  {
    id: 5,
    title: "Dare Ideas That Are Actually Fun",
    content:
      "Tired of boring or awkward dares? We've put together the best truth or dare dares that are genuinely fun, exciting, and safe to play with any group. These creative ideas work great for party games online or in-person truth or dare games with friends or couples.",
    date: "2025-06-26",
    slug: "fun-dare-ideas"
  },
  {
    id: 6,
    title: "How to Play Truth or Dare Without Getting Bored",
    content:
      "Truth or Dare can get repetitive if not played creatively. Learn new ways to keep the game fresh and exciting with engaging rules, funny prompts, and the best truth or dare dares. These ideas help make your truth or dare game for friends/couples fun again — especially when you play truth or dare online.",
    date: "2025-06-26",
    slug: "play-truth-or-dare-without-boredom"
  }
];

export default function Blog() {
  useEffect(() => {
    // Add meta tags for SEO
    document.title = "Truth or Dare Game Blog - Tips, History, and Fun Ideas";
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "Explore our Truth or Dare blog for truth or dare questions, game tips, history, and creative ideas to make your party games online more exciting!";
    document.head.appendChild(metaDescription);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Truth or Dare Blog</h1>
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white/90 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
            <p className="text-gray-500 text-sm mb-4">{post.date}</p>
            <p className="text-gray-700">{post.content}</p>
            <a
              href={`/blog/${post.slug}`}
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Read more →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}