import { pagesConfig } from '@/pages.config';

export const createPageUrl = (pageName) => {
  if (!pageName) {
    return '/';
  }

  const { mainPage, Pages } = pagesConfig;
  const mainPageKey = mainPage ?? Object.keys(Pages)[0];

  if (pageName === mainPageKey) {
    return '/';
  }

  return `/${pageName}`;
};
