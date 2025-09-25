import { useTranslation } from 'react-i18next';
import { isRTL } from '@/i18n';

export const useRTL = () => {
  const { i18n } = useTranslation();
  const rtl = isRTL(i18n.language);
  
  return {
    isRTL: rtl,
    direction: rtl ? 'rtl' : 'ltr',
    textAlign: rtl ? 'right' : 'left',
    textAlignReverse: rtl ? 'left' : 'right',
  };
};
