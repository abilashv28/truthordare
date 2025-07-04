import i18n from './i18n';
import { questions as defaultQuestions } from '../data/questions';
import type { Category, GameMode } from '../types';

/**
 * Helper function to get a random item from an array
 */
function getRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Get translated questions based on the current language
 * Falls back to default questions if translation is not available
 */
export function getTranslatedQuestion(category: Category, mode: GameMode): string {
  const currentLng = i18n.language;
  
  try {
    // Try to get questions from the translations
    const questionList = i18n.getResource(currentLng, 'questions', category)?.[mode === 'truth' ? 'truths' : 'dares'];
    
    if (questionList && Array.isArray(questionList) && questionList.length > 0) {
      // Return a random question from the translated list
      return getRandom(questionList);
    }
    
    // If no translation is available, fall back to the default questions
    const defaultList = defaultQuestions[category][mode === 'truth' ? 'truths' : 'dares'];
    return getRandom(defaultList);
  } catch (error) {
    console.error('Error getting translated question:', error);
    
    // In case of any error, fall back to default questions
    const defaultList = defaultQuestions[category][mode === 'truth' ? 'truths' : 'dares'];
    return getRandom(defaultList);
  }
}
