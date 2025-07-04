import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { BlogPost as BlogPostType } from "../types/blog";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { getTranslatedBlogPosts } from "../i18n/blogTranslations";

// Import specific blog post components directly
import DigitalSpinnerBlogPost from "./BlogPosts/DigitalSpinnerBlogPost";

export default function BlogPost() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);

  useEffect(() => {
    // Get translated blog posts
    const translatedPosts = getTranslatedBlogPosts();

    // Find the post with the matching slug
    const foundPost = translatedPosts.find(p => p.slug === slug);

    if (foundPost) {
      setPost(foundPost);
      // Update the page title
      document.title = `${foundPost.title} - ${t('app.title')} ${t('navigation.blog')}`;
    }
  }, [slug, i18n.language, t]);

  // Render specific blog post components for certain slugs
  if (slug === "digital-spinner-no-bottle") {
    return <DigitalSpinnerBlogPost />;
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white/90 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('blog.postNotFound')}</h2>
          <p className="text-gray-700 mb-4">{t('blog.postNotFoundMessage')}</p>
          <Link to="/blog" className="inline-block text-blue-600 hover:text-blue-800 font-medium">
            {t('blog.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="bg-white/90 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
          <LanguageSwitcher />
        </div>
        <p className="text-gray-500 text-sm mb-6">{post.date}</p>

        {/* In a real application, you'd have a full blog post content here */}
        <div className="prose max-w-none text-gray-700">
          <p className="mb-4">{post.content}</p>

          {/* Add more content for the full blog post */}
          <p className="mb-4">
            {t('blog.fullContentNote')}
          </p>

          <p className="mb-4">
            {t('blog.popularGameNote')}
          </p>        </div>
        
        <Link to="/blog" className="inline-block mt-6 text-blue-600 hover:text-blue-800 font-medium">
          {t('blog.backToBlog')}
        </Link>
      </article>
    </div>
  );
}
