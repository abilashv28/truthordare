import i18n from './i18n';
import { blogPosts as defaultBlogPosts } from '../data/blogPosts';
import type { BlogPost } from '../types/blog';

/**
 * Get translated blog posts based on the current language
 * Falls back to default blog posts if translation is not available
 */
export function getTranslatedBlogPosts(): BlogPost[] {
  const currentLng = i18n.language;
  
  try {
    // Clone the default blog posts to maintain structure
    const translatedPosts = [...defaultBlogPosts];
    
    // Try to update each post with translations if available
    translatedPosts.forEach(post => {
      let translatedTitle;
      let translatedContent;
      
      // Map slug to translation key
      let translationKey;
      switch(post.slug) {
        case 'family-friendly-truth-or-dare':
          translationKey = 'familyFriendly';
          break;
        case 'make-truth-or-dare-exciting':
          translationKey = 'exciting';
          break;
        case 'top-50-truth-or-dare-questions':
          translationKey = 'top50';
          break;
        case 'fun-dare-ideas':
          translationKey = 'funDares';
          break;
        case 'play-truth-or-dare-without-boredom':
          translationKey = 'boredom';
          break;
        case 'digital-spinner-no-bottle':
          translationKey = 'spinner';
          break;
        case 'truth-or-dare-multi-language':
          translationKey = 'multiLanguage';
          break;
        default:
          translationKey = null;
      }
      
      if (translationKey) {
        // Get translated content
        translatedTitle = i18n.getResource(currentLng, 'blog', `blogPosts.${translationKey}.title`);
        translatedContent = i18n.getResource(currentLng, 'blog', `blogPosts.${translationKey}.content`);
        
        // Update the post if translations are available
        if (translatedTitle) {
          post.title = translatedTitle;
        }
        if (translatedContent) {
          post.content = translatedContent;
        }
      }
    });
    
    return translatedPosts;
  } catch (error) {
    console.error('Error getting translated blog posts:', error);
    // In case of any error, fall back to default blog posts
    return defaultBlogPosts;
  }
}
