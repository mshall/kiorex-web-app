import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { isRTL } from '@/i18n';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', abbr: 'EN' },
  { code: 'es', name: 'Español', flag: '🇪🇸', abbr: 'ES' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', abbr: 'FR' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', abbr: 'AR' },
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  const isCurrentRTL = isRTL(i18n.language);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex items-center ${isCurrentRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} h-8 px-3 hover:bg-muted/50`}
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">
            {currentLanguage.abbr}
          </span>
          <ChevronDown className={`w-3 h-3 ${isOpen ? 'rotate-180' : ''} transition-transform`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={isCurrentRTL ? 'start' : 'end'} 
        className="w-56"
        side={isCurrentRTL ? 'left' : 'right'}
      >
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t('settings.language')}
        </div>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center justify-between cursor-pointer ${isCurrentRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
          >
            <div className={`flex items-center ${isCurrentRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
              <span className="text-lg">{language.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{language.name}</span>
                <span className="text-xs text-muted-foreground">{language.abbr}</span>
              </div>
            </div>
            {i18n.language === language.code && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
