import { useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data";

export default function BlogContent() {
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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Truth or Dare Blog</h1>
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white/90 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
            <p className="text-gray-500 text-sm mb-4">{post.date}</p>
            <p className="text-gray-700">{post.content}</p>
            <Link
              to={`/blog/${post.slug}`}
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
