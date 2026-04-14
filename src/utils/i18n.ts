import frContent from '../content/home/fr.json';
import enContent from '../content/home/en.json';

export function getHomeContent(lang: 'fr' | 'en') {
  return lang === 'fr' ? frContent : enContent;
}
