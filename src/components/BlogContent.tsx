import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts as defaultBlogPosts } from "../data";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { getTranslatedBlogPosts } from "../i18n/blogTranslations";

export default function BlogContent() {
  const { t, i18n } = useTranslation();
  const [blogPosts, setBlogPosts] = useState(defaultBlogPosts);
  
  useEffect(() => {
    // Update blog posts when language changes
    const translatedPosts = getTranslatedBlogPosts();
    setBlogPosts(translatedPosts);
  }, [i18n.language]);
  
  useEffect(() => {
    // Add meta tags for SEO
    document.title = `${t('app.title')} - ${t('navigation.blog')}`;
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      `${t('app.title')} ${t('navigation.blog')} - ${t('blog.popularGameNote')}`;
    document.head.appendChild(metaDescription);
  }, [t, i18n.language]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t('navigation.blog')}</h1>
        <LanguageSwitcher />
      </div>
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
              {t('blog.readMore')}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
