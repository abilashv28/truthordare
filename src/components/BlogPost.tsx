import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { BlogPost as BlogPostType } from '../types/blog';

// Import the blog posts from data file
// This is a temporary solution - in a real app, you might fetch this from an API
import { blogPosts } from '../data';

// Import specific blog post components directly
import DigitalSpinnerBlogPost from './BlogPosts/DigitalSpinnerBlogPost';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);

  useEffect(() => {
    // Find the post with the matching slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    
    if (foundPost) {
      setPost(foundPost);
      // Update the page title
      document.title = `${foundPost.title} - Truth or Dare Game Blog`;
    }
  }, [slug]);

  // Render specific blog post components for certain slugs
  if (slug === 'digital-spinner-no-bottle') {
    return <DigitalSpinnerBlogPost />;
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white/90 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Post Not Found</h2>
          <p className="text-gray-700 mb-4">Sorry, the blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="inline-block text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="bg-white/90 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-6">{post.date}</p>
        
        {/* In a real application, you'd have a full blog post content here */}
        <div className="prose max-w-none text-gray-700">
          <p className="mb-4">{post.content}</p>
          
          {/* Add more content for the full blog post */}
          <p className="mb-4">
            This is where the full content of the blog post would be displayed. In a real application,
            you would have much more detailed content here, possibly with formatting, images, and other elements.
          </p>
          
          <p className="mb-4">
            Truth or Dare is one of the most popular party games online, perfect for friends, couples, and family gatherings.
            Whether you play truth or dare online or in person, it's a great way to learn more about each other and have fun.
          </p>
        </div>
        
        <Link to="/blog" className="inline-block mt-6 text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Blog
        </Link>
      </article>
    </div>
  );
}
