import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';

export default function DigitalSpinnerBlogPost() {
  const { t, i18n } = useTranslation('spinner');
  
  useEffect(() => {
    // Add meta tags for SEO
    document.title = `${t('title')} - ${i18n.t('app.title')} ${i18n.t('navigation.blog')}`;
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = t('introduction');
    document.head.appendChild(metaDescription);
  }, [t, i18n]);

  // Helper function to safely render arrays from translations
  const renderList = (key: string) => {
    const points = t(key, { returnObjects: true });
    if (Array.isArray(points)) {
      return points.map((point: string | object, index: number) => (
        <li key={index}>{typeof point === 'string' ? point : JSON.stringify(point)}</li>
      ));
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="bg-white/90 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{t('title')}</h1>
          <LanguageSwitcher />
        </div>
        <p className="text-gray-500 text-sm mb-6">{t('date')}</p>
        
        <div className="prose max-w-none text-gray-700">
          <p className="mb-4">
            {t('introduction')}
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">{t('benefitsTitle')}</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t('accessibilityTitle')}</h3>
          <p className="mb-4">
            {t('accessibilityText')}
          </p>
          <ul className="list-disc pl-6 mb-4">
            {renderList('accessibilityPoints')}
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t('randomSelectionTitle')}</h3>
          <p className="mb-4">
            {t('randomSelectionText')}
          </p>
          <ul className="list-disc pl-6 mb-4">
            {renderList('randomSelectionPoints')}
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t('customizableTitle')}</h3>
          <p className="mb-4">
            {t('customizableText')}
          </p>
          <ul className="list-disc pl-6 mb-4">
            {renderList('customizablePoints')}
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">{t('perfectTitle')}</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t('onlinePlayTitle')}</h3>
          <p className="mb-4">
            {t('onlinePlayText')}
          </p>
          <ul className="list-disc pl-6 mb-4">
            {renderList('onlinePlayPoints')}
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t('inPersonTitle')}</h3>
          <p className="mb-4">
            {t('inPersonText')}
          </p>
          <ul className="list-disc pl-6 mb-4">
            {renderList('inPersonPoints')}
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">{t('getStartedTitle')}</h2>
          
          <p className="mb-4">
            {t('getStartedText')}
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t('platformTitle')}</h3>
          <p className="mb-4">
            {t('platformText')}
          </p>
          <ul className="list-disc pl-6 mb-4">
            {renderList('platformPoints')}
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t('setupTitle')}</h3>
          <p className="mb-4">
            {t('setupText')}
          </p>
          <ul className="list-disc pl-6 mb-4">
            {renderList('setupPoints')}
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t('startPlayingTitle')}</h3>
          <p className="mb-4">
            {t('startPlayingText')}
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">{t('conclusionTitle')}</h2>
          <p className="mb-4">
            {t('conclusionText')}
          </p>
          <p className="mb-4">
            {t('finalNote')}
          </p>
        </div>
        
        <Link to="/blog" className="inline-block mt-6 text-blue-600 hover:text-blue-800 font-medium">
          {i18n.t('blog.backToBlog')}
        </Link>
      </article>
    </div>
  );
}
