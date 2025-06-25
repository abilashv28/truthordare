import type { BlogPost } from "../types";
import { useEffect } from 'react';

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The History of Truth or Dare",
    content: "Truth or Dare is a classic party game that has been entertaining people for generations. Learn about its fascinating origins and how it evolved into the beloved game we know today.",
    date: "2025-06-25",
    slug: "history-of-truth-or-dare"
  },
  {
    id: 2,
    title: "Top 10 Truth or Dare Questions for Family Fun",
    content: "Looking for family-friendly truth or dare questions? Here's our curated list of entertaining questions that will keep everyone laughing while staying appropriate for all ages.",
    date: "2025-06-24",
    slug: "family-friendly-truth-or-dare"
  },
  {
    id: 3,
    title: "How to Make Truth or Dare More Exciting",
    content: "Discover creative ways to spice up your Truth or Dare game. From adding timers to incorporating challenges, these tips will make your game nights unforgettable.",
    date: "2025-06-23",
    slug: "make-truth-or-dare-exciting"
  }
];

export default function Blog() {
  useEffect(() => {
    // Add meta tags for SEO
    document.title = "Truth or Dare Game Blog - Tips, History, and Fun Ideas";
    const metaDescription = document.createElement('meta');
    metaDescription.name = "description";
    metaDescription.content = "Explore our Truth or Dare blog for game tips, history, and creative ideas to make your party games more exciting!";
    document.head.appendChild(metaDescription);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Truth or Dare Blog</h1>
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white/90 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {post.title}
            </h2>
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
