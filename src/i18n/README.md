# Internationalization (i18n) Implementation

This directory contains the internationalization setup for the Kiorex Healthcare Web App, supporting multiple languages with RTL (Right-to-Left) support for Arabic.

## Supported Languages

- **English** (en) - Default language
- **Spanish** (es) - Español
- **French** (fr) - Français  
- **Arabic** (ar) - العربية (with RTL support)

## File Structure

```
src/i18n/
├── index.ts              # Main i18n configuration
├── rtl.css              # RTL-specific CSS styles
├── locales/             # Translation files
│   ├── en.json         # English translations
│   ├── es.json         # Spanish translations
│   ├── fr.json         # French translations
│   └── ar.json         # Arabic translations
└── README.md           # This file
```

## Key Features

### 1. Language Detection
- Automatic language detection from browser settings
- Fallback to English if language not supported
- Language preference stored in localStorage

### 2. RTL Support
- Automatic RTL layout switching for Arabic
- CSS utilities for RTL-specific styling
- Proper text alignment and spacing
- Icon and element positioning adjustments

### 3. Translation Keys Structure
```json
{
  "common": { ... },           // Common UI elements
  "navigation": { ... },       // Navigation items
  "auth": { ... },            // Authentication
  "dashboard": { ... },       // Dashboard content
  "appointments": { ... },    // Appointment-related
  "patients": { ... },        // Patient management
  "calendar": { ... },        // Calendar functionality
  "notifications": { ... },   // Notifications
  "profile": { ... },         // User profile
  "settings": { ... },        // Settings
  "languages": { ... },       // Language names
  "time": { ... },           // Time-related
  "status": { ... },         // Status indicators
  "errors": { ... },         // Error messages
  "success": { ... }         // Success messages
}
```

## Usage

### 1. Using Translations in Components
```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('dashboard.welcome')}</h1>
      <p>{t('common.loading')}</p>
    </div>
  );
};
```

### 2. Using RTL Support
```tsx
import { useRTL } from '@/hooks/useRTL';

const MyComponent = () => {
  const { isRTL, direction } = useRTL();
  
  return (
    <div dir={direction}>
      <div className={`flex ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
        {/* Content */}
      </div>
    </div>
  );
};
```

### 3. Language Switcher Component
```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Header = () => {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
};
```

## Adding New Languages

1. Create a new translation file in `locales/` directory
2. Add the language to the `resources` object in `index.ts`
3. Add language option to `LanguageSwitcher.tsx`
4. Update the `isRTL` function if the language is RTL

## Adding New Translation Keys

1. Add the key to all language files in `locales/`
2. Use the key in your components with `t('key.path')`
3. Follow the existing naming convention

## RTL Considerations

When adding new components or styles:

1. Use the `useRTL` hook to get RTL state
2. Apply conditional classes based on `isRTL`
3. Use `space-x-reverse` for spacing in RTL
4. Use `flex-row-reverse` for flex direction in RTL
5. Test with Arabic language to ensure proper layout

## Testing

1. Switch between languages using the language switcher
2. Verify all text is translated correctly
3. Test RTL layout with Arabic language
4. Ensure proper text alignment and spacing
5. Check that icons and elements are positioned correctly

## Browser Support

- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- localStorage support for language persistence
